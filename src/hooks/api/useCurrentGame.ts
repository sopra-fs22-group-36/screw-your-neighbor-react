import { useContext, useState } from "react"
import { appContext } from "../../AppContext"
import { useApi } from "./useApi"
import { toIri } from "../../util/toIri"
import { EntityModelGame } from "../../generated"
import { getDomain } from "../../api/api"

export function useCurrentGame() {
  const [loading, setLoading] = useState(false)
  const { currentGameStore } = useContext(appContext)
  const { request, wrapApiCall } = useApi()

  const leaveGame = async () => {
    console.log(currentGameStore)
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
    wrapApiCall(
      request.request({
        method: "PATCH",
        url: toIri(currentGameStore.game._links.self),
        body: { gameState: "PLAYING" },
      })
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
    playGame,
    startPollGame,
  }
}
