<script setup lang="ts">
import { BinaryField, BinaryListField, BooleanField, DateField, DateTimeField, NumberField, ReferenceField, SelectionField, SelectionSetField, StringField, StringSetField } from '@/components/form';
import { Entity } from '@/datasource';
import { type Field, FieldType } from '@/types/entities'
import type { PropType } from 'vue';
const props = defineProps({
    fields: {
        type: Array as PropType<Field[]>,
        required: true
    },
    modelValue: {
        type: Object as PropType<Entity>,
        required: true
    }
})
const emit = defineEmits<{
    'update:model-value': [modelValue: Object]
}>()

const modelValue = props.modelValue

const updateField = (field: string, value: any) => {
    console.log("updateField", field, value)
    modelValue[field] = value;
    emit('update:model-value', modelValue);
}
</script>

<template>
    <div class="flex flex-col gap-6">
        <div
            v-for="field in fields.filter(f => !f.hiddenInForm)"
            :key="field.key">
            <StringField
                v-if="field.type === FieldType.STRING && !field.references"
                :field="field"
                :model-value="modelValue[field.key]"
                @update:model-value="updateField(field.key, $event)" />
            <ReferenceField
                v-else-if="field.type === FieldType.STRING && field.references"
                :field="field"
                :model-value="modelValue[field.key]"
                @update:model-value="updateField(field.key, $event)" />
            <NumberField
                v-else-if="field.type === FieldType.NUMBER"
                :field="field"
                :model-value="modelValue[field.key]"
                @update:model-value="updateField(field.key, $event)" />
            <BooleanField
                v-else-if="field.type === FieldType.BOOLEAN"
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
            <SelectionField
                v-else-if="field.type === FieldType.SELECTION"
                :field="field"
                :model-value="modelValue[field.key]"
                @update:model-value="updateField(field.key, $event)" />
            <SelectionSetField
                v-else-if="field.type === FieldType.SET_SELECTION"
                :field="field"
                :model-value="modelValue[field.key]"
                @update:model-value="updateField(field.key, $event)" />
            <BinaryField
                v-else-if="field.type === FieldType.BINARY"
                :field="field"
                :model-value="modelValue[field.key]"
                @update:model-value="updateField(field.key, $event)" />
            <BinaryListField
                v-else-if="field.type === FieldType.LIST_BINARY"
                :entity="modelValue"
                :field="field"
                :model-value="modelValue[field.key]"
                @update:model-value="updateField(field.key, $event)" />
            <StringSetField
                v-else-if="field.type === FieldType.SET_STRING"
                :field="field"
                :model-value="modelValue[field.key]"
                @update:model-value="updateField(field.key, $event)" />
            <div v-else class="input-like">
                <label>{{ field.label }}</label>
                <span>Unsupported type: {{ FieldType[field.type] }}</span>
            </div>
        </div>
    </div>
</template>