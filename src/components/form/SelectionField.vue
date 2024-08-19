<script setup lang="ts">
import { type Field } from '@/types/entities'
import type { PropType } from 'vue';
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
    <v-col>
        <v-radio-group
            :label="field.label"
            :model-value="modelValue"
            @update:model-value="emit('update:model-value', $event)">
            <v-radio
                v-for="allowedValue in field.allowedValues"
                :value="allowedValue.key"
                :label="allowedValue.label" />
        </v-radio-group>
    </v-col>
</template>