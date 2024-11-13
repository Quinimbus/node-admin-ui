<script setup lang="ts">
import { type Field, EmbeddableBinary } from '@/types'
import { type PropType, computed } from 'vue';
import FileImport from 'primevue/fileupload';
import { Chip } from 'primevue';
import { fileTypeIcon } from '@/ui/UI';
import { filesize } from 'filesize';
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
    <div class="flex flex-col flex-wrap items-start gap-4 input-like">
        <label>{{ field.label }}</label>
        <Chip
            v-if="existingBinaryContentType && existingBinarySize"
            :icon="'mdi ' + fileTypeIcon(existingBinaryContentType)"
            :label="filesize(existingBinarySize ?? 0, {base: 2})" />
        <FileImport
            mode="basic"
            @select="updateBinary($event.files)" />
    </div>
</template>