import { useContext, useState } from "react"
import { appContext } from "../../AppContext"
import { useApi } from "./useApi"
import { toIri } from "../../util/toIri"
import { EntityModelGame } from "../../generated"

export function useGames() {
  const { playerStore, gamesStore, currentGameStore } = useContext(appContext)
  const [loading, setLoading] = useState(false)

  const {
    participationEntityController,
    gameEntityController,
    request,
    wrapApiCall,
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
      return await wrapApiCall(
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

  return {
    loading,
    games: gamesStore.games,
    startPollGames,
    createGame,
    joinGame,
  }
}
