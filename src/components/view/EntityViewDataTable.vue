<script setup lang="ts">
import { computed, type PropType } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import { FieldTableColumnVisibility, FieldType, type TypeDefinition } from '@/types/entities'
import { Entity } from '@/datasource/Entity';
import BinaryTypeView from './BinaryTypeView.vue';
import BinaryListTypeView from './BinaryListTypeView.vue';
import ReferenceTypeView from './ReferenceTypeView.vue';
import BooleanTypeView from './BooleanTypeView.vue';
import SelectionSetView from './SelectionSetView.vue';
import SelectionView from './SelectionView.vue';
import StringSetView from './StringSetView.vue';
import { useAuthStore, useEntityViewStore } from '@/store';
type DeleteItemClick = {
    clickTarget: HTMLElement;
    item: Entity
}
type InstanceActionClick = {
    action: string;
    item: Entity
}
const props = defineProps({
    type: {
        type: Object as PropType<TypeDefinition>,
        required: true
    },
    items: {
        type: Array as PropType<Entity[]>,
        required: true
    },
    selectedOptionalColumns: {
        type: Array as PropType<string[]>,
        default: () => []
    }
})
const emit = defineEmits<{
    deleteItem: [click: DeleteItemClick],
    callInstanceAction: [click: InstanceActionClick];
}>()
const entityViewStore = useEntityViewStore();
const auth = useAuthStore();
const editItem = (item: Entity) => {
    entityViewStore.editItem(item)
}
const deleteItem = (click: DeleteItemClick) => {
    emit('deleteItem', click)
}
const callInstanceAction = (click: InstanceActionClick) => {
    emit('callInstanceAction', click)
}
const selectedFieldColumns = computed(() => {
    return props.type.fields.filter(f => f.table?.visibility === FieldTableColumnVisibility.ALWAYS || (f.table?.visibility !== FieldTableColumnVisibility.NEVER && props.selectedOptionalColumns.includes(f.key)));
});
</script>

<template>
    <DataTable :value="items" scrollable>
        <Column v-for="field in selectedFieldColumns" :key="field.key" :field="field.key" :header="field.label">
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
                <span v-else-if="field.type === FieldType.SELECTION">
                    <SelectionView :model-value="slotProps.data[field.key]" :allowed-values="field.allowedValues" />
                </span>
                <span v-else-if="field.type === FieldType.SET_SELECTION">
                    <SelectionSetView :model-value="slotProps.data[field.key]" :allowed-values="field.allowedValues" />
                </span>
                <span v-else-if="field.type === FieldType.SET_STRING">
                    <StringSetView :model-value="slotProps.data[field.key]" />
                </span>
                <span class="text-ellipsis line-clamp-4" v-else>
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
                    <Button
                        v-for="action in type.instanceActions"
                        :key="action.key"
                        severity="secondary"
                        outlined
                        :icon="'mdi mdi-' + action.icon"
                        :aria-label="action.label"
                        :title="action.label"
                        :disabled="!auth.fulfillsRequirement(action.requiredRoles)"
                        @click="callInstanceAction({action: action.key, item: slotProps.data})" />
                </div>
            </template>
        </Column>
    </DataTable>
</template>