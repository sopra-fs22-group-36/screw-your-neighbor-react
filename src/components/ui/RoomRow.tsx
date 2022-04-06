import React from "react"
import { EntityModelGame } from "../../generated"
import { useNavigate } from "react-router-dom"
import { Paths } from "../routing/routers/Paths"
import { useGames } from "../../hooks/api/useGames"

import { Grid } from "@mui/material"
import Button from "@mui/material/Button"
import { Login } from "@mui/icons-material"
import "../../styles/ui/Lists.scss"

export const RoomRow = (props: { game: EntityModelGame }) => {
  const { loading, joinGame } = useGames()
  const navigate = useNavigate()

  const clickJoin = async () => {
    await joinGame(props.game)
    navigate(Paths.ROOM)
  }

  return (
    <div className="roomlistitem">
      <Grid container spacing={1}>
        <Grid item xs={6}>
          {props.game.name}
        </Grid>
        <Grid item xs={3}>
          {props.game._embedded.participations.length} Players
        </Grid>
        <Grid item xs={3}>
          <Button
            disabled={loading}
            variant="contained"
            endIcon={<Login />}
            onClick={clickJoin}
          >
            join
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}
