import { useContext, useState } from "react"
import { appContext } from "../../AppContext"
import { useApi } from "./useApi"

export function usePlayers() {
  const playerStore = useContext(appContext).playerStore
  const [loading, setLoading] = useState(false)

  const { wrapApiCall, playerEntityController } = useApi()

  const createPlayer = async (name) => {
    setLoading(true)
    const createdPlayer = await wrapApiCall(
      playerEntityController.postCollectionResourcePlayerPost({
        name,
      })
    ).finally(() => setLoading(false))
    playerStore.setMe(createdPlayer)
    return createdPlayer
  }

  const refreshPlayers = async () => {
    const players = await wrapApiCall(
      playerEntityController.getCollectionResourcePlayerGet1()
    )
    playerStore.setPlayers(players._embedded.players)
  }

  const startPollPlayers = () => {
    playerStore.playersSubscriptions.addSubscription(
      setInterval(refreshPlayers, 500)
    )
    return {
      cancel() {
        playerStore.playersSubscriptions.removeSubscription()
      },
    }
  }

  return {
    loading,
    me: playerStore.me,
    players: playerStore.players,
    startPollPlayers,
    createPlayer,
  }
}
