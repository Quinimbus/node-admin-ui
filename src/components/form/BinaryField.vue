<script setup lang="ts">
import { type Field, EmbeddableBinary } from '@/types'
import { type PropType, computed } from 'vue';
const props = defineProps({
    field: {
        type: Object as PropType<Field>,
        required: true
    },
    selectedFile: File,
    modelValue: {
        type: Object as PropType<EmbeddableBinary | File>
    }
})
const emit = defineEmits<{
    'update:model-value': [binary: EmbeddableBinary | File]
}>()
const existingBinaryContentType = computed(() => {
    return (props.modelValue as EmbeddableBinary)?.contentType;
})
const existingBinarySize = computed(() => {
    return (props.modelValue as EmbeddableBinary)?.size;
})
</script>

<template>
    <v-col>
        <v-input>
            <v-col>
                <v-label>{{ field.label }}</v-label>
                <v-container>
                    <v-text class="text-subtitle-2" v-if="existingBinaryContentType && existingBinarySize">
                        Current:
                        <ul>
                            <li>Type: {{ existingBinaryContentType }}</li>
                            <li>{{ existingBinarySize }} bytes</li>
                        </ul>
                    </v-text>
                </v-container>
                <v-file-input
                    clearable
                    label="New file"
                    @update:model-value="emit('update:model-value', $event)" />
            </v-col>
        </v-input>
    </v-col>
</template>