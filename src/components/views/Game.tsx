import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Paths } from "../routing/routers/Paths"
import { usePlayers } from "../../hooks/api/usePlayers"
import { useCurrentGame } from "../../hooks/api/useCurrentGame"
import { useApi } from "../../hooks/api/useApi"
import { appContext } from "../../AppContext"
import { observer } from "mobx-react-lite"
import { Login } from "@mui/icons-material"
import { Button } from "@mui/material"
import BaseContainer from "../ui/BaseContainer"

/**
 * The main game page inside the Jass-Stube includes a table with all players
 * @param props
 * @returns
 */
const Game = observer(() => {
  const navigate = useNavigate()
  const { me } = usePlayers()
  const { loading, game, leaveGame } = useCurrentGame()
  const { currentGameStore } = useContext(appContext)
  const { request, wrapApiCall } = useApi()

  const clickLeave = async () => {
    await leaveGame()
    navigate(Paths.LOBBY)
  }

  const getcard = async () => {
    //Just a test function to figure out how the api calls work now

    const cardlist = await wrapApiCall(
      request.request({
        method: "GET",
        url: "/cards", //I should get all the information for my game with a call to /game/id - so how do i get the cards that are "active" in that game?
      })
    )

    console.log(cardlist._embedded.cards) //How do I get the cards WITHOUT causing a huge error message?
  }

  /*things i had to temporarily remove because errors occured:
   <div>You are {me.name}</div>
    <div>You are in the game {game.name}</div>

    Ask Lucius why game can now no longer access this information! What changed?
   */

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
