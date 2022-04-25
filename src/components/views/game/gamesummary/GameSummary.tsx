import React from "react"
import { observer } from "mobx-react-lite"
import { useCurrentGame } from "../../../../hooks/api/useCurrentGame"
import BaseContainer from "../../../ui/BaseContainer"
import SendIcon from "@mui/icons-material/Send"
import LogoutIcon from "@mui/icons-material/Logout"
import Button from "@mui/material/Button"
import { useNavigate } from "react-router-dom"
import { Paths } from "../../../routing/routers/Paths"
import ReactConfetti from "react-confetti"
import { WinnersPodium } from "./WinnersPodium"

export const GameSummary = observer(() => {
  const navigate = useNavigate()
  const { closeGame, loading } = useCurrentGame()

  const clickCloseGame = async () => {
    await closeGame()
    navigate(Paths.LOBBY)
  }
  const clickStartNewGame = async () => {
    await closeGame()
    navigate(Paths.LOBBY)
  }

  return (
    <div>
      <ReactConfetti gravity={0.01} opacity={0.5} tweenDuration={5000} />
      <BaseContainer>
        <WinnersPodium />
        <Button
          disabled={loading}
          variant="contained"
          endIcon={<LogoutIcon />}
          onClick={clickCloseGame}
        >
          Close game
        </Button>
        <Button
          disabled={loading}
          variant="contained"
          endIcon={<SendIcon />}
          onClick={clickStartNewGame}
        >
          Start new Game
        </Button>
      </BaseContainer>
    </div>
  )
})
