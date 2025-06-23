<script setup lang="ts">
import { PropType } from 'vue';
import { TypeDefinition } from '@/types';
import { AppMenu } from '.';

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
</script>

<template>
    <div class="layout-sidebar">
        <AppMenu :entity-type-definitions="props.entityTypeDefinitions" :groups="props.groups" />
    </div>
</template>

<style lang="scss" scoped></style>
