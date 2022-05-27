import React from "react"
import { observer } from "mobx-react-lite"
import ReactConfetti from "react-confetti"
import { WinnersPodium } from "./WinnersPodium"
import "../gamesummary/GameSummary.scss"
import Box from "@mui/material/Box"
import LeaveButton from "../../../ui/ColorButtons/LeaveButton"
import NewGameButton from "../../../ui/ColorButtons/NewGameButton"

export const GameSummary = observer(() => {
  return (
    <div className="gameSummary-div">
      <ReactConfetti gravity={0.01} opacity={0.5} tweenDuration={5000} />
      <div className="gameSummary-box">
        <WinnersPodium />
        <Box className="gameSummary-button-box">
          <NewGameButton
            style={{
              minWidth: "200px",
              minHeight: "40px",
              borderRadius: 20,
              margin: "10px",
              color: "white",
            }}
          />
          <LeaveButton
            style={{
              display: "flex",
              minWidth: "100px",
              maxWidth: "200px",
              minHeight: "40px",
              borderRadius: 15,
              margin: "10px",
              color: "white",
            }}
          />
        </Box>
      </div>
    </div>
  )
})
