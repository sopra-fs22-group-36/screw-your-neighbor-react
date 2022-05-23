import React from "react"
import { observer } from "mobx-react-lite"
import { useCurrentGame } from "../../../../hooks/api/useCurrentGame"
import BaseContainer from "../../../ui/BaseContainer"
import { RoomInfoContainer } from "./RoomInfoContainer"
import { ControlPanel } from "./ControlPanel"
import { RoomPlayerContainer } from "./RoomPlayerContainer"
import { Grid } from "@mui/material"
import "./Room.scss"
import Footer from "../../../ui/Footer"

export const Room = observer(() => {
  const { game } = useCurrentGame()

  return (
    <div className={"room-div"}>
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
      <Footer />
    </div>
  )
})
