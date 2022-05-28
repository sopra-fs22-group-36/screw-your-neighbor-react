import React from "react"
import { useCurrentGame } from "../../../../hooks/api/useCurrentGame"
import Box from "@mui/material/Box"
import { Tooltip } from "@mui/material"
import StartButton from "../../../ui/ColorButtons/StartButton"
import LeaveButton from "../../../ui/ColorButtons/LeaveButton"

export const ControlPanel = () => {
  const { activeParticipations } = useCurrentGame()
  const shouldDisable = activeParticipations.length < 2

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
              color: shouldDisable === true ? "rgb(45,45,45,0.8)" : "white",
            }}
            disabled={shouldDisable}
          />
        </Box>
      </Tooltip>

      <Box p={1} m={2}>
        <LeaveButton
          style={{
            minWidth: "250px",
            minHeight: "60px",
          }}
        />
      </Box>
    </div>
  )
}
