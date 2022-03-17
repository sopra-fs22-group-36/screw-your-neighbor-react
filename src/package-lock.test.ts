import { lockfileVersion } from "../package-lock.json"

test("package-lock.json uses lockFileVersion 2", () => {
  expect(lockfileVersion).toBe(2)
})
