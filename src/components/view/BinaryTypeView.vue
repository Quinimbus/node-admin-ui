<script setup lang="ts">
import { EmbeddableBinary } from '@/types';
import { computed, PropType } from 'vue';
import { filesize } from 'filesize';
import Chip from 'primevue/chip';

const props = defineProps({
    modelValue: {
        type: Object as PropType<EmbeddableBinary>
    }
})
const icon = computed(() => {
    if (!props.modelValue) {
        return "mdi mdi-file-hidden"
    } else if (props.modelValue.contentType?.startsWith('image')) {
        return "mdi mdi-image"
    } else {
        return "mdi mdi-file"
    }
})
</script>

<template>
    <Chip :icon="icon" :label="modelValue ? filesize(modelValue.size ?? 0, {base: 2}) : undefined" />
</template>