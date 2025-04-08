import { use } from "../index";

describe("let", () => {
    test("works with object", () => {
        const obj = { name: "Daniel", age: 30 };
        use(obj)?.let(it => expect(it).toBeInstanceOf(Object));
    });
    test("works with number", () => {
        const number = 5;
        use(number)?.let(it => expect(typeof it).toBe("number"));
        use(number)?.let(it => expect(it).toBe(number));
    });
    test("works with string", () => {
        const string = "Hello world";
        use(string)?.let(it => expect(typeof it).toBe("string"));
        use(string)?.let(it => expect(it).toBe(string));
    });
    test("works with boolean", () => {
        const boolean = true;
        use(boolean)?.let(it => expect(typeof it).toBe("boolean"));
        use(boolean)?.let(it => expect(it).toBe(boolean));
    });
    test("returns value", () => {
        const obj = { name: "Daniel", age: 30 };
        const value = use(obj)?.let(it => it.age)?.value;
        expect(value).toBe(30);
    });
    test("works with nullable", () => {
        const str: string | null = "Hello world";
        const value = use(str)?.let(it => it.split(" ")[0])?.value;
        expect(value).toBe("Hello");
    });
    test("fails with null", () => {
        const str: string | null = null;
        const value = use<string>(str)?.let(it => it.split(" ")[0])?.value;
        expect(value).toBeUndefined();
    });
    test("fails with undefined", () => {
        const str: string | undefined = undefined;
        const value = use<string>(str)?.let(it => it.split(" ")[0])?.value;
        expect(value).toBeUndefined();
    });
});

describe("also", () => {
    test("works with object", () => {
        const obj = { name: "Daniel", age: 30 };
        use(obj)?.also(it => expect(it).toBeInstanceOf(Object));
    });
    test("works with number", () => {
        const number = 5;
        use(number)?.also(it => expect(typeof it).toBe("number"));
        use(number)?.also(it => expect(it).toBe(number));
    });
    test("works with string", () => {
        const string = "Hello world";
        use(string)?.also(it => expect(typeof it).toBe("string"));
        use(string)?.also(it => expect(it).toBe(string));
    });
    test("works with boolean", () => {
        const boolean = true;
        use(boolean)?.also(it => expect(typeof it).toBe("boolean"));
        use(boolean)?.also(it => expect(it).toBe(boolean));
    });
    test("returns instance", () => {
        const obj = { name: "Daniel", age: 30 };
        const value = use(obj)?.also(it => it.name).value;
        expect(value).toBe(obj);
    });
    test("modifies value", () => {
        const obj = { name: "Daniel", age: 30 };
        const value = use(obj)?.also(it => it.age = 40);
        expect(value?.value).toBe(obj);
        expect(value?.value.age).toBe(40);
    });
    test("works with nullable", () => {
        const obj: Record<string, any> | null = { name: "Daniel", age: 30 };
        const value = use(obj)?.also(it => it["age"] = 40).value;
        expect(value).toBe(obj);
        expect(value?.["age"]).toBe(40);
    });
    test("fails with null", () => {
        const obj: Record<string, any> | null = null;
        const value = use<Record<string, any>>(obj)?.also(it => it["age"] = 40).value;
        expect(value).toBeUndefined();
    });
    test("fails with undefined", () => {
        const obj: Record<string, any> | undefined = undefined;
        const value = use<Record<string, any>>(obj)?.also(it => it["age"] = 40).value;
        expect(value).toBeUndefined();
    });
    test("retains with null", () => {
        const str: string | null = null;
        const obj = { name: "Daniel", age: 30 };
        use<string>(str)?.also(it => obj.name = it).value;
        expect(obj.name).toBe("Daniel");
    });
});

