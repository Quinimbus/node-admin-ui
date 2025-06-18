import { plainToInstance } from "class-transformer";
import type { TypeDefinition } from "../types/entities";
import { Entity } from "./Entity";

export interface EntityListDataSource<E extends Entity> {
    loadAll(): Promise<E[]>;
    save(entity: E): Promise<SaveResult>;
    create(entity: E): Promise<SaveResult>;
    delete(entity: E): Promise<DeleteResult>;
    callGlobalAction(action: string): Promise<ActionResult>;
    getDownloadUrl(entity: E, field: string): string
    getListDownloadUrl(entity: E, field: string, index: number): string
}

export class SaveResult {
    message: string;
    saved: boolean;

    constructor(saved: boolean, message: string) {
        this.saved = saved;
        this.message = message;
    }
}

export class DeleteResult {
    message: string;
    deleted: boolean;

    constructor(deleted: boolean, message: string) {
        this.deleted = deleted;
        this.message = message;
    }
}

export class ActionResult {
    message: string;
    success: boolean;

    constructor(success: boolean, message: string) {
        this.success = success;
        this.message = message;
    }
}

export class RestBasedEntityListDataSource<E extends Entity> implements EntityListDataSource<E> {

    typeClass: new() => E
    allPath: string
    existingPath: (id: string) => string
    key: string
    keyField: string
    authToken: () => string | null

    constructor(typeClass: new() => E, basepath: String, authToken: () => string | null, type: TypeDefinition) {
        this.typeClass = typeClass
        this.allPath = `${basepath}/${type.keyPlural}`
        this.existingPath = id => `${basepath}/${type.key}/${id}`
        this.key = type.key
        this.keyField = type.keyField
        this.authToken = authToken;
    }

    async loadAll(): Promise<E[]> {
        const response = await fetch(this.allPath, {
            method: 'GET',
            headers: this.getHeaders()
        })
        const body = await response.json() as any[]
        return plainToInstance(this.typeClass, body)
    }

    async save(entity: E): Promise<SaveResult> {
        const body = this.prepareEntityBody(entity);
        return await fetch(this.existingPath(entity[this.keyField]), {
            method: 'PUT',
            headers: this.getHeaders(),
            body: body
        }).then(response => {
            if (response.ok) {
                return new SaveResult(true, "saved")
            } else {
                return new SaveResult(false, "Got " + response.status + " from server")
            }
        }).catch(error => new SaveResult(false, 'Error: ' + error));
    }

    async create(entity: E): Promise<SaveResult> {
        const body = this.prepareEntityBody(entity);
        return await fetch(this.allPath, {
            method: 'POST',
            headers: this.getHeaders(),
            body: body
        }).then(response => {
            if (response.ok) {
                return new SaveResult(true, "created")
            } else {
                return new SaveResult(false, "Got " + response.status + " from server")
            }
        }).catch(error => new SaveResult(false, 'Error: ' + error));
    }

    async delete(entity: E): Promise<DeleteResult> {
        return await fetch(this.existingPath(entity[this.keyField]), {
            method: 'DELETE',
            headers: this.getHeaders()
        }).then(response => {
            if (response.ok) {
                return new DeleteResult(true, "deleted")
            } else {
                return new DeleteResult(false, "Got " + response.status + " from server")
            }
        }).catch(error => new DeleteResult(false, 'Error: ' + error));
    }

    async callGlobalAction(action: string): Promise<ActionResult> {
        return await fetch(`${this.allPath}/action/${action}`, {
            method: 'POST',
            headers: this.getHeaders()
        }).then(response => {
            if (response.ok) {
                return new ActionResult(true, "action called")
            } else {
                return new ActionResult(false, "Got " + response.status + " from server")
            }
        }).catch(error => new ActionResult(false, 'Error: ' + error));
    }

    getDownloadUrl(entity: E, field: string): string {
        return `${this.existingPath(entity[this.keyField])}/${field}/download`;
    }

    getListDownloadUrl(entity: E, field: string, index: number): string {
        return `${this.existingPath(entity[this.keyField])}/${field}/${index}/download`;
    }

    private prepareEntityBody(entity: E): FormData | Blob {
        const form = new FormData();
        let fileUpload = false;
        Object.entries(entity).forEach(([key, value]) => {
            if (value instanceof File) {
                entity = { ...entity, [key]: {multipartId: key} }
                form.append(key, value)
                fileUpload = true;
            }
            if (value instanceof Array) {
                value.forEach((element, index) => {
                    if (element instanceof File) {
                        entity[key][index] = {multipartId: `${key}.${index}`}
                        form.append(`${key}.${index}`, element)
                        fileUpload = true;
                    }
                });
            }
        });
        const entityBlob = new Blob([JSON.stringify(entity)], { type: 'application/json' });
        if (fileUpload) {
            form.append('entity', entityBlob);
        }
        return fileUpload ? form : entityBlob;
    }

    private getHeaders(): HeadersInit | undefined {
        const token = this.authToken();
        if (token) {
            const headers: HeadersInit = {
                'Authorization': `Bearer ${token}`,
            };
            return headers;
        }
        return undefined;
    }
}