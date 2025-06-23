<script setup lang="ts">
import Chip from 'primevue/chip';
import { computed, PropType } from 'vue';

const props = defineProps({
    modelValue: {
        type: Array as PropType<string[] | null>,
        default: []
    },
    allowedValues: {
        type: Array as PropType<{ key: string; label: string }[]>,
        required: true
    }
})

const labels = computed(() => {
    return props.modelValue
        ?.map(value => props.allowedValues.find(av => av.key === value)?.label || value);
});

</script>
<template>
    <Chip
        v-for="label in labels"
        :label="label"/>
</template>