describe("run", () => {
    test("works with object", () => {
        const obj = { name: "Daniel", age: 30 };
        use(obj)?.run(function() {
            expect(this).toBeInstanceOf(Object);
        });
    });
    test("works with number", () => {
        const number = 5;
        use(number)?.run(function() {
            expect(typeof this).toBe("number");
        });
        use(number)?.run(function() {
            expect(this).toBe(number);
        });
    });
    test("works with string", () => {
        const string = "Hello world";
        use(string)?.run(function() {
            expect(typeof this).toBe("string");
        });
        use(string)?.run(function() {
            expect(this).toBe(string);
        });
    });
    test("works with boolean", () => {
        const boolean = true;
        use(boolean)?.run(function() {
            expect(typeof this).toBe("boolean");
        });
        use(boolean)?.run(function() {
            expect(this).toBe(boolean);
        });
    });
    test("returns value", () => {
        const obj = { name: "Daniel", age: 30 };
        const value = use(obj)?.run(function() {
            return this.age;
        })?.value;
        expect(value).toBe(30);
    });
    test("works with nullable", () => {
        const str: string | null = "Hello world";
        const value = use(str)?.run(function() {
            return this.split(" ")[0];
        })?.value;
        expect(value).toBe("Hello");
    });
    test("fails with null", () => {
        const str: string | null = null;
        const value = use<string>(str)?.run(function() {
            return this.split(" ")[0];
        })?.value;
        expect(value).toBeUndefined();
    });
    test("fails with undefined", () => {
        const str: string | undefined = undefined;
        const value = use<string>(str)?.run(function() {
            return this.split(" ")[0];
        })?.value;
        expect(value).toBeUndefined();
    });
});

describe("apply", () => {
    test("works with object", () => {
        const obj = { name: "Daniel", age: 30 };
        use(obj)?.apply(function() {
            expect(this).toBeInstanceOf(Object);
        });
    });
    test("works with number", () => {
        const number = 5;
        use(number)?.apply(function() {
            expect(typeof this).toBe("number");
        });
        use(number)?.apply(function() {
            expect(this).toBe(number);
        });
    });
    test("works with string", () => {
        const string = "Hello world";
        use(string)?.apply(function() {
            expect(typeof this).toBe("string");
        });
        use(string)?.apply(function() {
            expect(this).toBe(string);
        });
    });
    test("works with boolean", () => {
        const boolean = true;
        use(boolean)?.apply(function() {
            expect(typeof this).toBe("boolean");
        });
        use(boolean)?.apply(function() {
            expect(this).toBe(boolean);
        });
    });
    test("returns instance", () => {
        const obj = { name: "Daniel", age: 30 };
        const value = use(obj)?.apply(function() {
            return this.name;
        }).value;
        expect(value).toBe(obj);
    });
    test("modifies value", () => {
        const obj = { name: "Daniel", age: 30 };
        const value = use(obj)?.apply(function() {
            this.age = 40;
        });
        expect(value?.value).toBe(obj);
        expect(value?.value.age).toBe(40);
    });
    test("works with nullable", () => {
        const obj: Record<string, any> | null = { name: "Daniel", age: 30 };
        const value = use(obj)?.apply(function() {
            this["age"] = 40;
        }).value;
        expect(value).toBe(obj);
        expect(value?.["age"]).toBe(40);
    });
    test("fails with null", () => {
        const obj: Record<string, any> | null = null;
        const value = use<Record<string, any>>(obj)?.apply(function() {
            this["age"] = 40;
        }).value;
        expect(value).toBeUndefined();
    });
    test("fails with undefined", () => {
        const obj: Record<string, any> | null = null;
        const value = use<Record<string, any>>(obj)?.apply(function() {
            this["age"] = 40;
        }).value;
        expect(value).toBeUndefined();
    });
    test("retains with null", () => {
        const str: string | null = null;
        const obj = { name: "Daniel", age: 30 };
        use<string>(str)?.apply(function() {
            obj.name = this;
        });
        expect(obj.name).toBe("Daniel");
    });
});

