<script setup lang="ts">
import { type PropType, ref, watch } from 'vue';
import { type TypeDefinition } from '@/types/entities'
import { EntityForm } from '@/components/form';
import { Entity } from '@/datasource';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';

const props = defineProps({
    type: {
        type: Object as PropType<TypeDefinition>,
        required: true
    },
    entityFactory: {
        type: Function as PropType<() => Entity>,
        required: true
    },
    open: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits<{
    'update:model-value': [modelValue: string]
    'update:open': [open: boolean]
    save: [modelValue: Entity]
}>()
const open = ref(props.open)
const saving = ref(false)
const entity = ref()
const trySave = () => {
    saving.value = true
    emit('save', entity.value);
    open.value = false
    saving.value = false
}
const close = () => {
    console.log("close")
    open.value = false
    emit('update:open', false)
}
watch(() => props.open, (newVal, oldVal) => {
    console.log("open changed", newVal, oldVal)
    open.value = newVal
    if (newVal && !oldVal) {
        entity.value = props.entityFactory()
    }
})
</script>

<template>
    <Dialog
        modal
        :class="type.fieldGroups.size > 0 ? 'w-128' : 'w-96'"
        :draggable="false"
        v-model:visible="open"
        :header="'Create new ' + type.labelSingular"
        position="top"
        @hide="close">
        <EntityForm
            :fields="type.fields"
            :groups="type.fieldGroups"
            :model-value="entity" />
        <template #footer>
            <Button
                label="Save"
                :loading="saving"
                @click="trySave" />
            <Button
                label="Cancel"
                severity="secondary"
                @click="close" />
        </template>
    </Dialog>
</template>