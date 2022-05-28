import React from "react"
import { EntityModelGame } from "../../../generated"
import { useNavigate } from "react-router-dom"
import { Paths } from "../../routing/routers/Paths"
import { useGames } from "../../../hooks/api/useGames"
import { extractId } from "../../../util/extractId"

import { Grid, Tooltip } from "@mui/material"
import { Login } from "@mui/icons-material"
import { SecondaryButton } from "../../ui/ColorButtons/SecondaryButton"
import "../lobby/RoomRow.scss"
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
      <div className="lobby-rooms">
        <Grid container spacing={1}>
          <Grid item xs={6}>
            {props.game.name}
          </Grid>
          <Grid item xs={3}>
            {participationCount} Players
          </Grid>
          <Grid item xs={3}>
            <SecondaryButton
              action={clickJoin}
              disabled={loading}
              endIcon={<Login />}
              style={{
                minWidth: "0px",
                minHeight: "0px",
                margin: "unset",
              }}
            >
              join
            </SecondaryButton>
          </Grid>
        </Grid>
      </div>
    </Tooltip>
  )
}
