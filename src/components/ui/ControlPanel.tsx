import React from "react"
import { useNavigate } from "react-router-dom"
import { useCurrentGame } from "../../hooks/api/useCurrentGame"
import { Paths } from "../routing/routers/Paths"
import Button from "@mui/material/Button"
import SendIcon from "@mui/icons-material/Send"
import LogoutIcon from "@mui/icons-material/Logout"

export const ControlPanel = () => {
  const navigate = useNavigate()
  const { loading, leaveGame, playGame } = useCurrentGame()

  const clickLeave = async () => {
    await leaveGame()
    navigate(Paths.LOBBY)
  }

  const start = async () => {
    await playGame()
    navigate(Paths.GAME)
  }

  return (
    <div className={"control-panel"}>
      <div>
        <Button
          disabled={loading}
          variant="contained"
          endIcon={<SendIcon />}
          onClick={start}
        >
          Start Game
        </Button>
      </div>

      <div>
        <Button
          disabled={loading}
          variant="contained"
          endIcon={<LogoutIcon />}
          onClick={clickLeave}
        >
          Leave Room
        </Button>
      </div>
    </div>
  )
}
