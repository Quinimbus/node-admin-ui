<script setup lang="ts">
import { type PropType } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import { FieldType, type TypeDefinition } from '@/types/entities'
import { Entity } from '@/datasource/Entity';
import BinaryTypeView from './BinaryTypeView.vue';
import ReferenceTypeView from './ReferenceTypeView.vue';
import BooleanTypeView from './BooleanTypeView.vue';
import { useEntityViewStore } from '@/store';
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
const editItem = (item: Entity) => {
    entityViewStore.editItem(item)
}
const deleteItem = (click: DeleteItemClick) => {
    emit('deleteItem', click)
}
</script>

<template>
    <DataTable :value="items">
        <Column v-for="field in type.fields" :key="field.key" :field="field.key" :header="field.label">
            <template #body="slotProps">
                <span v-if="field.type === FieldType.BINARY">
                    <BinaryTypeView :model-value="slotProps.data[field.key]" />
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
        <Column>
            <template #body="slotProps">
                <div class="flex justify-center gap-4">
                    <Button
                        outlined
                        icon="mdi mdi-pencil"
                        aria-label="Edit"
                        @click="editItem(slotProps.data)" />
                    <Button
                        outlined
                        icon="mdi mdi-delete"
                        aria-label="Delete"
                        severity="danger"
                        @click="deleteItem({clickTarget: $event.currentTarget as HTMLElement, item: slotProps.data})" />
                </div>
            </template>
        </Column>
    </DataTable>
</template>