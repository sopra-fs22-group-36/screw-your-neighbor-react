import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { toJS } from "mobx"
import Footer from "../ui/Footer"
import BaseContainer from "../ui/BaseContainer"
import { useNavigate } from "react-router-dom"
import { useGames } from "../../hooks/api/useGames"
import { usePlayers } from "../../hooks/api/usePlayers"
import { CreateGame } from "../ui/CreateGame"
import { RoomRow } from "../ui/RoomRow"
import { Paths } from "../routing/routers/Paths"
import { Grid } from "@mui/material"
import "../../styles/ui/Button.scss"
import "../../styles/ui/Divs.scss"
import "../../styles/ui/Lists.scss"
import "../../styles/ui/images.scss"

const Lobby = observer(() => {
  const navigate = useNavigate()
  const { startPollPlayers, players, logout } = usePlayers()
  const { startPollGames, games } = useGames()

  useEffect(() => {
    const playersSubscription = startPollPlayers()
    const gamesSubscription = startPollGames()
    return () =>
      [playersSubscription, gamesSubscription].forEach((sub) => sub.cancel())
  }, [startPollGames, startPollPlayers])

  const doLogout = async () => {
    await logout()
    navigate(Paths.CREATE_PLAYER)
  }

  return (
    <div className="div-lobby">
      <BaseContainer>
        <h1 className="font-title">Lobby</h1>
      </BaseContainer>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <BaseContainer>
            <h3>Choose one of the Rooms to join</h3>
            <div className="div-rooms">
              <div className="roomlist">
                {games.map((game) => (
                  <RoomRow key={game._links.self.href} game={toJS(game)} />
                ))}
              </div>

              <CreateGame />

              <button className="button" onClick={() => doLogout()}>
                Logout
              </button>
            </div>
          </BaseContainer>
        </Grid>
        <Grid item xs={2}>
          <div className="div-players">
            <h3>Available players</h3>
            <ul>
              {players.map((value) => (
                <li key={value._links.self.href}>{value.name}</li>
              ))}
            </ul>
          </div>
        </Grid>
      </Grid>

      <Footer />
      <div className="background-img"></div>
    </div>
  )
})

export default Lobby
