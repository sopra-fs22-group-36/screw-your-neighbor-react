import { KeepOnlyOneInterval } from "./KeepOnlyOneInterval"

const INTERVAL = 100
describe("KeepOnlyOneInterval", () => {
  beforeEach(async () => {
    jest.useFakeTimers()
  })
  afterEach(async () => {
    jest.useRealTimers()
  })
  const setup = () => {
    const fetchFunction = jest.fn()
    const fetchFunction2 = jest.fn()
    const keepOnlyOneInterval = new KeepOnlyOneInterval()
    return {
      keepOnlyOneInterval,
      fetchFunction,
      fetchFunction2,
    }
  }
  it("keeps added timer and executes after interval", async () => {
    const { keepOnlyOneInterval, fetchFunction } = setup()
    keepOnlyOneInterval.addSubscription(setInterval(fetchFunction, INTERVAL))

    jest.advanceTimersByTime(INTERVAL)
    expect(fetchFunction).toBeCalled()

    jest.advanceTimersByTime(INTERVAL)
    expect(fetchFunction).toBeCalledTimes(2)
  })

  it("clears the second interval directly when added", async () => {
    const { keepOnlyOneInterval, fetchFunction, fetchFunction2 } = setup()
    keepOnlyOneInterval.addSubscription(setInterval(fetchFunction, INTERVAL))
    keepOnlyOneInterval.addSubscription(setInterval(fetchFunction2, INTERVAL))

    jest.advanceTimersByTime(INTERVAL)
    expect(fetchFunction2).not.toBeCalled()

    jest.advanceTimersByTime(INTERVAL)
    expect(fetchFunction2).not.toBeCalled()
  })

  it("clears the interval when the last subscription is removed", async () => {
    const { keepOnlyOneInterval, fetchFunction, fetchFunction2 } = setup()
    keepOnlyOneInterval.addSubscription(setInterval(fetchFunction, INTERVAL))
    keepOnlyOneInterval.addSubscription(setInterval(fetchFunction2, INTERVAL))
    keepOnlyOneInterval.addSubscription(setInterval(fetchFunction2, INTERVAL))

    keepOnlyOneInterval.removeSubscription()
    keepOnlyOneInterval.removeSubscription()

    jest.advanceTimersByTime(INTERVAL)
    expect(fetchFunction).toBeCalled()

    keepOnlyOneInterval.removeSubscription()

    jest.advanceTimersByTime(INTERVAL)
    expect(fetchFunction).toBeCalledTimes(1)
  })
})
