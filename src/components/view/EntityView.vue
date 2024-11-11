<script setup lang="ts">
import { type PropType, ref } from 'vue';
import Card from 'primevue/card';
import { EntityViewDataTable, EntityViewToolbar } from '.';
import { type EntityListDataSource } from '@/datasource/EntityListDataSource'
import { type TypeDefinition } from '@/types/entities'
import { Entity } from '@/datasource';
import { EntityEditDialog } from '@/components/dialog';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
const props = defineProps({
    type: {
        type: Object as PropType<TypeDefinition>,
        required: true
    },
    datasource: {
        type: Object as PropType<EntityListDataSource<any>>,
        required: true
    },
    entityFactory: {
        type: Function as PropType<() => Entity>,
        required: true
    }
})
type State = {
    entries: Entity[]
}
const state = ref<State>({
    entries: []})
const reload = () => {
    props.datasource.loadAll().then(e => state.value.entries = e)
}
reload();
const confirm = useConfirm()
const toast = useToast()
const saveItem = (item: Object) => {
    props.datasource.save(item).then(e => {
        if (e.saved) {
            toast.add({
                severity: 'success',
                summary: 'Saved',
                detail: 'The element was successfully saved',
                life: 3000})
        } else {
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: 'The element could not be saved: ' + e.message,
                life: 3000})
        }
        reload();
    })    
}
const saveNewItem = (item: Object) => {
    props.datasource.create(item).then(e => {
        if (e.saved) {
            toast.add({
                severity: 'success',
                summary: 'Created',
                detail: 'The element was successfully created',
                life: 3000})
        } else {
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: 'The element could not be created: ' + e.message,
                life: 3000})
        }
        reload();
    })    
}
const deleteItem = (target: HTMLElement, item: Entity) => {
    console.log("deleteItem", target, item)
    confirm.require({
        message: "Do you really want to remove this element?",
        target: target,
        accept: () => {
            props.datasource.delete(item).then(e => {
                if (e.deleted) {
                    toast.add({
                        severity: 'success',
                        summary: 'Removed',
                        detail: 'The element was successfully removed',
                        life: 3000})
                } else {
                    toast.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'The element could not be removed: ' + e.message,
                        life: 3000})
                }
                reload();
            })
        }
    })
}
</script>

<template>
    <Card>
        <template #title>
            {{ type.labelPlural }}
        </template #title>
        <template #content>
            <EntityViewToolbar
                :entityFactory="entityFactory"
                :type="type"
                @save-new="saveNewItem($event)"
                @refresh="reload" />
            <EntityViewDataTable
                :items="state.entries"
                :type="type"
                @delete-item="deleteItem($event.clickTarget, $event.item)" />
            <EntityEditDialog
                :type="type"
                @save="saveItem($event)" />
        </template>
    </Card>
</template>