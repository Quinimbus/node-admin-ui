import { TypeDefinition } from "@/types";

export type IdAndLabel = {
    id: string
    label: string
}

export interface ReferencesDataSource {
    loadAll(): Promise<IdAndLabel[]>;
}

export class RestBasedReferencesDataSource implements ReferencesDataSource {

    idAndLabelPath: string
    idPath: string
    basepath: string

    constructor(basepath: string, type: TypeDefinition) {
        this.basepath = basepath
        this.idAndLabelPath = `${basepath}/${type.keyPlural}/as/idAndLabel`
        this.idPath = `${basepath}/${type.keyPlural}/as/ids`
    }

    async loadAll(): Promise<IdAndLabel[]> {
        return fetch(this.idAndLabelPath)
            .then(async response => {
                if (response.status == 200) {
                    const idAndLabelList = await response.json() as IdAndLabel[]
                    console.log('Loaded references', idAndLabelList)
                    return idAndLabelList
                }
                if (response.status == 404) {
                    return fetch(this.idPath).then(async response => {
                        if (response.status == 200) {
                            const idList = await response.json() as string[]
                            return idList.map((item) => {
                                return {
                                    id: item,
                                    label: item
                                }
                            })
                        }
                        throw new Error('Failed to load references')
                    });
                }
                throw new Error('Failed to load references, got status ' + response.status);
            });
    }
}