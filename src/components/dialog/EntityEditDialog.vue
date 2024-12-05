<script setup lang="ts">
import { type PropType, ref } from 'vue';
import { type TypeDefinition } from '@/types/entities'
import { EntityForm } from '@/components/form';
import type { Entity } from '@/datasource/Entity';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import { useEntityViewStore } from '@/store';

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
const saving = ref(false)
const entityViewStore = useEntityViewStore();
const trySave = () => {
    saving.value = true
    if (entityViewStore.itemToEdit) {
        emit('save', entityViewStore.itemToEdit);
    }
    entityViewStore.stopEditing()
    saving.value = false
}
const close = () => {
    console.log("close")
    entityViewStore.stopEditing()
}
</script>

<template>
    <Dialog
        modal
        class="w-96"
        :draggable="false"
        v-model:visible="entityViewStore.editingItem"
        :header="'Edit ' + type.labelSingular"
        @show="console.log('show')"
        @hide="close">
        <EntityForm
            v-if="entityViewStore.itemToEdit"
            :fields="type.fields"
            :entity-id="entityViewStore.itemToEdit.id"
            :model-value="entityViewStore.itemToEdit" />
        <template #footer>
            <Button
                label="Save"
                :loading="saving"
                @click="trySave" />
            <Button
                label="Cancel"
                severity="secondary"
                @click="close" />
        </template>
    </Dialog>
</template>