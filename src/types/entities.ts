export enum FieldType {
    STRING,
    NUMBER,
    BOOLEAN,
    LOCALDATE,
    LOCALDATETIME,
    SELECTION,
    BINARY,
    LIST_STRING,
    LIST_NUMBER,
    LIST_BOOLEAN,
    LIST_LOCALDATE,
    LIST_LOCALDATETIME,
    LIST_SELECTION,
    LIST_BINARY,
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

export type Action = {
    key: string
    label: string
    icon: string
}

export type RequiredRole = {
    anonymous: boolean
    roles: string[]
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
    globalActions: Action[]
    requiredRoles: {
        create: RequiredRole
        read: RequiredRole
        update: RequiredRole
        delete: RequiredRole
    }
}

export const DefaultTypeDefinition = {
    weak: false
}