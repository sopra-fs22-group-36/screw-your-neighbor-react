import React from "react"
import { useCurrentGame } from "../../../../hooks/api/useCurrentGame"
import { observer } from "mobx-react-lite"
import { GameTable } from "./gametable/GameTable"
import { VideoChat } from "./videochat/VideoChat"
import { ScoreBoard } from "./scoreboard/ScoreBoard"
import { Grid } from "@mui/material"
import { YourHand } from "./yourhand/YourHand"
import "./GameView.scss"
import ScoreAnnouncing from "./scoreannouncing/ScoreAnnouncing"
import HamburgerMenu from "../../../ui/HamburgerMenu"

/**
 * The main game page inside the Jass-Stube includes a table with all players
 * @param props
 * @returns
 */
const GameView = observer(() => {
  const { loading } = useCurrentGame() //IF I REMOVE THIS THE CODE DOESNT WANT TO WORK ANYMORE AND I HAVENT FIGURED OUT WHY YET

  return (
    <div className="game div-box">
      <Grid container spacing={0} className={"top-row"}>
        <Grid item xs={1} />
        <Grid item xs={5}>
          <ScoreBoard />
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={5}>
          <VideoChat />
        </Grid>
      </Grid>
      <Grid container className={"second-row"}>
        <Grid item xs={12}>
          <div className={"game wrapper-for-absolute"}>
            <GameTable />
            <YourHand />
            <ScoreAnnouncing />
          </div>
        </Grid>
      </Grid>
      <HamburgerMenu />
    </div>
  )
})

export default GameView
