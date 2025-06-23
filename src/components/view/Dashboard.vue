<script setup lang="ts">
import { useAppConfigStore, useAuthStore } from '@/store';
import { TypeDefinition } from '@/types';
import { Card } from 'primevue';
import { computed, PropType } from 'vue';

const props = defineProps({
    entityTypeDefinitions: {
        type: Array as PropType<TypeDefinition[]>,
        required: true
    }
});

const auth = useAuthStore();
const config = useAppConfigStore();
const name = computed(() => auth.completeName || 'Guest');
const visibleEntityTypes = computed(() => {
    return props.entityTypeDefinitions.filter(entityType => auth.fulfillsRequirement(entityType.requiredRoles.read));
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
        <Card
            v-for="entityType in visibleEntityTypes"
            :key="entityType.keyPlural"
            class="col-span-12 md:col-span-6 lg:col-span-4">
            <template #content>
                <i :class="'text-8xl float-left mr-2 mdi mdi-' + entityType.icon"></i>
                <h2 class="p-card-title">{{ entityType.labelPlural }}</h2>
                <p>
                    <a :href="'/' + entityType.keyPlural"><i class="mdi mdi-table"></i> Manage {{ entityType.labelPlural }}</a>
                </p>
            </template>
        </Card>
    </div>
</template>