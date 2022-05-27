import React from "react"
import { useCurrentGame } from "../../../../hooks/api/useCurrentGame"
import trophy from "../../../../img/winnerwinnerchickendinner.png"
import lost from "../../../../img/betterluck.png"

import "./WinnersPodium.scss"
import { usePlayers } from "../../../../hooks/api/usePlayers"
import { Tooltip } from "@mui/material"

export const WinnersPodium = () => {
  const { activeParticipations } = useCurrentGame()
  const { me } = usePlayers()
  const sortedPlayers =
    activeParticipations.slice().sort((a, b) => b.points - a.points) ?? []

  let imageURL = ""
  if (sortedPlayers[0].player.name === me.name)
    imageURL = trophy //change to link later - for now it's alright
  else imageURL = lost

  return (
    <div className={"winnerspodium"}>
      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          paddingBottom: "10px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
          }}
        >
          ScoreBoard
        </h1>
        <ol className={"player-list"}>
          {sortedPlayers.map((participation) => {
            return (
              <li key={participation._links.self.href}>
                <span className={"player-name"}>
                  {participation.player.name}
                </span>
                <span className={"points"}>Points: {participation.points}</span>
              </li>
            )
          })}
        </ol>
      </div>
      <Tooltip
        title={
          imageURL === trophy
            ? "Congratulation! you won!"
            : "You lost, that's too bad! Try again!"
        }
        arrow={true}
        placement={"right"}
      >
        <img
          id="didYouWin"
          src={imageURL}
          alt="Spielleistung"
          className="trophy"
          style={{ width: "40%", paddingBottom: "10px" }}
        />
      </Tooltip>
    </div>
  )
}
