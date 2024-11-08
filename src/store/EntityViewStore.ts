import { Entity } from "@/datasource";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useEntityViewStore = defineStore('entityView', () => {
    const editingItem = ref(false);
    const itemToEdit = ref<Entity | undefined>(undefined);

    const editItem = (item: Entity) => {
        editingItem.value = true;
        itemToEdit.value = item.clone();
    }

    const stopEditing = () => {
        editingItem.value = false;
        itemToEdit.value = undefined;
    }

    return {
        editingItem,
        itemToEdit,
        editItem,
        stopEditing
    }
});