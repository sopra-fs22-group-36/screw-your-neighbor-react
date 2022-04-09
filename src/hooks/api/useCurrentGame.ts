import { useContext, useState } from "react"
import { appContext } from "../../AppContext"
import { useApi } from "./useApi"
import { getDomain } from "../../api/api"
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
        url: currentGameStore.participation._links.self.href,
        body: { active: false },
      })
    ).finally(() => setLoading(false))
  }

  const startGame = async () => {
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
          url: currentGameStore.game._links.self.href.replace(getDomain(), ""),
          body: { gameState: gameState.PLAYING },
        })
        .catch(ignoreValidationFailed)
    ).finally(() => setLoading(false))
  }

  const refreshGame = async () => {
    const uri = currentGameStore.game._links.self.href.replace(getDomain(), "")
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

  return {
    loading,
    game: currentGameStore.game,
    leaveGame,
    startGame,
    startPollGame,
  }
}
