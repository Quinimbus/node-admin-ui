<script setup lang="ts">
defineProps({
    modelValue: Boolean
})
</script>

<template>
    <v-icon :icon="modelValue ? 'mdi-check' : 'mdi-close'"></v-icon>
</template>