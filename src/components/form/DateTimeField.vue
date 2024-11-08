<script setup lang="ts">
import { type Field } from '@/types/entities'
import DatePicker from 'primevue/datepicker';
import FloatLabel from 'primevue/floatlabel';
import { ref, type PropType } from 'vue';
const props = defineProps({
    field: {
        type: Object as PropType<Field>,
        required: true
    },
    modelValue: String
})
const emit = defineEmits<{
    'update:model-value': [modelValue: string | null]
}>()
const date = ref(props.modelValue ? new Date(props.modelValue) : null);
const updateDate = (newDate: Date | Date[] | (Date | null)[] | null | undefined) => {
    if (newDate instanceof Date) {
        emit('update:model-value', newDate.toISOString())
        date.value = newDate
    }
}
</script>

<template>
    <FloatLabel variant="in">
        <DatePicker
            :id="field.key"
            fluid
            show-time
            :model-value="date"
            @update:model-value="updateDate" />
        <label for="field.key">{{ field.label }}</label>
    </FloatLabel>
</template>