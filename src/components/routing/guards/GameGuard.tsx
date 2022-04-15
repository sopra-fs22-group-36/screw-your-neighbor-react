import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { useNavigate } from "react-router-dom"
import { useCurrentGame } from "../../../hooks/api/useCurrentGame"
import { Paths } from "../routers/Paths"
import { toIri } from "../../../util/toIri"
import { ApiError, EntityModelGame, Game } from "../../../generated"
import { Loading } from "../../ui/Loading"
import { delay } from "../../../util/timeout"
import { Room } from "../../views/Room"
import GameView from "../../views/GameView"
import { GameSummary } from "../../views/GameSummary"
import BaseContainer from "../../ui/BaseContainer"
import SendIcon from "@mui/icons-material/Send"
import Button from "@mui/material/Button"

const gameStateEnum = Game.gameState

export type GameGuardProps = {
  redirectTo: Paths
}

function iriMatch(currentGameIriFromParameter: string, game: EntityModelGame) {
  const iriWithOutEmbed = toIri(game._links.self)
  const iriWithEmbed = iriWithOutEmbed + "?projection=embed"
  return (
    currentGameIriFromParameter === iriWithOutEmbed ||
    currentGameIriFromParameter === iriWithEmbed
  )
}

export const GameGuard = observer((props: GameGuardProps) => {
  const navigate = useNavigate()
  const { game, refreshGame, currentGameIriFromParameter } = useCurrentGame()
  const gameReady = game && iriMatch(currentGameIriFromParameter, game)

  const [gameLoaded, setGameLoaded] = useState(gameReady)

  const gameState = game?.gameState

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
      const pollGameSubscription = startPollGame()
      return () => pollGameSubscription.cancel()
    }
  }, [game, gameReady, refreshGame, startPollGame])

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
          if (gameState === gameStateEnum.FINDING_PLAYERS) {
            return <Room />
          }
          if (gameState === gameStateEnum.PLAYING) {
            return <GameView />
          }
          if (gameState === gameStateEnum.CLOSED) {
            return <GameSummary />
          }
        })()}
      </>
    </Loading>
  )
})
