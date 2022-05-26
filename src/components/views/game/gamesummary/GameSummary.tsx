import React from "react"
import { observer } from "mobx-react-lite"
import { useGames } from "../../../../hooks/api/useGames"
import { extractId } from "../../../../util/extractId"
import SendIcon from "@mui/icons-material/Send"
import LogoutIcon from "@mui/icons-material/Logout"
import Button from "@mui/material/Button"
import { useNavigate } from "react-router-dom"
import { Paths } from "../../../routing/routers/Paths"
import ReactConfetti from "react-confetti"
import { WinnersPodium } from "./WinnersPodium"
import "../gamesummary/GameSummary.scss"
import Box from "@mui/material/Box"

export const GameSummary = observer(() => {
  const navigate = useNavigate()
  const { createOrJoinNextGame, loading } = useGames()

  const clickCloseGame = async () => {
    navigate(Paths.LOBBY)
  }
  const clickStartNewGame = async () => {
    const nextGame = await createOrJoinNextGame()
    const nextGameId = extractId(nextGame._links.self)
    navigate(Paths.GAME + `/${nextGameId}`)
  }

  return (
    <div className="gameSummary-div">
      <ReactConfetti gravity={0.01} opacity={0.5} tweenDuration={5000} />
      <div className="gameSummary-box">
        <WinnersPodium />
        <Box className="gameSummary-button-box">
          <Button
            style={{
              minWidth: "200px",
              minHeight: "40px",
              borderRadius: 20,
              margin: "10px",
            }}
            color={"success"}
            disabled={loading}
            variant="contained"
            endIcon={<SendIcon />}
            onClick={clickStartNewGame}
          >
            Start new Game
          </Button>
          <Button
            style={{
              minWidth: "200px",
              minHeight: "40px",
              borderRadius: 20,
              margin: "10px",
            }}
            color={"error"}
            disabled={loading}
            variant="contained"
            endIcon={<LogoutIcon />}
            onClick={clickCloseGame}
          >
            Close game
          </Button>
        </Box>
      </div>
    </div>
  )
})
