import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { toJS } from "mobx"
import Footer from "../../ui/Footer"
import BaseContainer from "../../ui/BaseContainer"
import { useNavigate } from "react-router-dom"
import { useGames } from "../../../hooks/api/useGames"
import { usePlayers } from "../../../hooks/api/usePlayers"
import { CreateGame } from "./CreateGame"
import { RoomRow } from "./RoomRow"
import { Paths } from "../../routing/routers/Paths"
import { Collapse, Grid, Tooltip } from "@mui/material"
import { TransitionGroup } from "react-transition-group"
import "../../../styles/ui/Divs.scss"
import "../../../styles/ui/Lists.scss"
import "../../../styles/ui/images.scss"
import "../lobby/Lobby.scss"
import { Game } from "../../../generated"

const Lobby = observer(() => {
  const maxNumberOfPlayers = 5
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
  // filtering all the active games to only show the ones that have not started yet
  const searchingGames = games.filter(
    (game) =>
      game.gameState === Game.gameState.FINDING_PLAYERS &&
      game.participations.length < maxNumberOfPlayers
  )

  return (
    <div className="div-lobby">
      <BaseContainer>
        <h1 className="font-title">Lobby</h1>
      </BaseContainer>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <BaseContainer>
            <h3>Choose one of the Rooms to join</h3>
            <div className="room-group">
              <div className="roomlist">
                <TransitionGroup className="roomlist-item">
                  {searchingGames.map((game) => (
                    <Collapse key={game._links.self.href}>
                      <RoomRow game={toJS(game)} />
                    </Collapse>
                  ))}
                </TransitionGroup>
              </div>
              <CreateGame />
            </div>
          </BaseContainer>
        </Grid>
        <Grid item xs={2}>
          <Tooltip
            title={
              "Here you can see everyone that is currently playing or in the lobby"
            }
            arrow={true}
            enterDelay={500}
            placement={"bottom"}
          >
            <div className="lobby-player-div">
              <h3>Available players </h3>
              <div>
                {players.map((value) => (
                  <li
                    className="lobby-individualPlayer"
                    key={value._links.self.href}
                  >
                    {value.name}
                  </li>
                ))}
              </div>
            </div>
            <div className="buttonDiv">
              <button className="lobbyButton" onClick={() => doLogout()}>
                Logout
              </button>
            </div>
          </Tooltip>
        </Grid>
      </Grid>
      <Footer />
      <div className="background-img"></div>
    </div>
  )
})

export default Lobby
