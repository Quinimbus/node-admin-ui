<script setup lang="ts">
import { ref, type PropType } from 'vue';
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import { EntityAddDialog } from '@/components/dialog';
import { type TypeDefinition } from '@/types/entities'
import { Entity } from '@/datasource';
//let search = ref("")
defineProps({
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
    saveNew: [modelValue: Entity],
    refresh : [],
    callGlobalAction: [action: string];
}>()
const addDialogOpen = ref(false);
const saveItem = (item: Entity) => {
    emit('saveNew', item)
}
const refresh = () => {
    emit('refresh')
}
const callGlobalAction = (action: string) => {
    emit('callGlobalAction', action)
}
</script>

<template>
    <Toolbar>
        <template #start>
            <EntityAddDialog
                :entityFactory="entityFactory"
                :type="type"
                :open="addDialogOpen"
                @save="saveItem($event)"
                @update:open="addDialogOpen = $event" />
            <Button
                severity="success"
                text
                icon="mdi mdi-plus"
                label="Create new"
                aria-label="Create new"
                title="Create new"
                @click="addDialogOpen = true" />
            <Button
                severity="secondary"
                text
                icon="mdi mdi-refresh"
                label="Refresh"
                aria-label="Refresh"
                title="Refresh"
                @click="refresh" />
            <Button
                v-for="action in type.globalActions"
                :key="action.key"
                severity="secondary"
                text
                :icon="'mdi mdi-' + action.icon"
                :label="action.label"
                :aria-label="action.label"
                :title="action.label"
                @click="callGlobalAction(action.key)" />
        </template>
    </Toolbar>
</template>