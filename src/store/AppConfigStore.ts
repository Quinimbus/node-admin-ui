import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppConfigStore = defineStore('appConfig', () => {
    const basePath = ref('');
    const name = ref('app');
    const version = ref('0');
    function setBasePath(value: string) {
        basePath.value = value;
    }
    function setName(value: string) {
        name.value = value;
    }
    function setVersion(value: string) {
        version.value = value;
    }
    return {
        basePath,
        name,
        version,
        setBasePath,
        setName,
        setVersion,
    };
});
