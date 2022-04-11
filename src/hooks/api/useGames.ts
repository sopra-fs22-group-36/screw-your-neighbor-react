import { useContext, useState } from "react"
import { appContext } from "../../AppContext"
import { useApi } from "./useApi"
import { EntityModelGame } from "../../generated"

export function useGames() {
  const { playerStore, gamesStore, currentGameStore } = useContext(appContext)
  const [loading, setLoading] = useState(false)

  const { participationEntityController, gameEntityController, wrapApiCall } =
    useApi()

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
    const participation = {
      game: game._links.self.href,
      player: playerStore.me._links.self.href,
    }
    setLoading(true)
    const createdParticipation = await wrapApiCall(
      participationEntityController.postCollectionResourceParticipationPost(
        participation
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
