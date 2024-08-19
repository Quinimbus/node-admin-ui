<script setup lang="ts">
import { useReferencesStore } from '@/store';
import { ref, watch } from 'vue';

const props = defineProps({
    modelValue: {
        type: String,
        required: true
    },
    referenceType: {
        type: String,
        required: true
    }
})

const referencesStore = useReferencesStore();
const referenceLabel = ref(props.modelValue);
watch([() => props.modelValue, () => props.referenceType],
    () => {
            referencesStore.idsAndLabelsFor(props.referenceType)
                .then(e => e ? e.find(r => r.id === props.modelValue) : undefined)
                .then(e => referenceLabel.value = e ? e.label : props.modelValue);
        },
    {immediate: true});
</script>

<template>
    {{ referenceLabel }}
</template>