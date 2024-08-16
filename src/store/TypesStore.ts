import { TypeDefinition } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useTypesStore = defineStore('types', () => {
    const typeDefinitions = ref(<{ [key: string]: TypeDefinition }>{});

    const addTypeDefinition = (definition: TypeDefinition) => {
        typeDefinitions.value[definition.key] = definition;
    }

    return {
        typeDefinitions,
        addTypeDefinition
    }
});