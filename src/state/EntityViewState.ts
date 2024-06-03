import { reactive } from "vue";
import { Entity } from "@/datasource/Entity";

export type EntityViewState = {
    editingItem: boolean;
    itemToEdit?: Entity;

    editItem: (item: Entity) => void;
    stopEditing: () => void;
}

export const entityViewState = reactive<EntityViewState>({
    editingItem: false,
    itemToEdit: undefined,
    editItem(item: Entity) {
        entityViewState.editingItem = true;
        entityViewState.itemToEdit = item.clone();
    },
    stopEditing() {
        entityViewState.editingItem = false;
        entityViewState.itemToEdit = undefined;
    }
});