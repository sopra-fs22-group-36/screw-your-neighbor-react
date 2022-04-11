import { useContext, useState } from "react"
import { appContext } from "../../AppContext"
import { useApi } from "./useApi"
import { toIri } from "../../util/toIri"

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
    wrapApiCall(
      request.request({
        method: "PATCH",
        url: toIri(currentGameStore.game._links.self),
        body: { gameState: "PLAYING" },
      })
    )
  }

  return {
    loading,
    game: currentGameStore.game,
    leaveGame,
    playGame,
  }
}
