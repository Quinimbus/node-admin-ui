import type { Field, TypeDefinition } from '../types/entities';
import type { RouteRecordRaw } from 'vue-router';

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

export const fileTypeIcon = (contentType: string | null | undefined) => {
    switch (contentType?.substring(0, contentType.indexOf(';') || contentType.length)) {
        case null:
        case undefined:
            return 'mdi-file-hidden'
        case 'application/pdf':
            return 'mdi-file-pdf'
        case 'application/msword':
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            return 'mdi-file-word'
        case 'application/vnd.ms-excel':
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            return 'mdi-file-excel'
        case 'application/vnd.ms-powerpoint':
        case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
            return 'mdi-file-powerpoint'
        case 'application/zip':
            return 'mdi-file-zip'
        case 'text/plain':
            return 'mdi-file-document'
        case 'image/jpeg':
        case 'image/png':
        case 'image/gif':
        case 'image/bmp':
            return 'mdi-file-image'
        case 'video/mp4':
        case 'video/mpeg':
        case 'video/quicktime':
            return 'mdi-file-video'
        case 'audio/mpeg':
        case 'audio/ogg':
        case 'audio/wav':
            return 'mdi-file-music'
        default:
            return 'mdi-file'
    }
}