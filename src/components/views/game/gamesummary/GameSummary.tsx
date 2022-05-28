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
        <div
          style={{
            height: "80%",
            maxHeight: "80vh",
          }}
        >
          <WinnersPodium />
        </div>
        <Box className="gameSummary-button-box">
          <NewGameButton
            style={{
              height: "40px",
            }}
          />
          <LeaveButton
            style={{
              display: "flex",
              height: "45px",
            }}
          />
        </Box>
      </div>
    </div>
  )
})
