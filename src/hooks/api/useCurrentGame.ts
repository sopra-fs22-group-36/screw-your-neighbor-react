import { useContext, useState } from "react"
import { appContext } from "../../AppContext"
import { useApi } from "./useApi"
import { getDomain } from "../../api/api"

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

  const playGame = async () => {
    wrapApiCall(
      request.request({
        method: "PATCH",
        url: currentGameStore.game._links.self.href.replace(getDomain(), ""),
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
