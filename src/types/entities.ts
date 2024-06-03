export enum FieldType {
    STRING,
    NUMBER,
    LOCALDATE,
    LOCALDATETIME,
    UNKNOWN
}

export type Field = {
    key: string
    label: string
    type: FieldType
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
}