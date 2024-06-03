import { describe, expect, test } from '@jest/globals';
import { Entity } from '@/datasource';

class TestEntity extends Entity<TestEntity> {

    uid?: string
    text?: string
    number?: number
}

describe('Entity', () => {
    test('should clone correctly', () => {
        const entity = new TestEntity();
        entity.uid = crypto.randomUUID();
        entity.text = 'Hello, world!';
        entity.number = 42;
        const clone = entity.clone();

        expect(clone).not.toBe(entity); // They should not be the same object
        expect(clone).toEqual(entity); // But they should have the same properties
    });
});