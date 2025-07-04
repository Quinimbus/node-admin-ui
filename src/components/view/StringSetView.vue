<script setup lang="ts">
import Chip from 'primevue/chip';
import { PropType } from 'vue';

const props = defineProps({
    modelValue: {
        type: Array as PropType<string[] | null>,
        default: []
    }
})

</script>
<template>
    <Chip
        v-for="v in props.modelValue"
        :label="v"/>
</template>