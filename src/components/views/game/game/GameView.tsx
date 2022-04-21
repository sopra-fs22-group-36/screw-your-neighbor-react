import React from "react"
import { useNavigate } from "react-router-dom"
import { Paths } from "../../../routing/routers/Paths"
import { usePlayers } from "../../../../hooks/api/usePlayers"
import { useCurrentGame } from "../../../../hooks/api/useCurrentGame"
import { observer } from "mobx-react-lite"
import { GameTable } from "./gametable/GameTable"
import { VideoChat } from "./videochat/VideoChat"
import { ScoreBoard } from "./scoreboard/ScoreBoard"
import { Login } from "@mui/icons-material"
import { Button, Grid } from "@mui/material"
import { YourHand } from "./yourhand/YourHand"
import "./GameView.scss"
import ScoreAnnouncing from "./scoreannouncing/ScoreAnnouncing"

/**
 * The main game page inside the Jass-Stube includes a table with all players
 * @param props
 * @returns
 */
const GameView = observer(() => {
  const navigate = useNavigate()
  const { me } = usePlayers()
  const { loading, game, leaveGame } = useCurrentGame()

  const clickLeave = async () => {
    await leaveGame()
    navigate(Paths.LOBBY)
  }

  return (
    <div className="game div-box">
      <h1>
        Welcome, {me.name} to Game: {game.name}
      </h1>
      <Grid container spacing={0} className={"top-row"}>
        <Grid item xs={2} />
        <Grid item xs={4}>
          <ScoreBoard />
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={4}>
          <VideoChat />
        </Grid>
      </Grid>
      <Grid container className={"second-row"}>
        <Grid item xs={12}>
          <GameTable />
          <YourHand />
          <ScoreAnnouncing />
        </Grid>
      </Grid>
      <Button
        disabled={loading}
        variant="contained"
        endIcon={<Login />}
        onClick={clickLeave}
      >
        Leave
      </Button>
    </div>
  )
})

export default GameView
