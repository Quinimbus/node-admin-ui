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
</script>

<template>
    <div class="flex">
        <Checkbox 
            :model-value="modelValue"
            @update:model-value="emit('update:model-value', $event)" />
        <label :for="field.key">{{ field.label }}</label>
    </div>
</template>