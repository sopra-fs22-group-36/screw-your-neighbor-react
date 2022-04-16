import { CurrentGameStore } from "./CurrentGameStore"

const game = {
  name: "game",
  _embedded: {
    matches: [
      {
        matchNumber: 2,
      },
      {
        matchNumber: 1,
      },
    ],
  },
}

const notEmbedded = {
  name: "game",
  matches: [
    {
      matchNumber: 2,
    },
    {
      matchNumber: 1,
    },
  ],
}

const noMatches = {
  name: "game",
  _embedded: {
    matches: [],
  },
}

describe("The CurrentGameStore", () => {
  describe("with the method sortedMatches", () => {
    it("does not fail if no game present", () => {
      const currentGameStore = new CurrentGameStore()

      expect(currentGameStore.sortedMatches).toStrictEqual([])
    })

    it("sorts the matches by matchNumber", () => {
      const currentGameStore = new CurrentGameStore()
      currentGameStore.setGame(game)

      expect(currentGameStore.sortedMatches).toStrictEqual([
        game._embedded.matches[1],
        game._embedded.matches[0],
      ])
    })

    it("sorts the matches by matchNumber if not embedded", () => {
      const currentGameStore = new CurrentGameStore()
      currentGameStore.setGame(notEmbedded)

      expect(currentGameStore.sortedMatches).toStrictEqual([
        game._embedded.matches[1],
        game._embedded.matches[0],
      ])
    })
  })

  describe("with the method activeMatch", () => {
    it("does not fail if no game present", () => {
      const currentGameStore = new CurrentGameStore()

      expect(currentGameStore.activeMatch).toBeNull()
    })

    it("does not fail if no matches", () => {
      const currentGameStore = new CurrentGameStore()
      currentGameStore.setGame(noMatches)

      expect(currentGameStore.activeMatch).toBeNull()
    })

    it("return the active match", () => {
      const currentGameStore = new CurrentGameStore()
      currentGameStore.setGame(game)

      expect(currentGameStore.activeMatch).toStrictEqual(
        game._embedded.matches[0]
      )
    })
  })
})
