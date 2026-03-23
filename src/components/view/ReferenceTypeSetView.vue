<script setup lang="ts">
import { useReferencesStore } from '@/store';
import Chip from 'primevue/chip';
import { ref, watch, PropType } from 'vue';

const props = defineProps({
    modelValue: {
        type: Array as PropType<string[] | null>,
        default: []
    },
    referenceType: {
        type: String,
        required: true
    }
})

const referencesStore = useReferencesStore();
const referenceLabels = ref(props.modelValue);
watch([() => props.modelValue, () => props.referenceType],
    () => {
        referencesStore.idsAndLabelsFor(props.referenceType)
            .then(r => Object.fromEntries(r.map(e => [e.id, e.label])))
            .then(m => props.modelValue?.map(v => m[v] || v) || [])
            .then(l => referenceLabels.value = l);
},
    { immediate: true });
</script>

<template>
    <Chip v-for="label in referenceLabels" :label="label" />
</template>