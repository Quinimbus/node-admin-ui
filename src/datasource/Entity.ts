export abstract class Entity<EC = any> {

    [index: string]:any

    public clone(): EC {
        var cloneObj = new (this.constructor as any)();
        for (var field in this) {
            if (typeof this[field] === 'object' && (this[field] as Object) instanceof Entity) {
                cloneObj[field] = (this[field] as Entity).clone();
            } else {
                cloneObj[field] = this[field];
            }
        }
        return cloneObj;
    }
}