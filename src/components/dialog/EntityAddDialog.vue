<script setup lang="ts">
import { type PropType, ref, watch } from 'vue';
import { type TypeDefinition } from '@/types/entities'
import { EntityForm } from '@/components/form';
import { Entity } from '@/datasource';

const props = defineProps({
    type: {
        type: Object as PropType<TypeDefinition>,
        required: true
    },
    entityFactory: {
        type: Function as PropType<() => Entity>,
        required: true
    }
})

const emit = defineEmits<{
    'update:model-value': [modelValue: string]
    save: [modelValue: Entity]
}>()
defineSlots<{
    activator(props: Record<string, any>): any
}>()
const open = ref(false)
const saving = ref(false)
const entity = ref()
const trySave = () => {
    saving.value = true
    emit('save', entity.value);
    open.value = false
    saving.value = false
}
watch(open, (newVal, oldVal) => {
    if (newVal && !oldVal) {
        entity.value = props.entityFactory()
    }
})
</script>

<template>
    <v-dialog v-model="open" width="auto">
        <template #activator="{ props }">
            <slot name="activator" :props="props" ></slot>
        </template>
        <v-card>
            <v-card-title>{{ type.labelSingular }} anlegen</v-card-title>
            <v-card-text>
                <EntityForm
                    :fields="type.fields"
                    :model-value="entity" />
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn
                    :loading="saving"
                    @click="trySave">Anlegen</v-btn>
                <v-btn>Abbrechen</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>