<script setup lang="ts">
import { type Field } from '@/types/entities'
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
    <v-col>
        <v-checkbox
            :label="field.label"
            :model-value="modelValue"
            @update:model-value="emit('update:model-value', $event)" />
    </v-col>
</template>