import React from "react"
import { useNavigate } from "react-router-dom"
import { Paths } from "../routing/routers/Paths"
import { usePlayers } from "../../hooks/api/usePlayers"
import { useCurrentGame } from "../../hooks/api/useCurrentGame"
import { observer } from "mobx-react-lite"
import { Login } from "@mui/icons-material"
import { Button } from "@mui/material"
import BaseContainer from "../ui/BaseContainer"
import { api } from "../../api/api"

/**
 * The main game page inside the Jass-Stube includes a table with all players
 * @param props
 * @returns
 */
const Game = observer(() => {
  const navigate = useNavigate()
  const { me } = usePlayers()
  const { loading, game, leaveGame } = useCurrentGame()

  const clickLeave = async () => {
    await leaveGame()
    navigate(Paths.LOBBY)
  }

  const getcard = async () => {
    //Just a test function to figure out how the api calls work now
    try {
      const response = await api.get("/cards") //How do I get the cards? They arent included in the /game, there is also no hand yet?
    } catch (error) {
      alert(`Something went wrong`)
      console.log(error)
    }
  }

  return (
    <BaseContainer>
      <h1>Game page</h1>
      <div>You are {me.name}</div>
      <div>You are in the game {game.name}</div>
      <button onClick={getcard}>Get cards (TEST BUTTON)</button>
      <Button
        disabled={loading}
        variant="contained"
        endIcon={<Login />}
        onClick={clickLeave}
      >
        Leave
      </Button>
    </BaseContainer>
  )
})

export default Game
