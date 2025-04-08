export declare class Wrapper<T> {
    private readonly _value;
    constructor(value: T);
    /**
     * Get the value wrapped by `this` wrapper.
     * @returns the wrapped value, whose type is `T`
     */
    get value(): T;
    /**
     * Calls the specified function block with `this` value as its argument and returns a `Wrapper` that wraps its
     * result when the result is not undefined, or return undefined.
     * @param block - The function to be executed with `this` as argument
     * @returns a `Wrapper` that wraps `block`'s result, or undefined.
     */
    let<R>(block: (it: T) => R): Wrapper<R> | undefined;
    /**
     * Calls the specified function block with `this` value as its argument and returns `this` value
     * @param block - The function to be executed with `this` as argument
     * @returns `this`, which is a Wrapper
     */
    also(block: (it: T) => void): Wrapper<T>;
    /**
     * Calls the specified function block with `this` value as its receiver and returns a `Wrapper` that wraps its
     * result when the result is not undefined, or return undefined.
     * @param block - The function to be executed with `this` as context
     * @returns a `Wrapper` that wraps `block`'s result, or undefined.
     */
    run<R>(block: (this: T) => R): Wrapper<R> | undefined;
    /**
     * Calls the specified function block with `this` value as its receiver and returns `this` value
     * @param block - The function to be executed with `this` as context
     * @returns `this`, which is a Wrapper
     */
    apply(block: (this: T) => void): Wrapper<T>;
    /**
     * Returns `this` value if it satisfies the given predicate or `undefined` if it doesn't
     * @param predicate - The function to be executed with `this` as argument and returns a truthy or falsy value
     * @returns `this` which is still a Wrapper or `undefined`
     */
    takeIf(predicate: (it: T) => boolean): Wrapper<T> | undefined;
    /**
     * Returns `this` value if it does not satisfy the given predicate or `undefined` if it does
     * @param predicate - The function to be executed with `this` as argument and returns a truthy or falsy value
     * @returns `this` which is still a Wrapper or `undefined`
     */
    takeUnless(predicate: (it: T) => boolean): Wrapper<T> | undefined;
}
export declare function use<T>(value: T | undefined | null): Wrapper<T> | undefined;
export declare class WrapperAsync<T> {
    private readonly _value;
    constructor(value: T);
    /**
     * Get the value wrapped by `this` wrapper.
     * @returns the wrapped value, whose type is `T`
     */
    get value(): T;
    /**
     * Calls the specified function block with `this` value as its argument and returns a `Wrapper` that wraps its
     * result when the result is not undefined, or return undefined.
     * @param block - The function to be executed with `this` as argument
     * @returns a `Wrapper` that wraps `block`'s result, or undefined.
     */
    let<R>(block: (it: T) => R): Promise<WrapperAsync<R> | undefined>;
    /**
     * Calls the specified function block with `this` value as its argument and returns `this` value
     * @param block - The function to be executed with `this` as argument
     * @returns `this`, which is a Wrapper
     */
    also(block: (it: T) => void): Promise<WrapperAsync<T>>;
    /**
     * Calls the specified function block with `this` value as its receiver and returns a `Wrapper` that wraps its
     * result when the result is not undefined, or return undefined.
     * @param block - The function to be executed with `this` as context
     * @returns a `Wrapper` that wraps `block`'s result, or undefined.
     */
    run<R>(block: (this: T) => R): Promise<WrapperAsync<R> | undefined>;
    /**
     * Calls the specified function block with `this` value as its receiver and returns `this` value
     * @param block - The function to be executed with `this` as context
     * @returns `this`, which is a Wrapper
     */
    apply(block: (this: T) => void): Promise<WrapperAsync<T>>;
    /**
     * Returns `this` value if it satisfies the given predicate or `undefined` if it doesn't
     * @param predicate - The function to be executed with `this` as argument and returns a truthy or falsy value
     * @returns `this` which is still a Wrapper or `undefined`
     */
    takeIf(predicate: (it: T) => boolean): Promise<WrapperAsync<T> | undefined>;
    /**
     * Returns `this` value if it does not satisfy the given predicate or `undefined` if it does
     * @param predicate - The function to be executed with `this` as argument and returns a truthy or falsy value
     * @returns `this` which is still a Wrapper or `undefined`
     */
    takeUnless(predicate: (it: T) => boolean): Promise<WrapperAsync<T> | undefined>;
}
export declare function useAsync<T>(value: T | undefined | null): WrapperAsync<T> | undefined;
