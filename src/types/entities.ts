export enum FieldType {
    STRING,
    NUMBER,
    LOCALDATE,
    LOCALDATETIME,
    BINARY,
    UNKNOWN
}

export type Field = {
    key: string
    label: string
    type: FieldType
    owningField: boolean
    hiddenInForm: boolean
}

export const DefaultField = {
    owningField: false,
    hiddenInForm: false
}

export type TypeDefinition = {
    key: string
    keyPlural: string
    labelSingular: string
    labelPlural: string
    fields: Field[]
    keyField: string
    listView: any
    icon: string
    weak: boolean
    owningType?: string
}

export const DefaultTypeDefinition = {
    weak: false
}