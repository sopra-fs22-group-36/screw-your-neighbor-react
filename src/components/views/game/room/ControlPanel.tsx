import React from "react"
import { useNavigate } from "react-router-dom"
import { useCurrentGame } from "../../../../hooks/api/useCurrentGame"
import { Paths } from "../../../routing/routers/Paths"
import Button from "@mui/material/Button"
import SendIcon from "@mui/icons-material/Send"
import LogoutIcon from "@mui/icons-material/Logout"

export const ControlPanel = () => {
  const navigate = useNavigate()
  const { loading, leaveGame, playGame, activeParticipations, closeGame } =
    useCurrentGame()

  const clickLeave = async () => {
    await leaveGame()
    navigate(Paths.LOBBY)
  }

  const clickCloseGame = async () => {
    await closeGame()
    navigate(Paths.LOBBY)
  }

  return (
    <div className={"control-panel"}>
      <div>
        <Button
          disabled={loading || activeParticipations.length < 2}
          variant="contained"
          endIcon={<SendIcon />}
          onClick={playGame}
        >
          Start Game
        </Button>
      </div>

      <div>
        <Button
          disabled={loading}
          variant="contained"
          endIcon={<LogoutIcon />}
          onClick={activeParticipations.length < 2 ? clickCloseGame : clickLeave}
        >
          Leave Room
        </Button>
      </div>
    </div>
  )
}
