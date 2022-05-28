import React from "react"
import { observer } from "mobx-react-lite"
import { GameTable } from "./gametable/GameTable"
import { VideoChat } from "./videochat/VideoChat"
import { ScoreBoard } from "./scoreboard/ScoreBoard"
import { Grid, Tooltip } from "@mui/material"
import { YourHand } from "./yourhand/YourHand"
import "./GameView.scss"
import HamburgerMenu from "../../../ui/HamburgerMenu"
import { AnnouncementModal } from "./scoreannouncing/AnnouncementModal"
import { useCurrentGame } from "../../../../hooks/api/useCurrentGame"

/**
 * The main game page inside the Jass-Stube includes a table with all players
 * @param props
 * @returns
 */
const GameView = observer(() => {
  const { yourActiveHand } = useCurrentGame()

  const textPart1 = `You have won ${yourActiveHand?.numberOfWonTricks} tricks`
  const textPart2 = `and announced that you will make ${yourActiveHand?.announcedScore} tricks.`
  const pointsOverViewToolTipText = `${textPart1}, ${textPart2}`
  return (
    <div className="game div-box">
      <Grid container spacing={0} className={"top-row"}>
        <Grid item xs={1}>
          <HamburgerMenu />
        </Grid>
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
            <AnnouncementModal />
            <div className={"points-overview"}>
              <Tooltip title={pointsOverViewToolTipText} arrow={true}>
                <span>
                  {yourActiveHand?.numberOfWonTricks}/
                  {yourActiveHand?.announcedScore}
                </span>
              </Tooltip>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  )
})

export default GameView
