<script setup lang="ts">
import { type Field, EmbeddableBinary } from '@/types'
import { type PropType, computed, inject } from 'vue';
import FileImport from 'primevue/fileupload';
import Chip from 'primevue/chip';
import { fileTypeIcon } from '@/ui/UI';
import { filesize } from 'filesize';
import { EntityListDataSource } from '@/datasource';
import { useEntityViewStore } from '@/store';
import { entityListDataSourceSym } from '@/symbols';
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
const listDataSource = inject<EntityListDataSource<any>>(entityListDataSourceSym);
const entityViewStore = useEntityViewStore();
const emit = defineEmits<{
    'update:model-value': [binary: EmbeddableBinary | File | File[] | null]
}>()
const existingBinaryContentType = computed(() => {
    return (props.modelValue as EmbeddableBinary)?.contentType;
})
const existingBinarySize = computed(() => {
    return (props.modelValue as EmbeddableBinary)?.size;
})
const icon = computed(() => "mdi " + fileTypeIcon(existingBinaryContentType.value));
const binaryPath = computed(() => {
    return listDataSource ? listDataSource.getDownloadUrl(entityViewStore.itemToEdit, props.field.key) : '';
})
const updateBinary = (files: File[]) => {
    const file = files[0];
    emit('update:model-value', file)
}
const removeBinary = () => {
    emit('update:model-value', null);
}
</script>

<template>
    <div class="flex flex-col flex-wrap items-start gap-4 input-like">
        <label>{{ field.label }}</label>
        <Chip
            v-if="existingBinaryContentType && existingBinarySize"
            removable
            @remove="removeBinary">
            <span :class="`p-chip-icon ${icon}`" data-pc-section="icon" />
            <div class="p-chip-label" data-pc-section="label">{{ filesize(existingBinarySize ?? 0, {base: 2}) }}</div>
            <a class="p-chip-icon mdi mdi-download" :href="binaryPath" />
        </Chip>
        <FileImport
            mode="basic"
            @select="updateBinary($event.files)" />
    </div>
</template>