describe("takeIf", () => {
    test("works with object", () => {
        const obj = { name: "Daniel", age: 30 };
        use(obj)?.takeIf(it => !!expect(it).toBeInstanceOf(Object));
    });
    test("works with number", () => {
        const number = 5;
        use(number)?.takeIf(it => !!expect(typeof it).toBe("number"));
        use(number)?.takeIf(it => !!expect(it).toBe(number));
    });
    test("works with string", () => {
        const string = "Hello world";
        use(string)?.takeIf(it => !!expect(typeof it).toBe("string"));
        use(string)?.takeIf(it => !!expect(it).toBe(string));
    });
    test("works with boolean", () => {
        const boolean = true;
        use(boolean)?.takeIf(it => !!expect(typeof it).toBe("boolean"));
        use(boolean)?.takeIf(it => expect(it).toBe(boolean));
    });
    test("returns instance if true", () => {
        const obj = { name: "Daniel", age: 30 };
        const value = use(obj)?.takeIf(it => it.age < 40)?.value;
        expect(value).toBe(obj);
    });
    test("returns undefined if false", () => {
        const obj = { name: "Daniel", age: 30 };
        const value = use(obj)?.takeIf(it => it.age > 40)?.value;
        expect(value).toBeUndefined();
    });
    test("true without predicate", () => {
        const boolean = true;
        const value = use(boolean)?.takeIf(it => it)?.value;
        expect(value).toBe(boolean);
        expect(value).toBe(true);
    });
    test("false without predicate", () => {
        const boolean = false;
        const value = use(boolean)?.takeIf(it => it)?.value;
        expect(value).toBeUndefined();
    });
    test("modifies value", () => {
        const obj = { name: "Daniel", age: 30 };
        const value = use(obj)?.takeIf(it => {
            it.name = "George";
            return it.age < 40;
        });
        expect(value?.value).toBe(obj);
        expect(value?.value.name).toBe("George");
    });
    test("works with nullable", () => {
        const obj: Record<string, any> | null = { name: "Daniel", age: 30 };
        const value = use(obj)?.takeIf(it => it["age"] < 40)?.value;
        expect(value).toBe(obj);
    });
    test("fails with null", () => {
        const obj: Record<string, any> | null = null;
        const value = use<Record<string, any>>(obj)?.takeIf(it => it["age"] < 40)?.value;
        expect(value).toBeUndefined();
    });
    test("fails with undefined", () => {
        const obj: Record<string, any> | undefined = undefined;
        const value = use<Record<string, any>>(obj)?.takeIf(it => it["age"] < 40)?.value;
        expect(value).toBeUndefined();
    });
});

describe("takeUnless", () => {
    test("works with object", () => {
        const obj = { name: "Daniel", age: 30 };
        use(obj)?.takeUnless(it => !!expect(it).toBeInstanceOf(Object));
    });
    test("works with number", () => {
        const number = 5;
        use(number)?.takeUnless(it => !!expect(typeof it).toBe("number"));
    });
    test("works with number", () => {
        const number = 5;
        use(number)?.takeUnless(it => !!expect(typeof it).toBe("number"));
        use(number)?.takeUnless(it => !!expect(it).toBe(number));
    });
    test("works with string", () => {
        const string = "Hello world";
        use(string)?.takeUnless(it => !!expect(typeof it).toBe("string"));
        use(string)?.takeUnless(it => !!expect(it).toBe(string));
    });
    test("works with boolean", () => {
        const boolean = true;
        use(boolean)?.takeUnless(it => !!expect(typeof it).toBe("boolean"));
        use(boolean)?.takeUnless(it => expect(it).toBe(boolean));
    });
    test("returns undefined if true", () => {
        const obj = { name: "Daniel", age: 30 };
        const value = use(obj)?.takeUnless(it => it.age < 40)?.value;
        expect(value).toBeUndefined();
    });
    test("returns instance if false", () => {
        const obj = { name: "Daniel", age: 30 };
        const value = use(obj)?.takeUnless(it => it.age > 40)?.value;
        expect(value).toBe(obj);
    });
    test("true without predicate", () => {
        const boolean = true;
        const value = use(boolean)?.takeUnless(it => it)?.value;
        expect(value).toBeUndefined();
    });
    test("false without predicate", () => {
        const boolean = false;
        const value = use(boolean)?.takeUnless(it => it)?.value;
        expect(value).toBe(boolean);
        expect(value).toBe(false);
    });
    test("modifies value", () => {
        const obj = { name: "Daniel", age: 30 };
        const value = use(obj)?.takeUnless(it => {
            it.name = "George";
            return it.age < 40;
        })?.value;
        expect(value).toBeUndefined();
        expect(obj.name).toBe("George");
    });
    test("works with nullable", () => {
        const obj: Record<string, any> | null = { name: "Daniel", age: 30 };
        const value = use(obj)?.takeUnless(it => it["age"] > 40)?.value;
        expect(value).toBe(obj);
    });
    test("fails with null", () => {
        const obj: Record<string, any> | null = null;
        const value = use<Record<string, any>>(obj)?.takeUnless(it => it["age"] > 40)?.value;
        expect(value).toBeUndefined();
    });
    test("fails with undefined", () => {
        const obj: Record<string, any> | undefined = undefined;
        const value = use(obj)?.takeUnless(it => it!["age"] > 40)?.value;
        expect(value).toBeUndefined();
    });
});
