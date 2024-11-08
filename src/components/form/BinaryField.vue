<script setup lang="ts">
import { type Field, EmbeddableBinary } from '@/types'
import { type PropType, computed } from 'vue';
import FileImport from 'primevue/fileupload';
const props = defineProps({
    field: {
        type: Object as PropType<Field>,
        required: true
    },
    selectedFile: File,
    modelValue: {
        type: Object as PropType<EmbeddableBinary | File | File[]>
    }
})
const emit = defineEmits<{
    'update:model-value': [binary: EmbeddableBinary | File | File[]]
}>()
const existingBinaryContentType = computed(() => {
    return (props.modelValue as EmbeddableBinary)?.contentType;
})
const existingBinarySize = computed(() => {
    return (props.modelValue as EmbeddableBinary)?.size;
})
const updateBinary = (files: File[]) => {
    const file = files[0];
    emit('update:model-value', file)
}
</script>

<template>
    <div class="flex flex-col flex-wrap gap-4 input-like">
        <label>{{ field.label }}</label>
        <span class="text-subtitle-2" v-if="existingBinaryContentType && existingBinarySize">
            Current:
            <ul>
                <li>Type: {{ existingBinaryContentType }}</li>
                <li>{{ existingBinarySize }} bytes</li>
            </ul>
        </span>
        <FileImport
            mode="basic"
            @select="updateBinary($event.files)" />
    </div>
</template>