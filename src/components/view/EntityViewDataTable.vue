<script setup lang="ts">
import { computed, ref, type PropType } from 'vue';
import { type TypeDefinition } from '@/types/entities'
import { toTableHeader } from '@/ui/UI';
import { Entity } from '@/datasource/Entity';
import { entityViewState } from '@/state/EntityViewState';

const props = defineProps({
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
    deleteItem: [modelValue: Entity]
}>()
let search = ref("")
const headers = computed(() => {
    const h = props.type.fields
        .map(toTableHeader)
    h.push({
        key: 'actions',
        title: 'Aktionen',
        sortable: false
    })
    return h
})
const editItem = (item: Entity) => {
    entityViewState.editItem(item)
}
const deleteItem = (item: Entity) => {
    emit('deleteItem', item)
}
</script>

<template>
    <v-data-table :headers="headers" :items="items" :search="search">
        <template v-for="(slotName, i) in (Object.keys($slots))" :key="i" #[slotName]="slotProps" >
            <slot :name="slotName" v-bind="slotProps" />
        </template>
        <template v-slot:[`item.actions`]="{ item }">
            <v-icon
                v-bind="props"
                icon="mdi-pencil"
                size="small"
                class="me-2"
                @click="editItem(item)" />
            <v-icon
                icon="mdi-delete"
                size="small"
                @click="deleteItem(item)" />
        </template>
    </v-data-table>
</template>