<script setup lang="ts">
import { EmbeddableBinary } from '@/types';
import { PropType } from 'vue';
import { filesize } from 'filesize';

defineProps({
    modelValue: {
        type: Object as PropType<EmbeddableBinary>
    }
})
</script>

<template>
    <v-icon v-if="!modelValue" icon="mdi-file-hidden" />
    <v-icon v-else-if="modelValue.contentType.startsWith('image')" icon="mdi-image" />
    <v-icon v-else icon="mdi-file" />
    <span v-if="modelValue" v-text="filesize(modelValue.size, {base: 2})" />
</template>