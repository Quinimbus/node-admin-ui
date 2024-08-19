export enum FieldType {
    STRING,
    NUMBER,
    BOOLEAN,
    LOCALDATE,
    LOCALDATETIME,
    SELECTION,
    BINARY,
    UNKNOWN
}

export type AllowedValue = {
    key: string
    label: string
}

export type Field = {
    key: string
    label: string
    type: FieldType
    owningField: boolean
    hiddenInForm: boolean
    references: string | null
    allowedValues: AllowedValue[]
}

export const DefaultField = {
    owningField: false,
    hiddenInForm: false,
    references: null,
    allowedValues: []
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