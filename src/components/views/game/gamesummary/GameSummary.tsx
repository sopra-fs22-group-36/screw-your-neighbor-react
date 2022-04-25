import React from "react"
import { observer } from "mobx-react-lite"
import { useCurrentGame } from "../../../../hooks/api/useCurrentGame"
import BaseContainer from "../../../ui/BaseContainer"
import SendIcon from "@mui/icons-material/Send"
import Button from "@mui/material/Button"
import { useNavigate } from "react-router-dom"
import { Paths } from "../../../routing/routers/Paths"
import ReactConfetti from "react-confetti"
import { WinnersPodium } from "./WinnersPodium"

export const GameSummary = observer(() => {
  const navigate = useNavigate()
  const { game, closeGame, loading } = useCurrentGame()

  const listOfPlayers = game.participations.map((participation) => (participation))




  const clickCloseGame = async () => {
    await closeGame()
    navigate(Paths.LOBBY)
  }

  return (
    <div>
      <ReactConfetti
        gravity={0.01}
        opacity={0.5}
      />


      <BaseContainer>

        <WinnersPodium />

        <Button
          disabled={loading}
          variant="contained"
          endIcon={<SendIcon />}
          onClick={clickCloseGame}
        >
          Close game
        </Button>
      </BaseContainer>
    </div>
  )
})
