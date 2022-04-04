import { useContext, useState } from "react"
import { appContext } from "../../AppContext"
import { useApi } from "./useApi"

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

  return {
    loading,
    game: currentGameStore.game,
    leaveGame,
  }
}
