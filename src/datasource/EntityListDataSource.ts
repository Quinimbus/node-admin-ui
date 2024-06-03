import { plainToInstance } from "class-transformer";
import type { TypeDefinition } from "../types/entities";
import { Entity } from "./Entity";

export interface EntityListDataSource<E extends Entity> {
    loadAll(): Promise<E[]>;
    save(entity: E): Promise<SaveResult>;
    create(entity: E): Promise<SaveResult>;
    delete(entity: E): Promise<DeleteResult>;
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

export class RestBasedEntityListDataSource<E extends Entity> implements EntityListDataSource<E> {

    typeClass: new() => E
    allPath: string
    existingPath: (id: string) => string
    key: string
    keyField: string

    constructor(typeClass: new() => E, basepath: String, type: TypeDefinition) {
        this.typeClass = typeClass
        this.allPath = `${basepath}/${type.keyPlural}`
        this.existingPath = id => `${basepath}/${type.key}/${id}`
        this.key = type.key
        this.keyField = type.keyField
    }

    async loadAll(): Promise<E[]> {
        const response = await fetch(this.allPath)
        const body = await response.json() as any[]
        return plainToInstance(this.typeClass, body)
    }

    async save(entity: E): Promise<SaveResult> {
        return await fetch(this.existingPath(entity[this.keyField]), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entity)
        }).then(response => {
            if (response.ok) {
                return new SaveResult(true, "saved")
            } else {
                return new SaveResult(false, "Got " + response.status + " from server")
            }
        }).catch(error => new SaveResult(false, 'Error: ' + error));
    }

    async create(entity: E): Promise<SaveResult> {
        return await fetch(this.allPath, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entity)
        }).then(response => {
            if (response.ok) {
                return new SaveResult(true, "saved")
            } else {
                return new SaveResult(false, "Got " + response.status + " from server")
            }
        }).catch(error => new SaveResult(false, 'Error: ' + error));
    }

    async delete(entity: E): Promise<DeleteResult> {
        return await fetch(this.existingPath(entity[this.keyField]), {
            method: 'DELETE',
        }).then(response => {
            if (response.ok) {
                return new DeleteResult(true, "deleted")
            } else {
                return new DeleteResult(false, "Got " + response.status + " from server")
            }
        }).catch(error => new DeleteResult(false, 'Error: ' + error));
    }
}