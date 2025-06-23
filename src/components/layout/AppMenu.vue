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
    }
});

const auth = useAuthStore();

const model = ref([
    {
        label: 'Home',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/', separator: false }],
        separator: false
    },
    {
        label: 'Entities',
        items: props.entityTypeDefinitions
            .filter(entityType => auth.fulfillsRequirement(entityType.requiredRoles.read))
            .map(entityType => ({
                label: entityType.labelPlural,
                icon: 'mdi mdi-' + entityType.icon,
                to: '/' + entityType.keyPlural,
                separator: false
            })),
        separator: false
    }
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
