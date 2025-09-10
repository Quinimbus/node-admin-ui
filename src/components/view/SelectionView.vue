<script setup lang="ts">
import Chip from 'primevue/chip';
import { computed, PropType } from 'vue';

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    allowedValues: {
        type: Array as PropType<{ key: string; label: string }[]>,
        required: true
    }
})

const label = computed(() => props.allowedValues.find(item => item.key === props.modelValue)?.label || props.modelValue);

</script>
<template>
    <Chip
        v-if="label && label.length > 0"
        :label="label"/>
</template>