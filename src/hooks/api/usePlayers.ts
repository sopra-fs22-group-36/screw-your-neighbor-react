import { useContext, useState } from "react"
import { appContext } from "../../AppContext"
import { useApi } from "./useApi"
import { ApiError } from "../../generated"
export function usePlayers() {
  const playerStore = useContext(appContext).playerStore
  const [loading, setLoading] = useState(false)
  const [fetchingSession, setFetchingSession] = useState(false)

  const { wrapApiCall, playerEntityController, authController } = useApi()

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

  const hasCurrentSession = async () => {
    const catchNoSession = (e) => {
      if (e instanceof ApiError && (e.status === 401 || e.status === 404)) {
        return
      }
      throw e
    }
    setFetchingSession(true)
    const currentSession = await wrapApiCall(
      authController.getCurrentSession().catch(catchNoSession)
    ).finally(() => setFetchingSession(false))
    if (!currentSession) {
      return false
    }
    playerStore.setMe(currentSession)
    return true
  }

  const logout = async () => {
    await wrapApiCall(authController.logout()).finally(() => {
      playerStore.setPlayers([])
      playerStore.setMe(null)
    })
  }

  return {
    loading,
    me: playerStore.me,
    players: playerStore.players,
    fetchingSession,
    hasCurrentSession,
    logout,
    startPollPlayers,
    createPlayer,
  }
}
