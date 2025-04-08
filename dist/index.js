export class Wrapper {
    constructor(value) {
        this._value = value;
    }
    /**
     * Get the value wrapped by `this` wrapper.
     * @returns the wrapped value, whose type is `T`
     */
    get value() {
        return this._value;
    }
    /**
     * Calls the specified function block with `this` value as its argument and returns a `Wrapper` that wraps its
     * result when the result is not undefined, or return undefined.
     * @param block - The function to be executed with `this` as argument
     * @returns a `Wrapper` that wraps `block`'s result, or undefined.
     */
    let(block) {
        const result = block(this.value);
        if (result !== undefined)
            return new Wrapper(result);
    }
    /**
     * Calls the specified function block with `this` value as its argument and returns `this` value
     * @param block - The function to be executed with `this` as argument
     * @returns `this`, which is a Wrapper
     */
    also(block) {
        block(this.value);
        return this;
    }
    /**
     * Calls the specified function block with `this` value as its receiver and returns a `Wrapper` that wraps its
     * result when the result is not undefined, or return undefined.
     * @param block - The function to be executed with `this` as context
     * @returns a `Wrapper` that wraps `block`'s result, or undefined.
     */
    run(block) {
        const result = block.call(this.value);
        if (result !== undefined)
            return new Wrapper(result);
    }
    /**
     * Calls the specified function block with `this` value as its receiver and returns `this` value
     * @param block - The function to be executed with `this` as context
     * @returns `this`, which is a Wrapper
     */
    apply(block) {
        block.call(this.value);
        return this;
    }
    /**
     * Returns `this` value if it satisfies the given predicate or `undefined` if it doesn't
     * @param predicate - The function to be executed with `this` as argument and returns a truthy or falsy value
     * @returns `this` which is still a Wrapper or `undefined`
     */
    takeIf(predicate) {
        return predicate(this.value) ? this : undefined;
    }
    /**
     * Returns `this` value if it does not satisfy the given predicate or `undefined` if it does
     * @param predicate - The function to be executed with `this` as argument and returns a truthy or falsy value
     * @returns `this` which is still a Wrapper or `undefined`
     */
    takeUnless(predicate) {
        return predicate(this.value) ? undefined : this;
    }
}
export function use(value) {
    if (value !== undefined && value !== null)
        return new Wrapper(value);
}
export class WrapperAsync {
    constructor(value) {
        this._value = value;
    }
    /**
     * Get the value wrapped by `this` wrapper.
     * @returns the wrapped value, whose type is `T`
     */
    get value() {
        return this._value;
    }
    /**
     * Calls the specified function block with `this` value as its argument and returns a `Wrapper` that wraps its
     * result when the result is not undefined, or return undefined.
     * @param block - The function to be executed with `this` as argument
     * @returns a `Wrapper` that wraps `block`'s result, or undefined.
     */
    async let(block) {
        const result = await block(this.value);
        if (result !== undefined)
            return new WrapperAsync(result);
    }
    /**
     * Calls the specified function block with `this` value as its argument and returns `this` value
     * @param block - The function to be executed with `this` as argument
     * @returns `this`, which is a Wrapper
     */
    async also(block) {
        await block(this.value);
        return this;
    }
    /**
     * Calls the specified function block with `this` value as its receiver and returns a `Wrapper` that wraps its
     * result when the result is not undefined, or return undefined.
     * @param block - The function to be executed with `this` as context
     * @returns a `Wrapper` that wraps `block`'s result, or undefined.
     */
    async run(block) {
        const result = await block.call(this.value);
        if (result !== undefined)
            return new WrapperAsync(result);
    }
    /**
     * Calls the specified function block with `this` value as its receiver and returns `this` value
     * @param block - The function to be executed with `this` as context
     * @returns `this`, which is a Wrapper
     */
    async apply(block) {
        await block.call(this.value);
        return this;
    }
    /**
     * Returns `this` value if it satisfies the given predicate or `undefined` if it doesn't
     * @param predicate - The function to be executed with `this` as argument and returns a truthy or falsy value
     * @returns `this` which is still a Wrapper or `undefined`
     */
    async takeIf(predicate) {
        return await predicate(this.value) ? this : undefined;
    }
    /**
     * Returns `this` value if it does not satisfy the given predicate or `undefined` if it does
     * @param predicate - The function to be executed with `this` as argument and returns a truthy or falsy value
     * @returns `this` which is still a Wrapper or `undefined`
     */
    async takeUnless(predicate) {
        return await predicate(this.value) ? undefined : this;
    }
}
export function useAsync(value) {
    if (value !== undefined && value !== null)
        return new WrapperAsync(value);
}
