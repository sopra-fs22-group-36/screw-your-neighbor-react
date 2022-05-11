import BaseContainer from "../../ui/BaseContainer"
import React, { useContext, useState } from "react"
import Button from "@mui/material/Button"
import SendIcon from "@mui/icons-material/Send"

import { useGames } from "../../../hooks/api/useGames"
import { Paths } from "../../routing/routers/Paths"
import { useNavigate, useParams } from "react-router-dom"
import { useApi } from "../../../hooks/api/useApi"
import { appContext } from "../../../AppContext"

const JoinGame = () => {
  const { joinGame } = useGames()
  const navigate = useNavigate()
  const gameId = useParams()

  const [loading, setLoading] = useState(false)
  const { wrapApiCall, gameEntityController } = useApi()
  const gameStore = useContext(appContext).playerStore

  const findGame = async (gameId) => {
    setLoading(true)
    const foundGame = await wrapApiCall(
      gameEntityController.getItemResourceGameGet("{gameId}")
    ).finally(() => setLoading(false))
    gameStore.setMe(foundGame)
    return foundGame
  }

  const theGameToJoin = findGame(gameId)

  const clickJoin = async () => {
    await joinGame(await theGameToJoin)
    navigate(Paths.GAME + `/${gameId}`)
  }

  return (
    <div>
      <BaseContainer>
        <h1> Welcome to "Screw your neighbour"</h1>
      </BaseContainer>

      <BaseContainer>
        <h4>
          You were invited to play this game, do you want to join the game?
        </h4>
        <Button
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

export default JoinGame
