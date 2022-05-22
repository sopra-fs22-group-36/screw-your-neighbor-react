import React from "react"
import { EntityModelGame } from "../../../generated"
import { useNavigate } from "react-router-dom"
import { Paths } from "../../routing/routers/Paths"
import { useGames } from "../../../hooks/api/useGames"
import { extractId } from "../../../util/extractId"

import { Grid, Tooltip } from "@mui/material"
import Button from "@mui/material/Button"
import { Login } from "@mui/icons-material"
import "../lobby/Lobby.scss"
import "../../../styles/ui/Button.scss"

export const RoomRow = (props: { game: EntityModelGame }) => {
  const { loading, joinGame } = useGames()
  const navigate = useNavigate()

  const clickJoin = async () => {
    await joinGame(props.game)
    const gameId = extractId(props.game._links.self)
    navigate(Paths.GAME + `/${gameId}`)
  }

  const participationCount = props.game?.participations?.filter(
    (value) => value.active
  ).length
  return (
    <Tooltip
      title={'click "JOIN" to access this game-room'}
      arrow={true}
      placement={"left"}
      enterDelay={500}
    >
      <div className="lobbyRooms">
        <Grid container spacing={1}>
          <Grid item xs={6}>
            {props.game.name}
          </Grid>
          <Grid item xs={3}>
            {participationCount} Players
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
    </Tooltip>
  )
}
