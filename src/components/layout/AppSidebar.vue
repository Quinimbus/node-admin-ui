<script setup lang="ts">
import { PropType } from 'vue';
import { TypeDefinition } from '@/types';
import { AppMenu } from '.';

const props = defineProps({
    entityTypeDefinitions: {
        type: Array as PropType<TypeDefinition[]>,
        required: true
    }
});
</script>

<template>
    <div class="layout-sidebar">
        <AppMenu :entity-type-definitions="props.entityTypeDefinitions" />
    </div>
</template>

<style lang="scss" scoped></style>
