import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { useCurrentGame } from "../../hooks/api/useCurrentGame"
import BaseContainer from "../ui/BaseContainer"
import { RoomInfoContainer } from "../ui/RoomInfoContainer"
import { ControlPanel } from "../ui/ControlPanel"
import { RoomPlayerContainer } from "../ui/RoomPlayerContainer"
import { Grid } from "@mui/material"
import "./Room.scss"

export const Room = observer(() => {
  const { game, startPollGame } = useCurrentGame()

  useEffect(() => {
    const gameSubscription = startPollGame()
    return () => gameSubscription.cancel()
  }, [startPollGame])

  return (
    <div className={"room"}>
      <BaseContainer>
        <h1 className="font-title">Room "{game.name}"</h1>
      </BaseContainer>

      <Grid container spacing={5} className={"actions-container"}>
        <Grid item xs={4}>
          <BaseContainer>
            <RoomInfoContainer />
          </BaseContainer>
        </Grid>
        <Grid item xs={4}>
          <BaseContainer>
            <ControlPanel />
          </BaseContainer>
        </Grid>
        <Grid item xs={4}>
          <BaseContainer>
            <RoomPlayerContainer />
          </BaseContainer>
        </Grid>
      </Grid>
    </div>
  )
})
