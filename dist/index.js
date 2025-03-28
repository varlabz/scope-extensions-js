export class Wrapper {
    constructor(value) {
        this.value = value;
    }
    /**
     * Get the value wrapped by `this` wrapper.
     * @returns the wrapped value, whose type is `T`
     */
    get item() {
        return this.value;
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
     * Calls the specified function block with `this` value as its argument and returns a `Wrapper` that wraps its
     * result, regardless whether the result is undefined or not.
     * @param block - The function to be executed with `this` as argument
     * @returns a `Wrapper` that wraps `block`'s result
     */
    letW(block) {
        const result = block(this.value);
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
     * Calls the specified function block with `this` value as its receiver and returns a `Wrapper` that wraps its
     * result, regardless whether the result is undefined or not.
     * @param block - The function to be executed with `this` as context
     * @returns a `Wrapper` that wraps `block`'s result
     */
    runW(block) {
        const result = block.call(this.value);
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
export default use;
