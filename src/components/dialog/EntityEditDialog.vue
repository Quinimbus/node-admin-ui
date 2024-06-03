<script setup lang="ts">
import { type PropType, ref } from 'vue';
import { type TypeDefinition } from '@/types/entities'
import { EntityForm } from '@/components/form';
import type { Entity } from '@/datasource/Entity';
import { entityViewState } from '@/state/EntityViewState';

defineProps({
    type: {
        type: Object as PropType<TypeDefinition>,
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
const saving = ref(false)
const trySave = () => {
    saving.value = true
    if (entityViewState.itemToEdit) {
        emit('save', entityViewState.itemToEdit);
    }
    entityViewState.stopEditing()
    saving.value = false
}
</script>

<template>
    <v-dialog v-model="entityViewState.editingItem" width="auto">
        <template #activator="{ props }">
            <slot name="activator" :props="props"></slot>
        </template>
        <v-card>
            <v-card-title>{{ type.labelSingular }} bearbeiten</v-card-title>
            <v-card-text>
                <EntityForm
                    v-if="entityViewState.itemToEdit"
                    :fields="type.fields"
                    :model-value="entityViewState.itemToEdit" />
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn
                    :loading="saving"
                    @click="trySave">
                    Speichern
                </v-btn>
                <v-btn>Abbrechen</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>