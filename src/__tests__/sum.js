const sum = require("../sum");

test("adds 1=2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("two plus two is four", () => {
  expect(2 + 2).toBe(4);
});

test("object assignment", () => {
  const data = { one: 1 };
  data["two"] = 2;
  expect(data).toEqual({ one: 1, two: 2 });
});

test("adding positive numbers is not zero", () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0);
    }
  }
});

test("null", () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

test("zero", () => {
  const z = 0;
  expect(z).not.toBeNull();
  expect(z).toBeDefined();
  expect(z).not.toBeUndefined();
  expect(z).not.toBeTruthy();
  expect(z).toBeFalsy();
});

test("two plus two", () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4);
  expect(value).toEqual(4);
});

test("两个浮点数相加", () => {
  const value = 0.1 + 0.2;
  // expect(value).toBe(0.3)
  expect(value).toBeCloseTo(0.3);
});

test("there is no I in team", () => {
  expect("team").not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
  expect("Christoph").toMatch(/stop/);
});

const shoppingList = [
  "diapers",
  "kleenex",
  "trash bags",
  "paper towels",
  "beer"
];

test("the shopping list has beer on it", () => {
  expect(shoppingList).toContain("beer");
  expect(new Set(shoppingList)).toContain("beer");
});

function compileJsCode() {
  throw new Error("you are using the wrong JDK");
}

test("compiling android goes as expected", () => {
  expect(compileJsCode).toThrow();
  expect(compileJsCode).toThrow(Error);

  // You can also use the exact error message or a regexp
  expect(compileJsCode).toThrow("you are using the wrong JDK");
  expect(compileJsCode).toThrow(/JDK/);
});

function fetchData(callback) {
  return callback("peanut butter");
}

test("the data is peanut butter", done => {
  function callback(data) {
    expect(data).toBe("peanut butter");
    done();
  }

  fetchData(callback);
});

function fetchDataPromise(callback) {
  return new Promise(function(resolve, reject) {
    resolve("peanut butter");
    // reject('peanut butter')
  });
}

test("the data is peanut butter", () => {
  return fetchDataPromise().then(
    data => {
      expect(data).toBe("peanut butter");
    },
    data => {
      //    expect(data).toBe('peanut butter');
    }
  );
});

function fetchDataPromiseError(callback) {
  return new Promise(function(resolve, reject) {
    reject("error");
  });
}

test("the fetch fails with an error", () => {
  expect.assertions(1); //不懂
  fetchDataPromiseError().catch(e => expect(e).toMatch("error"));
  // return fetchDataPromiseError().catch(e => expect(e).toMatch('error'));
});

test("the data is peanut butter", () => {
  expect(fetchDataPromise()).resolves.toBe("peanut butter");
  // return expect(fetchDataPromise()).resolves.toBe('peanut butter');
});

test("the fetch fails with an error", () => {
  return expect(fetchDataPromiseError()).rejects.toMatch("error");
});

test("the data is peanut butter", async () => {
  expect.assertions(1);
  const data = await fetchDataPromise();
  expect(data).toBe("peanut butter");
});

test("the fetch fails with an error", async () => {
  expect.assertions(1);
  try {
    await fetchDataPromiseError();
  } catch (e) {
    expect(e).toMatch("error");
  }
});

test("the data is peanut butter", async () => {
  await expect(fetchDataPromise()).resolves.toBe("peanut butter");
});

test("the fetch fails with an error", async () => {
  await expect(fetchDataPromiseError()).rejects.toMatch("error");
});
