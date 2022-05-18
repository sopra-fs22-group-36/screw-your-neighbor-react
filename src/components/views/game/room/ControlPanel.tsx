import React from "react"
import { useNavigate } from "react-router-dom"
import { useCurrentGame } from "../../../../hooks/api/useCurrentGame"
import { Paths } from "../../../routing/routers/Paths"
import Button from "@mui/material/Button"
import SendIcon from "@mui/icons-material/Send"
import LogoutIcon from "@mui/icons-material/Logout"
import { Tooltip } from "@mui/material"

export const ControlPanel = () => {
  const navigate = useNavigate()
  const { loading, leaveGame, playGame, activeParticipations } =
    useCurrentGame()

  const clickLeave = async () => {
    await leaveGame()
    navigate(Paths.LOBBY)
  }

  return (
    <div className={"control-panel"}>
      <Tooltip
        title={
          activeParticipations.length < 2
            ? "You need to be at least two players to start the game"
            : ""
        }
        arrow={true}
        placement={"top"}
      >
        <div style={{ margin: "10px" }}>
          <Button
            disabled={loading || activeParticipations.length < 2}
            variant="contained"
            endIcon={<SendIcon />}
            onClick={playGame}
          >
            Start Game
          </Button>
        </div>
      </Tooltip>

      <div style={{ margin: "10px" }}>
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
