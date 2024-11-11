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
    refresh : [];
}>()
const addDialogOpen = ref(false);
const saveItem = (item: Entity) => {
    emit('saveNew', item)
}
const refresh = () => {
    emit('refresh')
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
        </template>
    </Toolbar>
</template>