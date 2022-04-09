import React, { useEffect } from "react"
import BaseContainer from "../ui/BaseContainer"
import { useNavigate } from "react-router-dom"
import { Paths } from "../routing/routers/Paths"
import { useCurrentGame } from "../../hooks/api/useCurrentGame"

const Room = (props) => {
  const navigate = useNavigate()
  const { game, startGame, startPollGame } = useCurrentGame()
  const clickStartGame = async () => {
    await startGame()
    navigate(Paths.GAME)
  }

  useEffect(() => {
    const gameSubscription = startPollGame()
    return () => gameSubscription.cancel()
  }, [startPollGame])

  return (
    <BaseContainer>
      <h1>Room page</h1>
      <div>You are in the game {game.name}</div>
      <button style={{ height: "50px" }} onClick={clickStartGame}>
        GET TO MY GAME
      </button>
    </BaseContainer>
  )
}

export default Room
