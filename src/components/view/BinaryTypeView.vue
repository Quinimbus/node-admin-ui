<script setup lang="ts">
import { EmbeddableBinary, Field } from '@/types';
import { computed, inject, PropType } from 'vue';
import { filesize } from 'filesize';
import Chip from 'primevue/chip';
import { fileTypeIcon } from '@/ui/UI';
import { Entity, EntityListDataSource } from '@/datasource';
import { entityListDataSourceSym } from '@/symbols';

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
        type: Object as PropType<EmbeddableBinary>
    }
})
const listDataSource = inject<EntityListDataSource<any>>(entityListDataSourceSym);
const binarySize = computed(() => {
    return (props.modelValue as EmbeddableBinary)?.size;
})
const icon = computed(() => "mdi " + fileTypeIcon(props.modelValue?.contentType));
const binaryPath = computed(() => {
    return listDataSource ? listDataSource.getDownloadUrl(props.entity, props.field.key) : '';
})
</script>

<template>
    <Chip :label="modelValue ? filesize(modelValue.size ?? 0, {base: 2}) : undefined">
        <span :class="`p-chip-icon ${icon}`" data-pc-section="icon" />
        <div class="p-chip-label whitespace-nowrap" data-pc-section="label">{{ filesize(binarySize ?? 0, {base: 2}) }}</div>
        <a class="p-chip-icon mdi mdi-download" :href="binaryPath" />
    </Chip>
</template>