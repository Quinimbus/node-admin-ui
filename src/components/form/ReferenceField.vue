<script setup lang="ts">
import FloatLabel from 'primevue/floatlabel';
import Select from 'primevue/select';
import { IdAndLabel } from '@/datasource';
import { LoadingState, useReferencesStore } from '@/store';
import { type Field } from '@/types/entities'
import { ref, type PropType } from 'vue';
const props = defineProps({
    field: {
        type: Object as PropType<Field>,
        required: true
    },
    modelValue: String
})

const referencesStore = useReferencesStore();
const references = props.field.references || "";
const referenceItems = ref(<IdAndLabel[]>[]);
referencesStore.idsAndLabelsFor(references).then(result => {
    referenceItems.value = result;
});

const emit = defineEmits<{
    'update:model-value': [modelValue: string]
}>()
</script>

<template>
    <FloatLabel variant="in">
        <!--<v-autocomplete
            clearable
            :label="field.label"
            :model-value="modelValue"
            :loading="referencesStore.loadingState(references) == LoadingState.LOADING"
            :items="referenceItems"
            item-title="label"
            item-value="id"
            @update:model-value="emit('update:model-value', $event)" />-->
        <Select
            :id="field.key"
            fluid
            :show-clear="true"
            :model-value="modelValue"
            :options="referenceItems"
            option-label="label"
            option-value="id"
            :loading="referencesStore.loadingState(references) == LoadingState.LOADING"
            @update:model-value="emit('update:model-value', $event)" />
        <label for="field.key">{{ field.label }}</label>
    </FloatLabel>
</template>