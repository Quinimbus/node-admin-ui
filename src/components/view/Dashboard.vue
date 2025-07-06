<script setup lang="ts">
import { useAppConfigStore, useAuthStore } from '@/store';
import { TypeDefinition } from '@/types';
import { Card } from 'primevue';
import { computed, PropType } from 'vue';

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
const config = useAppConfigStore();
const name = computed(() => auth.completeName || 'Guest');
const visibleEntityTypes = computed(() => {
    return props.entityTypeDefinitions
        .filter(entityType => auth.fulfillsRequirement(entityType.requiredRoles.read))
        .reduce((groups: { label: string; items: TypeDefinition[] }[], entityType: TypeDefinition) => {
            const groupKey = entityType.group || 'entities';
            const groupLabel = props.groups[groupKey]?.label || groupKey;
            let group = groups.find(g => g.label === groupLabel);
            if (!group) {
                group = { label: groupLabel, items: [] };
                groups.push(group);
            }
            group.items.push(entityType);
            return groups;
        }, []);
});
</script>

<template>
    <div class="grid grid-cols-12 gap-8">
        <Card class="col-span-12">
            <template #title>
                <h1>Welcome {{ name }}</h1>
            </template>
            <template #content>
                <p v-if="config.oidcActive && !auth.isAuthenticated">Some features are only available to authenticated users. <a href="#" @click="auth.login()"><i class="mdi mdi-login"></i> Sign in</a></p>
            </template>
        </Card>
        <template v-for="group in visibleEntityTypes">
            <h2 class="col-span-12 uppercase font-bold">{{ group.label }}</h2>
            <Card
                v-for="entityType in group.items"
                :key="entityType.keyPlural"
                class="col-span-12 md:col-span-6 lg:col-span-4">
                <template #content>
                    <i :class="'text-8xl float-left mr-2 mdi mdi-' + entityType.icon"></i>
                    <h2 class="p-card-title">{{ entityType.labelPlural }}</h2>
                    <p>
                        <router-link :to="'/' + entityType.keyPlural">
                            <i class="mdi mdi-table"></i> Manage {{ entityType.labelPlural }}
                        </router-link>
                    </p>
                </template>
            </Card>
        </template>
    </div>
</template>