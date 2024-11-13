<script setup lang="ts">
import { EmbeddableBinary } from '@/types';
import { computed, PropType } from 'vue';
import { filesize } from 'filesize';
import Chip from 'primevue/chip';
import { fileTypeIcon } from '@/ui/UI';

const props = defineProps({
    modelValue: {
        type: Object as PropType<EmbeddableBinary>
    }
})
const icon = computed(() => "mdi " + fileTypeIcon(props.modelValue?.contentType));
</script>

<template>
    <Chip :icon="icon" :label="modelValue ? filesize(modelValue.size ?? 0, {base: 2}) : undefined" />
</template>