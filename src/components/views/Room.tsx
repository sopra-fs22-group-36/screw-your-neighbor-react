import React from "react"
import BaseContainer from "../ui/BaseContainer"
import { useNavigate } from "react-router-dom"
import { Paths } from "../routing/routers/Paths"
import { useCurrentGame } from "../../hooks/api/useCurrentGame"

const Room = (props) => {
  const navigate = useNavigate()
  const { loading, game, leaveGame } = useCurrentGame()
  const temporary = async () => {
    //To make sure you can get from the room to the Game
    navigate(Paths.GAME)
  }

  return (
    <BaseContainer>
      <h1>Room page</h1>
      <div>You are in the game {game.name}</div>
      <button style={{ height: "50px" }} onClick={temporary}>
        GET TO MY GAME
      </button>
    </BaseContainer>
  )
}

export default Room
