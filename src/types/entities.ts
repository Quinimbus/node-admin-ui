export enum FieldType {
    STRING,
    NUMBER,
    BOOLEAN,
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
    references: string | null
}

export const DefaultField = {
    owningField: false,
    hiddenInForm: false,
    references: null
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