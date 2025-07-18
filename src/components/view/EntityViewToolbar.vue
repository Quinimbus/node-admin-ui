<script setup lang="ts">
import { computed, onMounted, ref, type PropType } from 'vue';
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import { EntityAddDialog } from '@/components/dialog';
import { FieldTableColumnVisibility, type TypeDefinition } from '@/types/entities'
import { Entity } from '@/datasource';
import { useAuthStore } from '@/store';
import { FloatLabel, MultiSelect } from 'primevue';
//let search = ref("")
const props = defineProps({
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
    callGlobalAction: [action: string],
    columnsSelected: [columns: string[]];
}>()
const auth = useAuthStore();
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
const selectableColumnFields = computed(() => {
    return props.type.fields.filter(f => f.table?.visibility === FieldTableColumnVisibility.DEFAULT_HIDDEN || f.table?.visibility === FieldTableColumnVisibility.DEFAULT_VISIBLE).map(f => {
        return {
            key: f.key,
            label: f.label,
            visibility: f.table.visibility
        }
    }); 
});
const selectedColumnFields = ref(selectableColumnFields.value.filter(f => f.visibility === FieldTableColumnVisibility.DEFAULT_VISIBLE).map(f => f.key));
const toggleColumns = (selected: string[]) => {
    emit('columnsSelected', selected);
};
onMounted(() => {
    emit('columnsSelected', selectedColumnFields.value);
});
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
                :disabled="!auth.fulfillsRequirement(type.requiredRoles.create)"
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
                :disabled="!auth.fulfillsRequirement(action.requiredRoles)"
                @click="callGlobalAction(action.key)" />
            <FloatLabel variant="in" v-if="selectableColumnFields.length > 0">
                <MultiSelect
                    v-model="selectedColumnFields"
                    :options="selectableColumnFields"
                    option-label="label"
                    option-value="key"
                    :placeholder="'Select optional columns to display'"
                    :filter="selectableColumnFields.length > 5"
                    :filter-placeholder="'Search columns...'"
                    class="w-64"
                    @update:model-value="toggleColumns" />
                <label>Optional columns</label>
            </FloatLabel>
        </template>
    </Toolbar>
</template>