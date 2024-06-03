<script setup lang="ts">
import { ref, type PropType } from 'vue';
import { EntityAddDialog } from '@/components/dialog';
import { type TypeDefinition } from '@/types/entities'
import { Entity } from '@/datasource';
let search = ref("")
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
const saveItem = (item: Entity) => {
    emit('saveNew', item)
}
</script>

<template>
    <v-toolbar density="compact">
        <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" label="Suchen" single-line hide-details />
        <v-spacer />
        <EntityAddDialog
            :entityFactory="entityFactory"
            :type="type"
            @save="saveItem($event)">
            <template #activator="{ props }">
                <v-btn v-bind="props" icon="mdi-plus" />
            </template>
        </EntityAddDialog>
    </v-toolbar>
</template>