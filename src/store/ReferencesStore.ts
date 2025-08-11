import { defineStore } from 'pinia';
import { IdAndLabel, RestBasedReferencesDataSource } from '@/datasource';
import { computed, ref } from 'vue';
import { useAppConfigStore, useAuthStore, useTypesStore } from '.';

export enum LoadingState {
    NOT_LOADED,
    LOADING,
    LOADED,
    FAILED
}

export const useReferencesStore = defineStore('references', () => {
    const appConfigStore = useAppConfigStore();
    const typesStore = useTypesStore();
    const auth = useAuthStore();

    const idsAndLabelsLoadingStates = ref(<{ [key: string]: LoadingState }>{});
    const idsAndLabels = ref(<{ [key: string]: IdAndLabel[] }>{});

    const loadingState = computed(() => {
        return (key: string) => idsAndLabelsLoadingStates.value[key] || LoadingState.NOT_LOADED;
    });

    const reloadIdsAndLabelsFor = async (key: string) => {
        idsAndLabelsLoadingStates.value[key] = LoadingState.LOADING;
        const dataSource = new RestBasedReferencesDataSource(appConfigStore.basePath, () => auth.token, typesStore.typeDefinitions[key]);
        return dataSource.loadAll().then((data) => {
            idsAndLabels.value[key] = data;
            idsAndLabelsLoadingStates.value[key] = LoadingState.LOADED;
            return data;
        }).catch(e => {
            idsAndLabelsLoadingStates.value[key] = LoadingState.FAILED;
            throw e;
        });
    }

    const idsAndLabelsFor = async (key: string) => {
        if (loadingState.value(key) === LoadingState.NOT_LOADED) {
            return reloadIdsAndLabelsFor(key);
        }
        if (loadingState.value(key) === LoadingState.LOADING) {
            await new Promise(resolve => setTimeout(resolve, 100));
            return idsAndLabelsFor(key);
        }
        return Promise.resolve(idsAndLabels.value[key]);
    }

    const invalidateFor = async (key: string) => {
        delete idsAndLabels.value[key];
        delete idsAndLabelsLoadingStates.value[key];
    }

    return {
        idsAndLabelsLoadingStates,
        idsAndLabels,
        loadingState,
        reloadIdsAndLabelsFor,
        idsAndLabelsFor,
        invalidateFor
    }
});