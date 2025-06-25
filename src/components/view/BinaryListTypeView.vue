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
        type: Object as PropType<EmbeddableBinary[]>
    }
})
const listDataSource = inject<EntityListDataSource<any>>(entityListDataSourceSym);
const icons = computed(() => props.modelValue?.map(b => "mdi " + fileTypeIcon(b.contentType)) || []);
const binaryPath = (index: number) => listDataSource ? listDataSource.getListDownloadUrl(props.entity, props.field.key, index) : '';
</script>

<template>
    <Chip
        v-for="(binary, index) in modelValue">
        <span :class="`p-chip-icon ${icons[index]}`" data-pc-section="icon" />
        <div class="p-chip-label whitespace-nowrap" data-pc-section="label">{{ filesize(binary.size ?? 0, {base: 2}) }}</div>
        <a class="p-chip-icon mdi mdi-download" :href="binaryPath(index)" />
    </Chip>
</template>