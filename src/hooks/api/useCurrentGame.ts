import { useContext, useState } from "react"
import { appContext } from "../../AppContext"
import { useApi } from "./useApi"
import { toIri } from "../../util/toIri"
import { Game } from "../../generated"
import { useParams } from "react-router"
import { iriMatch } from "../../util/iriMatch"
const gameState = Game.gameState

export function useCurrentGame() {
  const [loading, setLoading] = useState(false)
  const { currentGameStore, playerStore } = useContext(appContext)
  const { request, wrapApiCall } = useApi()
  const { currentGameId } = useParams()

  const currentGameIriFromParameter = `/games/${currentGameId}?projection=embed`

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

  const refreshGame = async () => {
    const game: Game = await wrapApiCall(
      request.request({
        method: "GET",
        url: currentGameIriFromParameter,
      })
    )
    currentGameStore.setGame(game)
    const myParticipations = game.participations?.filter((value) =>
      iriMatch(value.player._links.self, playerStore.me._links.self)
    )
    currentGameStore.setParticipation(
      myParticipations?.length > 0 ? myParticipations[0] : null
    )
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
        url: toIri(currentGameStore.yourActiveHand._links.self),
        body: { announcedScore: numberOfTricks },
      })
    ).finally(() => setLoading(false))
  }

  return {
    loading,
    game: currentGameStore.game,
    id: currentGameId,
    myParticipation: currentGameStore.participation,
    activeParticipations: currentGameStore.activeParticipations,
    sortedMatches: currentGameStore.sortedMatches,
    activeMatch: currentGameStore.activeMatch,
    sortedRoundsOfActiveMatch: currentGameStore.sortedRoundsOfActiveMatch,
    activeRound: currentGameStore.activeRound,
    lastRound: currentGameStore.lastRound,
    sumOfAnnouncedScores: currentGameStore.sumOfAnnouncedScores,
    lastPlayerAnnouncing: currentGameStore.isLastPlayerAnnouncing,
    yourActiveHand: currentGameStore.yourActiveHand,
    cardHandMap: currentGameStore.cardHandMap,
    leaveGame,
    playGame,
    currentGameIriFromParameter,
    refreshGame,
    startPollGame,
    announceScore,
  }
}
