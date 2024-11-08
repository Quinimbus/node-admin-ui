<script setup lang="ts">
import Chip from 'primevue/chip';

defineProps({
    modelValue: Boolean
})
</script>

<template>
    <Chip :icon="modelValue ? 'mdi mdi-check' : 'mdi mdi-close'" />
</template>