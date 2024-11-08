<script setup lang="ts">
import { type Field } from '@/types/entities'
import FloatLabel from 'primevue/floatlabel';
import InputNumber from 'primevue/inputnumber';
import { ref, type PropType } from 'vue';
const props = defineProps({
    field: {
        type: Object as PropType<Field>,
        required: true
    },
    modelValue: String
})
const emit = defineEmits<{
    'update:model-value': [modelValue: string]
}>()
const number = ref(props.modelValue ? parseInt(props.modelValue) : null);
const updateNumber = (newNumber: number | null) => {
    if (newNumber) {
        emit('update:model-value', newNumber.toString())
        number.value = newNumber
    }
}
</script>

<template>
    <FloatLabel variant="in">
        <InputNumber
            :id="field.key"
            fluid
            :model-value="number"
            @update:model-value="updateNumber" />
        <label for="field.key">{{ field.label }}</label>
    </FloatLabel>
</template>