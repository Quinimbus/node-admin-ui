//import { VDataTable } from 'vuetify/components';
import type { Field, TypeDefinition } from '../types/entities';
import type { RouteRecordRaw } from 'vue-router';
//type UnwrapReadonlyArrayType<A> = A extends Readonly<Array<infer I>> ? UnwrapReadonlyArrayType<I> : A
//type DT = InstanceType<typeof VDataTable>;
//type ReadonlyDataTableHeader = UnwrapReadonlyArrayType<DT['headers']>;

//type ReadonlyHeaders = VDataTable['$props']['headers'];
//type UnwrapReadonlyArray<A> = A extends Readonly<Array<infer I>> ? I : never;
//type ReadonlyDataTableHeader = UnwrapReadonlyArray<ReadonlyHeaders>;

export const toTableHeader = (f: Field)/*: ReadonlyDataTableHeader*/ => {
    return {
        title: f.label,
        align: "start",
        sortable: false,
        key: f.key
    }
}

export const toRoute = (type: TypeDefinition): RouteRecordRaw => {
    return {
        path: '/' + type.keyPlural,
        name: type.labelPlural,
        component: type.listView
    }
}