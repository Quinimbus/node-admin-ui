<script setup lang="ts">
import { Entity } from '@/datasource';
import { type Field } from '@/types/entities'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primevue';
import { computed, type PropType } from 'vue';
import EntityFormFields from './EntityFormFields.vue';

const props = defineProps({
    fields: {
        type: Array as PropType<Field[]>,
        required: true
    },
    modelValue: {
        type: Object as PropType<Entity>,
        required: true
    },
    groups: {
        type: Object as PropType<Map<string, { label: string }>>,
        default: () => new Map()
    }
})
const emit = defineEmits<{
    'update:model-value': [modelValue: Object]
}>()

const modelValue = props.modelValue

const tabs = computed(() => {
    const tabs = Array.from(props.groups.entries()).map(([key, value]) => ({
        key: key,
        label: value.label,
        fieldIsInGroup: (field: Field) => field.group === key
    }));
    if (props.fields.filter(f => f.group == null || f.group === '').length > 0) {
        tabs.push({
            key: '__null__',
            label: 'Ungrouped Fields',
            fieldIsInGroup: (field: Field) => field.group == null
        });
    }
    return tabs;
})

const firstTab = computed(() => {
    return tabs.value.length > 0 ? tabs.value[0].key : '0';
})

const updateField = (field: string, value: any) => {
    console.log("updateField", field, value)
    modelValue[field] = value;
    emit('update:model-value', modelValue);
}
</script>

<template>
    <div>
        <Tabs :value="firstTab" v-if="props.groups.size > 0" scrollable>
            <TabList>
                <Tab v-for="tab in tabs" :value="tab.key">{{ tab.label }}</Tab>
            </TabList>
            <TabPanels>
                <TabPanel v-for="tab in tabs" :key="tab.key" :value="tab.key">
                    <EntityFormFields
                        :fields="props.fields.filter(tab.fieldIsInGroup)"
                        :model-value="modelValue"
                        @update:field="updateField" />
                </TabPanel>
            </TabPanels>
        </Tabs>
        <EntityFormFields
            v-else
            :fields="props.fields"
            :model-value="modelValue"
            @update:field="updateField" />
    </div>
</template>