<script setup lang="ts">
import { BinaryField, DateField, DateTimeField, NumberField, StringField } from '@/components/form';
import { type Field, FieldType } from '@/types/entities'
import type { PropType } from 'vue';
const props = defineProps({
    fields: {
        type: Array as PropType<Field[]>,
        required: true
    },
    modelValue: {
        type: Object,
        required: true
    }
})
const emit = defineEmits<{
    'update:model-value': [modelValue: Object]
}>()

const modelValue = props.modelValue

const updateField = (field: string, value: any) => {
    modelValue[field] = value;
    emit('update:model-value', modelValue);
}
</script>

<template>
    <v-container>
        <v-row v-for="field in fields.filter(f => !f.hiddenInForm)" :key="field.key">
            <StringField
                v-if="field.type === FieldType.STRING"
                :field="field"
                :model-value="modelValue[field.key]"
                @update:model-value="updateField(field.key, $event)" />
            <NumberField
                v-else-if="field.type === FieldType.NUMBER"
                :field="field"
                :model-value="modelValue[field.key]"
                @update:model-value="updateField(field.key, $event)" />
            <DateField
                v-else-if="field.type === FieldType.LOCALDATE"
                :field="field"
                :model-value="modelValue[field.key]"
                @update:model-value="updateField(field.key, $event)" />
            <DateTimeField
                v-else-if="field.type === FieldType.LOCALDATETIME"
                :field="field"
                :model-value="modelValue[field.key]"
                @update:model-value="updateField(field.key, $event)" />
            <BinaryField
                v-else-if="field.type === FieldType.BINARY"
                :field="field"
                :model-value="modelValue[field.key]"
                @update:model-value="updateField(field.key, $event)" />
            <v-col v-else>
                <v-input>
                    <v-col>
                        <v-label>{{ field.label }}</v-label>
                        <v-container>Unsupported type: {{ FieldType[field.type] }}</v-container>
                    </v-col>
                </v-input>
            </v-col>
        </v-row>
    </v-container>
</template>