import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { useNavigate } from "react-router-dom"
import { useCurrentGame } from "../../../hooks/api/useCurrentGame"
import { Paths } from "../routers/Paths"
import { ApiError, Game } from "../../../generated"
import { iriMatch } from "../../../util/iriMatch"
import { Loading } from "../../ui/Loading"
import { delay } from "../../../util/timeout"
import { Room } from "../../views/game/room/Room"
import GameView from "../../views/game/game/GameView"
import { GameSummary } from "../../views/game/gamesummary/GameSummary"
import BaseContainer from "../../ui/BaseContainer"
import SendIcon from "@mui/icons-material/Send"
import Button from "@mui/material/Button"

const gameStateEnum = Game.gameState

export type GameGuardProps = {
  redirectTo: Paths
}

export const GameGuard = observer((props: GameGuardProps) => {
  const navigate = useNavigate()
  const { game, refreshGame, currentGameIriFromParameter } = useCurrentGame()
  const gameReady =
    game && iriMatch(currentGameIriFromParameter, game._links.self)

  const [gameLoaded, setGameLoaded] = useState(gameReady)

  const [cachedGameState, setCachedGameState] = useState(undefined)
  const [runningGameStateUpdate, setRunningGameStateUpdate] =
    useState<NodeJS.Timeout>(undefined)

  const { startPollGame } = useCurrentGame()

  const goBack = () => {
    navigate(props.redirectTo)
  }

  const catch404 = (e) => {
    if (e instanceof ApiError) {
      if (e.status === 404) {
        return null
      }
    }
    throw e
  }

  useEffect(() => {
    if (!gameReady) {
      const start = Date.now()
      refreshGame()
        .catch(catch404)
        .then((value) => delay(500 - (Date.now() - start), value))
        .finally(() => setGameLoaded(true))
      return
    }
    if (game) {
      if (
        cachedGameState === gameStateEnum.PLAYING &&
        game.gameState === gameStateEnum.CLOSED
      ) {
        setRunningGameStateUpdate((previousState) => {
          if (!previousState) {
            return setTimeout(() => setCachedGameState(game.gameState), 2000)
          }
          return previousState
        })
      } else {
        setCachedGameState(game.gameState)
      }
      const pollGameSubscription = startPollGame()
      return () => {
        pollGameSubscription.cancel()
        if (runningGameStateUpdate) {
          clearTimeout(runningGameStateUpdate)
        }
      }
    }
  }, [
    cachedGameState,
    game,
    gameReady,
    refreshGame,
    runningGameStateUpdate,
    startPollGame,
  ])

  return (
    <Loading ready={gameLoaded}>
      <>
        {(() => {
          if (!game && gameLoaded) {
            return (
              <BaseContainer>
                <h1> Game not found </h1>
                <Button
                  variant="contained"
                  endIcon={<SendIcon />}
                  onClick={goBack}
                >
                  Go back
                </Button>
              </BaseContainer>
            )
          }
          if (cachedGameState === gameStateEnum.FINDING_PLAYERS) {
            return <Room />
          }
          if (cachedGameState === gameStateEnum.PLAYING) {
            return <GameView />
          }
          if (cachedGameState === gameStateEnum.CLOSED) {
            return <GameSummary />
          }
        })()}
      </>
    </Loading>
  )
})
