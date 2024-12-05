<script setup lang="ts">
import { type EmbeddableBinary, type Field } from '@/types';
import { computed, inject, PropType } from 'vue';
import FileImport from 'primevue/fileupload';
import { filesize } from 'filesize';
import { fileTypeIcon } from '@/ui/UI';
import { Entity, EntityListDataSource } from '@/datasource';
import { entityListDataSourceSym } from '@/symbols';
import { Chip } from 'primevue';

const props = defineProps({
    entity: {
        type: Object as PropType<Entity>,
        required: true
    },
    field: {
        type: Object as PropType<Field>,
        required: true
    },
    modelValue: {
        type: Object as PropType<(EmbeddableBinary | File)[]>
    }
})
const listDataSource = inject<EntityListDataSource<any>>(entityListDataSourceSym);
const emit = defineEmits<{
    'update:model-value': [binary: (EmbeddableBinary | File)[]]
}>()
const existingBinaries = computed(() => props.modelValue?.filter(b => !(b instanceof File)) as EmbeddableBinary[] ?? []);
const existingBinariesIcons = computed(() => existingBinaries.value.map(b => "mdi " + fileTypeIcon(b.contentType)) || []);
const binaryPath = (index: number) => listDataSource ? listDataSource.getListDownloadUrl(props.entity, props.field.key, index) : '';
const addBinaries = (files: File[]) => {
    emit('update:model-value', [...existingBinaries.value, ...files])
}
const removeExistingBinary = (index: number) => {
    const id = existingBinaries.value[index].id;
    emit('update:model-value', props.modelValue?.filter(b => (b instanceof File) || b.id != id) || []);
}
</script>

<template>
    <div class="flex flex-col flex-wrap items-start gap-4 input-like">
        <div class="flex flex-row flex-wrap gap-2">
            <Chip
                v-for="(binary, index) in existingBinaries"
                removable
                @remove="removeExistingBinary(index)">
                <span :class="`p-chip-icon ${existingBinariesIcons[index]}`" data-pc-section="icon" />
                <div class="p-chip-label" data-pc-section="label">{{ filesize(binary.size ?? 0, {base: 2}) }}</div>
                <a class="p-chip-icon mdi mdi-download" :href="binaryPath(index)" />
            </Chip>
        </div>
        <label>{{ field.label }}</label>
        <FileImport
            mode="basic"
            multiple
            @select="addBinaries($event.files)" />
    </div>
</template>