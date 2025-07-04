<script setup lang="ts">
import { type Field } from '@/types';
import { AutoComplete, FloatLabel } from 'primevue';
import { PropType } from 'vue';

defineProps({
    field: {
        type: Object as PropType<Field>,
        required: true
    },
    modelValue: {
        type: Array as PropType<string[] | undefined>,
        default: () => []
    }
})
const emit = defineEmits<{
    'update:model-value': [modelValue: string[] | undefined]
}>();
</script>

<template>
    <FloatLabel  variant="in">
        <AutoComplete
            :id="field.key"
            :model-value="modelValue"
            multiple
            :typeahead="false"
            fluid
            @update:model-value="emit('update:model-value', $event)" />
        <label :for="field.key">{{ field.label }}</label>
    </FloatLabel>
</template>