export class Wrapper<T> {
    private readonly _value: T

    constructor(value: T) {
        this._value = value
    }

    /**
     * Get the value wrapped by `this` wrapper.
     * @returns the wrapped value, whose type is `T`
     */
    get value(): T {
        return this._value
    }

    /**
     * Calls the specified function block with `this` value as its argument and returns a `Wrapper` that wraps its
     * result when the result is not undefined, or return undefined.
     * @param block - The function to be executed with `this` as argument
     * @returns a `Wrapper` that wraps `block`'s result, or undefined.
     */
    let<R>(block: (it: T) => R): Wrapper<R> | undefined {
        const result = block(this.value);
        if (result !== undefined) return new Wrapper<R>(result);
    }

    /**
     * Calls the specified function block with `this` value as its argument and returns `this` value
     * @param block - The function to be executed with `this` as argument
     * @returns `this`, which is a Wrapper
     */
    also(block: (it: T) => void): Wrapper<T> {
        block(this.value);
        return this;
    }

    /**
     * Calls the specified function block with `this` value as its receiver and returns a `Wrapper` that wraps its
     * result when the result is not undefined, or return undefined.
     * @param block - The function to be executed with `this` as context
     * @returns a `Wrapper` that wraps `block`'s result, or undefined.
     */
    run<R>(block: (this: T) => R): Wrapper<R> | undefined {
        const result = block.call(this.value);
        if (result !== undefined) return new Wrapper<R>(result);
    }

    /**
     * Calls the specified function block with `this` value as its receiver and returns `this` value
     * @param block - The function to be executed with `this` as context
     * @returns `this`, which is a Wrapper
     */
    apply(block: (this: T) => void): Wrapper<T> {
        block.call(this.value);
        return this;
    }

    /**
     * Returns `this` value if it satisfies the given predicate or `undefined` if it doesn't
     * @param predicate - The function to be executed with `this` as argument and returns a truthy or falsy value
     * @returns `this` which is still a Wrapper or `undefined`
     */
    takeIf(predicate: (it: T) => boolean): Wrapper<T> | undefined {
        return predicate(this.value) ? this : undefined;
    }

    /**
     * Returns `this` value if it does not satisfy the given predicate or `undefined` if it does
     * @param predicate - The function to be executed with `this` as argument and returns a truthy or falsy value
     * @returns `this` which is still a Wrapper or `undefined`
     */
    takeUnless(predicate: (it: T) => boolean): Wrapper<T> | undefined {
        return predicate(this.value) ? undefined : this;
    }
}

export function use<T>(value: T | undefined | null): Wrapper<T> | undefined {
    if (value !== undefined && value !== null) return new Wrapper<T>(value)
}

export class WrapperAsync<T> {
    private readonly _value: T

    constructor(value: T) {
        this._value = value
    }

    /**
     * Get the value wrapped by `this` wrapper.
     * @returns the wrapped value, whose type is `T`
     */
    get value(): T {
        return this._value
    }

    /**
     * Calls the specified function block with `this` value as its argument and returns a `Wrapper` that wraps its
     * result when the result is not undefined, or return undefined.
     * @param block - The function to be executed with `this` as argument
     * @returns a `Wrapper` that wraps `block`'s result, or undefined.
     */
    async let<R>(block: (it: T) => R): Promise<WrapperAsync<R> | undefined> {
        const result = await block(this.value);
        if (result !== undefined) return new WrapperAsync<R>(result);
    }

    /**
     * Calls the specified function block with `this` value as its argument and returns `this` value
     * @param block - The function to be executed with `this` as argument
     * @returns `this`, which is a Wrapper
     */
    async also(block: (it: T) => void): Promise<WrapperAsync<T>> {
        await block(this.value);
        return this;
    }

    /**
     * Calls the specified function block with `this` value as its receiver and returns a `Wrapper` that wraps its
     * result when the result is not undefined, or return undefined.
     * @param block - The function to be executed with `this` as context
     * @returns a `Wrapper` that wraps `block`'s result, or undefined.
     */
    async run<R>(block: (this: T) => R): Promise<WrapperAsync<R> | undefined> {
        const result = await block.call(this.value);
        if (result !== undefined) return new WrapperAsync<R>(result);
    }

    /**
     * Calls the specified function block with `this` value as its receiver and returns `this` value
     * @param block - The function to be executed with `this` as context
     * @returns `this`, which is a Wrapper
     */
    async apply(block: (this: T) => void): Promise<WrapperAsync<T>> {
        await block.call(this.value);
        return this;
    }

    /**
     * Returns `this` value if it satisfies the given predicate or `undefined` if it doesn't
     * @param predicate - The function to be executed with `this` as argument and returns a truthy or falsy value
     * @returns `this` which is still a Wrapper or `undefined`
     */
    async takeIf(predicate: (it: T) => boolean): Promise<WrapperAsync<T> | undefined> {
        return await predicate(this.value) ? this : undefined;
    }

    /**
     * Returns `this` value if it does not satisfy the given predicate or `undefined` if it does
     * @param predicate - The function to be executed with `this` as argument and returns a truthy or falsy value
     * @returns `this` which is still a Wrapper or `undefined`
     */
    async takeUnless(predicate: (it: T) => boolean): Promise<WrapperAsync<T> | undefined> {
        return await predicate(this.value) ? undefined : this;
    }
}

export function useAsync<T>(value: T | undefined | null): WrapperAsync<T> | undefined {
    if (value !== undefined && value !== null) return new WrapperAsync<T>(value)
}


