<script setup lang="ts">
import { type PropType } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import { FieldType, type TypeDefinition } from '@/types/entities'
import { Entity } from '@/datasource/Entity';
import BinaryTypeView from './BinaryTypeView.vue';
import BinaryListTypeView from './BinaryListTypeView.vue';
import ReferenceTypeView from './ReferenceTypeView.vue';
import BooleanTypeView from './BooleanTypeView.vue';
import { useAuthStore, useEntityViewStore } from '@/store';
type DeleteItemClick = {
    clickTarget: HTMLElement;
    item: Entity
}
defineProps({
    type: {
        type: Object as PropType<TypeDefinition>,
        required: true
    },
    items: {
        type: Array as PropType<Entity[]>,
        required: true
    }
})
const emit = defineEmits<{
    deleteItem: [click: DeleteItemClick]
}>()
const entityViewStore = useEntityViewStore();
const auth = useAuthStore();
const editItem = (item: Entity) => {
    entityViewStore.editItem(item)
}
const deleteItem = (click: DeleteItemClick) => {
    emit('deleteItem', click)
}
</script>

<template>
    <DataTable :value="items" scrollable>
        <Column v-for="field in type.fields" :key="field.key" :field="field.key" :header="field.label">
            <template #body="slotProps">
                <span v-if="field.type === FieldType.BINARY">
                    <BinaryTypeView :entity="slotProps.data" :field="field" :model-value="slotProps.data[field.key]" />
                </span>
                <span v-else-if="field.type === FieldType.LIST_BINARY">
                    <BinaryListTypeView :entity="slotProps.data" :field="field" :model-value="slotProps.data[field.key]" />
                </span>
                <span v-else-if="field.references">
                    <ReferenceTypeView :model-value="slotProps.data[field.key]" :reference-type="field.references" /> 
                </span>
                <span v-else-if="field.type === FieldType.BOOLEAN">
                    <BooleanTypeView :model-value="slotProps.data[field.key]" />
                </span>
                <span v-else>
                    {{ slotProps.data[field.key] }}
                </span>
            </template>
        </Column>
        <Column frozen align-frozen="right" header="Actions">
            <template #body="slotProps">
                <div class="flex justify-start gap-4">
                    <Button
                        outlined
                        icon="mdi mdi-pencil"
                        aria-label="Edit"
                        :disabled="!auth.fulfillsRequirement(type.requiredRoles.update)"
                        @click="editItem(slotProps.data)" />
                    <Button
                        outlined
                        icon="mdi mdi-delete"
                        aria-label="Delete"
                        severity="danger"
                        :disabled="!auth.fulfillsRequirement(type.requiredRoles.delete)"
                        @click="deleteItem({clickTarget: $event.currentTarget as HTMLElement, item: slotProps.data})" />
                </div>
            </template>
        </Column>
    </DataTable>
</template>