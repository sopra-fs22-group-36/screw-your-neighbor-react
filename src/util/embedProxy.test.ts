import { embedProxy } from "./embedProxy"

const object = {
  test1: "test1",
  test2: "test2",
  _embedded: {
    test2: "test2_embedded",
    test3: "test3",
  },
}

describe("embedProxy", () => {
  test("leaves normal properties alone", () => {
    const result = embedProxy(object)
    expect(result.test1).toBe(object.test1)
  })

  test("still lets you access the _embedded property", () => {
    const result = embedProxy(object)
    expect(result._embedded.test2).toBe(object._embedded.test2)
  })

  test("if a property exists in embedded and directly, returns the direct property", () => {
    const result = embedProxy(object)
    expect(result.test2).toBe(object.test2)
  })

  test("if a property only exists in _embedded, return its value", () => {
    const result = embedProxy(object)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(result.test3).toBe(object._embedded.test3)
  })

  test("does not crash if object has no _embedded", () => {
    const result = embedProxy({})
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(result.test).toBe(undefined)
  })
})
