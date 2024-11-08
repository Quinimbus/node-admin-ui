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
    saveNew: [modelValue: Entity]
}>()
const addDialogOpen = ref(false);
const saveItem = (item: Entity) => {
    emit('saveNew', item)
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
                severity="secondary"
                text
                icon="mdi mdi-plus"
                label="Create new"
                aria-label="Create new"
                title="Create new"
                @click="addDialogOpen = true" />
        </template>
    </Toolbar>
</template>