import BaseContainer from "../../ui/BaseContainer"
import React, { useEffect, useState } from "react"
import SendIcon from "@mui/icons-material/Send"

import { useGames } from "../../../hooks/api/useGames"
import { Paths } from "../../routing/routers/Paths"
import { useNavigate } from "react-router-dom"
import { observer } from "mobx-react-lite"
import { useCurrentGame } from "../../../hooks/api/useCurrentGame"
import { iriMatch } from "../../../util/iriMatch"
import { ApiError, Game } from "../../../generated"
import { Loading } from "../../ui/Loading"
import { SecondaryButton } from "../../ui/ColorButtons/SecondaryButton"

const JoinGame = observer(() => {
  const { joinGame } = useGames()
  const navigate = useNavigate()
  const { refreshGame, game, id, currentGameIriFromParameter, startPollGame } =
    useCurrentGame()
  const [loading, setLoading] = useState(true)

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
  const goBack = () => {
    navigate(Paths.LOBBY)
  }

  return (
    <Loading ready={!loading}>
      {(() => {
        if (!game && !loading) {
          return (
            <BaseContainer>
              <h1> Game not found </h1>
              <SecondaryButton action={goBack} endIcon={<SendIcon />}>
                Go to lobby
              </SecondaryButton>
            </BaseContainer>
          )
        }
        if (game) {
          const unavailableGame =
            game.gameState !== Game.gameState.FINDING_PLAYERS ||
            game.participations.length === 5
          const canJoinGame =
            "You were invited to play this game, do you want to join the game?"
          const cantJoinGame =
            "The game you were invited to is not available anymore, please join the lobby to find" +
            " other games to join"
          const headerText = unavailableGame ? cantJoinGame : canJoinGame
          const canJoinButton = "TAKE ME TO THIS ROOM"
          const cantJoinButton = "TAKE ME TO THE LOBBY"
          const buttonText = unavailableGame ? cantJoinButton : canJoinButton

          return (
            <div>
              <BaseContainer>
                <h1> Welcome to "Screw your neighbour"</h1>
              </BaseContainer>

              <BaseContainer>
                <h4>{headerText}</h4>
                <SecondaryButton
                  action={unavailableGame ? goBack : clickJoin}
                  endIcon={<SendIcon />}
                  style={{
                    minWidth: "250px",
                  }}
                >
                  {buttonText}
                </SecondaryButton>
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
