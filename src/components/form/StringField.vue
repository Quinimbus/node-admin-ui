<script setup lang="ts">
import { type Field } from '@/types/entities'
import Textarea from 'primevue/textarea';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import type { PropType } from 'vue';
defineProps({
    field: {
        type: Object as PropType<Field>,
        required: true
    },
    modelValue: String
})
const emit = defineEmits<{
    'update:model-value': [modelValue: string | undefined]
}>()
</script>

<template>
    <FloatLabel variant="in">
        <InputText
            :id="field.key"
            v-if="!field.multilineText"
            fluid
            :model-value="modelValue"
            @update:model-value="emit('update:model-value', $event)" />
        <Textarea
            :id="field.key"
            v-else
            fluid
            auto-resize
            :model-value="modelValue"
            @update:model-value="emit('update:model-value', $event)" />
        <label for="field.key">{{ field.label }}</label>
    </FloatLabel>
</template>