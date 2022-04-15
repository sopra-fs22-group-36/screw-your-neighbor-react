import { useContext, useState } from "react"
import { appContext } from "../../AppContext"
import { useApi } from "./useApi"
import { toIri } from "../../util/toIri"
import { EntityModelGame } from "../../generated"
const gameState = EntityModelGame.gameState

export function useCurrentGame() {
  const [loading, setLoading] = useState(false)
  const { currentGameStore } = useContext(appContext)
  const { request, wrapApiCall } = useApi()

  const leaveGame = async () => {
    setLoading(true)
    wrapApiCall(
      request.request({
        method: "PATCH",
        url: toIri(currentGameStore.participation._links.self),
        body: { active: false },
      })
    ).finally(() => setLoading(false))
  }

  const playGame = async () => {
    setLoading(true)
    const ignoreValidationFailed = (reason) => {
      if (reason.status === 422) {
        return
      }
      throw reason
    }
    wrapApiCall(
      request
        .request({
          method: "PATCH",
          url: toIri(currentGameStore.game._links.self),
          body: { gameState: gameState.PLAYING },
        })
        .catch(ignoreValidationFailed)
    ).finally(() => setLoading(false))
  }

  const closeGame = async () => {
    setLoading(true)
    wrapApiCall(
      request.request({
        method: "PATCH",
        url: toIri(currentGameStore.game._links.self),
        body: { gameState: gameState.CLOSED },
      })
    ).finally(() => setLoading(false))
  }

  const refreshGame = async () => {
    const uri = toIri(currentGameStore.game._links.self)
    const url = `${uri}?projection=embed`
    const game: EntityModelGame = await wrapApiCall(
      request.request({
        method: "GET",
        url: url,
      })
    )
    currentGameStore.setGame(game)
    currentGameStore.setParticipation(game.participations.at(0))
  }

  const startPollGame = () => {
    currentGameStore.gameSubscriptions.addSubscription(
      setInterval(refreshGame, 500)
    )

    return {
      cancel() {
        currentGameStore.gameSubscriptions.removeSubscription()
      },
    }
  }

  /**
   * So far only for hand with ID 5, have to replace by ._links. ...
   */
  const announceScore = (numberOfTricks) => {
    setLoading(true)
    wrapApiCall(
      request.request({
        method: "PATCH",
        url: "/hands/5",
        body: { announcedScore: numberOfTricks },
      })
    ).finally(() => setLoading(false))
  }

  return {
    loading,
    game: currentGameStore.game,
    leaveGame,
    playGame,
    startPollGame,
    announceScore,
    closeGame,
  }
}
