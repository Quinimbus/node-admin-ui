<script setup lang="ts">
import { type PropType, ref } from 'vue';
import { EntityViewDataTable, EntityViewToolbar } from '.';
import { type EntityListDataSource } from '@/datasource/EntityListDataSource'
import { type TypeDefinition } from '@/types/entities'
import { Entity } from '@/datasource';
import { EntityEditDialog } from '@/components/dialog';
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
    entries: Entity[],
    saveSuccess: boolean,
    saveMessage: string,
    showSnackbar: boolean,
    showConfirmDialog: boolean,
    confirmDialogTitle: string,
    confirmDialogMessage: string,
    confirmDialogOkAction: () => void
}
const state = ref<State>({
    entries: [],
    saveSuccess: false,
    saveMessage: "",
    showSnackbar: false,
    showConfirmDialog: false,
    confirmDialogTitle: "",
    confirmDialogMessage: "",
    confirmDialogOkAction: () => {}})
props.datasource.loadAll().then(e => state.value.entries = e)
const saveItem = (item: Object) => {
    props.datasource.save(item).then(e => {
        if (e.saved) {
            state.value.saveSuccess = true
            state.value.saveMessage = "Gespeichert"
        } else {
            state.value.saveSuccess = false
            state.value.saveMessage = "Fehler: " + e.message
        }
        state.value.showSnackbar = true
        props.datasource.loadAll().then(e => state.value.entries = e)
    })    
}
const saveNewItem = (item: Object) => {
    props.datasource.create(item).then(e => {
        if (e.saved) {
            state.value.saveSuccess = true
            state.value.saveMessage = "Gespeichert"
        } else {
            state.value.saveSuccess = false
            state.value.saveMessage = "Fehler: " + e.message
        }
        state.value.showSnackbar = true
        props.datasource.loadAll().then(e => state.value.entries = e)
    })    
}
const deleteItem = (item: Entity) => {
    showConfirmDialog(
        "Löschen",
        "Soll das Element wirklich gelöscht werden?",
        () => {
            props.datasource.delete(item).then(e => {
                if (e.deleted) {
                    state.value.saveSuccess = true
                    state.value.saveMessage = "Gelöscht"
                } else {
                    state.value.saveSuccess = false
                    state.value.saveMessage = "Fehler: " + e.message
                }
                state.value.showSnackbar = true
                props.datasource.loadAll().then(e => state.value.entries = e)
            })
    })    
}
const showConfirmDialog = (title: string, message: string, okAction: () => void) => {
    state.value.confirmDialogTitle = title
    state.value.confirmDialogMessage = message
    state.value.showConfirmDialog = true
    state.value.confirmDialogOkAction = okAction
}
</script>

<template>
    <v-card>
        <v-card-title>
            {{ type.labelPlural }}
            <v-spacer></v-spacer>
            <EntityViewToolbar
                :entityFactory="entityFactory"
                :type="type"
                @save-new="saveNewItem($event)" />
        </v-card-title>
        <EntityEditDialog
            :type="type"
            @save="saveItem($event)" />
        <EntityViewDataTable
            :items="state.entries"
            :type="type"
            @delete-item="deleteItem($event)" />
        <v-snackbar :color="state.saveSuccess ? 'green' : 'red'" v-model="state.showSnackbar" >
            {{ state.saveMessage }}
        </v-snackbar>
        <v-dialog v-model="state.showConfirmDialog" width="auto">
            <v-card>
                <v-card-title>{{ state.confirmDialogTitle }}</v-card-title>
                <v-card-text>{{ state.confirmDialogMessage }}</v-card-text>
                <v-card-actions>
                    <v-btn @click="state.showConfirmDialog = false">Abbrechen</v-btn>
                    <v-btn @click="state.confirmDialogOkAction(); state.showConfirmDialog = false">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card>
</template>