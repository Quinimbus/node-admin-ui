<script setup lang="ts">
import { type Field } from '@/types/entities'
import type { PropType } from 'vue';
import RadioButton from 'primevue/radiobutton';
defineProps({
    field: {
        type: Object as PropType<Field>,
        required: true
    },
    modelValue: String
})
const emit = defineEmits<{
    'update:model-value': [modelValue: string]
}>()
</script>

<template>
    <div class="flex flex-col flex-wrap gap-4">
        <label>{{ field.label }}</label>
        <div v-for="(allowedValue, index) in field.allowedValues" class="flex items-center">
            <RadioButton
                :id="field.key + '_' + index"
                :value="allowedValue.key"
                :model-value="modelValue" />
            <label :for="field.key + '_' + index">{{ allowedValue.label }}</label>
        </div>
    </div>
</template>