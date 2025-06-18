<script setup lang="ts">
import { type Field } from '@/types/entities'
import type { PropType } from 'vue';
import Checkbox from 'primevue/checkbox';
defineProps({
    field: {
        type: Object as PropType<Field>,
        required: true
    },
    modelValue: {
        type: Array as PropType<string[]>,
        required: false,
        default: () => []
    },
})
const emit = defineEmits<{
    'update:model-value': [modelValue: string[]]
}>()
const updateValue = (value: string[]) => {
    emit('update:model-value', value)
}
</script>

<template>
    <div class="flex flex-col flex-wrap gap-4">
        <label>{{ field.label }}</label>
        <div v-for="(allowedValue, index) in field.allowedValues" class="flex items-center gap-2">
            <Checkbox
                :inputId="field.key + '_' + index"
                :value="allowedValue.key"
                :model-value="modelValue"
                @update:model-value="updateValue" />
            <label :for="field.key + '_' + index">{{ allowedValue.label }}</label>
        </div>
    </div>
</template>