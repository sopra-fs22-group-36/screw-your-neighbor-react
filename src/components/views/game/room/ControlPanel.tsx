import React from "react"
import { useNavigate } from "react-router-dom"
import { useCurrentGame } from "../../../../hooks/api/useCurrentGame"
import { Paths } from "../../../routing/routers/Paths"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import LogoutIcon from "@mui/icons-material/Logout"
import { Tooltip } from "@mui/material"
import StartButton from "../../../ui/StartButton"

export const ControlPanel = () => {
  const navigate = useNavigate()
  const { loading, leaveGame, activeParticipations } = useCurrentGame()
  const shouldDisable = activeParticipations.length < 2

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
        <Box p={1} m={2} borderRadius={2}>
          <StartButton
            style={{
              minWidth: "250px",
              minHeight: "60px",
              borderRadius: 15,
              color: shouldDisable === true ? "rgb(45,45,45,0.8)" : "white",
            }}
            disabled={shouldDisable}
          />
        </Box>
      </Tooltip>

      <Box p={1} m={2}>
        <Button
          style={{ minWidth: "250px", minHeight: "60px", borderRadius: 20 }}
          disabled={loading}
          variant="contained"
          endIcon={<LogoutIcon />}
          onClick={clickLeave}
        >
          Leave Room
        </Button>
      </Box>
    </div>
  )
}
