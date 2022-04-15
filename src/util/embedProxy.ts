/**
Delegates calls to a property to the _embedded object if available.
 Sometimes the fields are on the toplevel, sometimes they are in _embedded.
 This proxy hides this complexity.
 */
export function embedProxy<T extends object>(input: T): T {
  return new Proxy(input, {
    get: function (target, prop, receiver: never) {
      if (target[prop] !== undefined) {
        return target[prop]
      }
      if (
        target["_embedded"] !== undefined &&
        target["_embedded"][prop] !== undefined
      ) {
        return target["_embedded"][prop]
      }
      return Reflect.get(target, prop, receiver)
    },
  })
}
