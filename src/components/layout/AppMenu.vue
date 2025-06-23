<script setup lang="ts">
import { ref } from 'vue';

import { PropType } from 'vue';
import { TypeDefinition } from '@/types';
import { AppMenuItem } from '.';
import { useAuthStore } from '@/store';

const props = defineProps({
    entityTypeDefinitions: {
        type: Array as PropType<TypeDefinition[]>,
        required: true
    },
    groups: {
        type: Object as PropType<{ [key: string]: { label: string } }>,
        default: () => ({})
    }
});

const auth = useAuthStore();

const model = ref([
    {
        label: 'Home',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/', separator: false }],
        separator: false
    },
    ...props.entityTypeDefinitions
        .filter(entityType => auth.fulfillsRequirement(entityType.requiredRoles.read))
        .reduce((groups: { label: string; items: { label: string; icon: string; to: string; separator: boolean }[]; separator: boolean }[], entityType: TypeDefinition) => {
            const groupKey = entityType.group || 'entities';
            const groupLabel = props.groups[groupKey]?.label || groupKey;
            let group = groups.find(g => g.label === groupLabel);
            if (!group) {
                group = { label: groupLabel, items: [], separator: false };
                groups.push(group);
            }
            group.items.push({
                label: entityType.labelPlural,
                icon: 'mdi mdi-' + entityType.icon,
                to: '/' + entityType.keyPlural,
                separator: false
            });
            return groups;
        }, []),
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <AppMenuItem v-if="!item.separator" :item="item" :index="i" />
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
