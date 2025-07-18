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
    SET_STRING,
    SET_NUMBER,
    SET_BOOLEAN,
    SET_LOCALDATE,
    SET_LOCALDATETIME,
    SET_SELECTION,
    UNKNOWN
}

export type AllowedValue = {
    key: string
    label: string
}

export enum FieldTableColumnVisibility {
    ALWAYS,
    NEVER,
    DEFAULT_VISIBLE,
    DEFAULT_HIDDEN
}

export type FieldTableConfig = {
    visibility: FieldTableColumnVisibility
}

export type Field = {
    key: string
    label: string
    type: FieldType
    group?: string
    owningField: boolean
    hiddenInForm: boolean
    references: string | null
    allowedValues: AllowedValue[]
    table: FieldTableConfig
}

export const DefaultField = {
    owningField: false,
    hiddenInForm: false,
    references: null,
    allowedValues: [],
    table: {
        visibility: FieldTableColumnVisibility.ALWAYS
    }
}

export type Action = {
    key: string
    label: string
    icon: string
    requiredRoles: RequiredRole
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
    group?: string
    fieldGroups: Map<string, { label: string }>
    globalActions: Action[]
    instanceActions: Action[]
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