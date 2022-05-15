import BaseContainer from "../../ui/BaseContainer"
import React, { useEffect, useState } from "react"
import Button from "@mui/material/Button"
import SendIcon from "@mui/icons-material/Send"

import { useGames } from "../../../hooks/api/useGames"
import { Paths } from "../../routing/routers/Paths"
import { useNavigate } from "react-router-dom"
import { observer } from "mobx-react-lite"
import { useCurrentGame } from "../../../hooks/api/useCurrentGame"
import { iriMatch } from "../../../util/iriMatch"
import { ApiError, Game } from "../../../generated"
import { Loading } from "../../ui/Loading"

const JoinGame = observer(() => {
  const { joinGame } = useGames()
  const navigate = useNavigate()
  const { refreshGame, game, id, currentGameIriFromParameter, startPollGame } =
    useCurrentGame()
  const [loading, setLoading] = useState(true)
  const goBack = () => {
    navigate(Paths.LOBBY)
  }

  const gameReady =
    game && iriMatch(currentGameIriFromParameter, game._links.self)

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
      refreshGame()
        .catch(catch404)
        .finally(() => setLoading(false))
    }

    const pollGameSubscription = startPollGame()
    return () => {
      pollGameSubscription.cancel()
    }
  })

  const clickJoin = async () => {
    await joinGame(game)
    navigate(Paths.GAME + `/${id}`)
  }

  return (
    <Loading ready={!loading}>
      {(() => {
        if (!game && !loading) {
          return (
            <BaseContainer>
              <h1> Game not found </h1>
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={goBack}
              >
                Go to lobby
              </Button>
            </BaseContainer>
          )
        }
        if (game) {
          const unavailableGame =
            game.gameState !== Game.gameState.FINDING_PLAYERS

          return (
            <div>
              <BaseContainer>
                <h1> Welcome to "Screw your neighbour"</h1>
              </BaseContainer>

              <BaseContainer>
                <h4>
                  You were invited to play this game, do you want to join the
                  game?
                </h4>
                <Button
                  disabled={unavailableGame}
                  onClick={clickJoin}
                  type={"submit"}
                  variant="contained"
                  endIcon={<SendIcon />}
                >
                  TAKE ME TO THIS GAME
                </Button>
              </BaseContainer>
              <div className="background-img"></div>
            </div>
          )
        }
      })()}
    </Loading>
  )
})

export default JoinGame
