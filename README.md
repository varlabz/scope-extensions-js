# scope-extensions-js

<img src="img/logo.png" width="128" align="right">

[![Build Status](https://travis-ci.com/TheDavidDelta/scope-extensions-js.svg?branch=master)](https://travis-ci.com/TheDavidDelta/scope-extensions-js)
[![NPM Version](https://img.shields.io/npm/v/scope-extensions-js)](https://www.npmjs.com/package/scope-extensions-js)
[![License](https://img.shields.io/github/license/TheDavidDelta/scope-extensions-js)](./LICENSE)

Package for using [Kotlin's Scope Function Extensions](https://kotlinlang.org/docs/reference/scope-functions.html) with TypeScript.

It also supports the use of the new [Optional Chaining Operator](https://github.com/tc39/proposal-optional-chaining), bringing the logic of [Kotlin's Null Safe Calls](https://kotlinlang.org/docs/reference/null-safety.html) to the JavaScript world.

It's a striped down version of https://github.com/Starrah/scope-extensions-js with removed javascript and browser support.

## Installation

Just install the package using NPM

```shell
npm i --save git@github.com:varlabz/scope-extensions-js.git
```

and import it directly to any file.

```typescript
import use from "@varlabz/scope-extensions-js";
```

## Usage
Wrap your value with `use()` function, which returns a `Wrapper` that wraps your value when it is not undefined.  
When your value as the argument of `use()` is undefined or null, `use()` will return undefined.

Then on the `Wrapper`, you can use functions `let`, `also`, `run` or `apply` and it'll be passed as the argument or the context of a scope function.  
The return value of the scope functions is still a `Wrapper` or undefined.

Finally, you can use property `Wrapper.item` to retrieve the value from the `Wrapper`.

```typescript
import use from "@varlabz/scope-extensions-js";

const obj = { name: "Daniel", age: 30 };

use(obj)?.let(it => {
    return it.age < 0 ? it.age : 0;
}).also(it => {
    console.log(it);
}); // prints 30

const obj2 = use(obj)?.let(it => {
    return it.age < 0 ? it.age : 0;
}).item // obj2 is of type number
```

This way, you can execute a block of code only if a value is neither null nor undefined.

```typescript
import use from "@varlabz/scope-extensions-js";

const str: string | null = await getData();

// later
use(str)?.also(it => {
    console.log(`Already initialized: ${it}`);
}) ?? console.log("Still not initialized");
```

The above code is equivalent to this

```typescript
if (str != null && str != undefined)
    console.log(`Already initialized: ${str!}`);
else
    console.log("Still not initialized");
```

The usage of `takeIf` & `takeUnless` is a bit different. You can call any value with `takeIf` and it will return the caller instance if the predicate is `true`, or `undefined` if it's `false` (and vice versa when using `takeUnless`).

```typescript
import use from "@varlabz/scope-extensions-js";

const account = await getCurrent();

use(account)?.takeIf(it => {
    return list.includes(it.id);
})?.also(it => {
    console.log(it);
}) ?? console.log("Not included");
```

## Differences

We could group the 4 main extensions into 2 groups of 2 each, based on both the argument type and the return value:
+ `let` & `also` receive the caller instance as a function parameter, and `run` & `apply` receive the caller instance as the function context (`this`).
+ `let` & `run` return the function result (`return`) value, and `also` & `apply` return the caller instance (`this`).

Summed up in this table:

|                    | **`it` argument** | **`this` context** |
|--------------------|:-----------------:|:------------------:|
| **Returns result** | `let`             | `run`              |
| **Returns `this`** | `also`            | `apply`            |


Note that `let` & `also` can be called with standard lambda/arrow functions, but because JavaScript arrow functions don't have an own `this` context, `run` & `apply` have to be called with standard functions.

Here is an example of each one of them:
+ `let`
```typescript
const data: Array<number> | null = await idsFromFile();

const str = use(data)?.let(it => 
    processToString(it);
).item ?? "empty";
```
+ `also`
```typescript
const list: Array<string> = model.getNames();

const filtered = use(list).also(it => 
    it.slice(0, 4);
).also(it =>
    applyFilter(filter, it);
).also(console.log);

// same as
const filtered = use(list).also(it => {
    it.slice(0, 4);
    applyFilter(filter, it);
    console.log(it);
});
```
+ `run`
```typescript
const list: Array<object> | undefined = currentAcc?.getContacts();

const lastsByName = use(list)?.run(function() {
    this.filter();
    this.reverse();
    return this.slice(0, 3);
});
```
+ `apply`
```typescript
const obj = { name: "Daniel", age: 30 };

use(obj).apply(function() {
    this.name = "Dan";
    this.age++;
    this["country"] = "Canada";
});
```

## License

Copyright © 2020 [TheDavidDelta](https://github.com/TheDavidDelta).  
This project is [MIT](./LICENSE) licensed.
