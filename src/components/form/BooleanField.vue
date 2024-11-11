<script setup lang="ts">
import { type Field } from '@/types/entities'
import Checkbox from 'primevue/checkbox';
import type { PropType } from 'vue';
defineProps({
    field: {
        type: Object as PropType<Field>,
        required: true
    },
    modelValue: Boolean
})
const emit = defineEmits<{
    'update:model-value': [modelValue: Boolean]
}>()
const updateValue = (value: boolean) => {
    emit('update:model-value', value)
}
</script>

<template>
    <div class="flex items-center gap-2">
        <Checkbox
            :inputId="field.key"
            binary
            :model-value="modelValue"
            @update:model-value="updateValue" />
        <label :for="field.key">{{ field.label }}</label>
    </div>
</template>