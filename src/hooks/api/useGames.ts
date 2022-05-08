import { useContext, useState } from "react"
import { appContext } from "../../AppContext"
import { useApi } from "./useApi"
import { toIri } from "../../util/toIri"
import { EntityModelGame, Game } from "../../generated"
import { extractId } from "../../util/extractId"

const ignoreValidationFailed = (reason) => {
  if (reason.status === 422) {
    return
  }
  throw reason
}

const ignoreConflict = (reason) => {
  if (reason.status === 409) {
    return
  }
  throw reason
}

export function useGames() {
  const { playerStore, gamesStore, currentGameStore } = useContext(appContext)
  const [loading, setLoading] = useState(false)

  const {
    participationEntityController,
    gameEntityController,
    request,
    wrapApiCall,
    followUpGameController,
  } = useApi()

  const createGame = async (name) => {
    setLoading(true)
    const createdGame = await wrapApiCall(
      gameEntityController.postCollectionResourceGamePost({ name: name })
    ).finally(() => setLoading(false))
    currentGameStore.setGame(createdGame)
    return createdGame
  }

  const refreshGames = async () => {
    const gamesPage = await wrapApiCall(
      gameEntityController.getCollectionResourceGameGet1()
    )
    gamesStore.setGames(gamesPage._embedded.games)
  }

  const startPollGames = () => {
    gamesStore.gamesSubscriptions.addSubscription(
      setInterval(refreshGames, 500)
    )

    return {
      cancel() {
        gamesStore.gamesSubscriptions.removeSubscription()
      },
    }
  }

  const joinGame = async (game: EntityModelGame) => {
    const myParticipations = game.participations.filter(
      (value) =>
        toIri(value.player._links.self) === toIri(playerStore?.me._links.player)
    )
    setLoading(true)
    if (myParticipations.length > 0) {
      const participationToPatch = myParticipations[0]
      return wrapApiCall(
        request
          .request({
            method: "PATCH",
            url: toIri(participationToPatch._links.self),
            body: {
              active: true,
            },
          })
          .finally(() => setLoading(false))
      )
    }
    const newParticipation = {
      game: game._links.self.href,
      player: playerStore.me._links.self.href,
      active: true,
    }
    const createdParticipation = await wrapApiCall(
      participationEntityController.postCollectionResourceParticipationPost(
        newParticipation
      )
    ).finally(() => setLoading(false))
    currentGameStore.setGame(game)
    currentGameStore.setParticipation(createdParticipation)
    return createdParticipation
  }

  const createOrJoinNextGame = async () => {
    setLoading(true)
    try {
      const currentGame = currentGameStore.game
      let nextGame: Game | void = currentGame.nextGame
      if (!currentGame.nextGame) {
        const currentGameId = parseInt(extractId(currentGame._links.self))
        nextGame = await wrapApiCall(
          followUpGameController
            .createNextGame(currentGameId)
            .catch(ignoreValidationFailed)
            .catch(ignoreConflict)
        )
        if (nextGame) {
          return nextGame
        }
        const refreshedCurrentGame = await wrapApiCall(
          gameEntityController.getItemResourceGameGet(`${currentGameId}`)
        )
        nextGame = refreshedCurrentGame.nextGame
      }
      await joinGame(nextGame)
      return nextGame
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    games: gamesStore.games,
    startPollGames,
    createGame,
    joinGame,
    createOrJoinNextGame,
  }
}
