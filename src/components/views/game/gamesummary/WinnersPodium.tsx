import React from "react"
import BaseContainer from "../../../ui/BaseContainer"
import { useCurrentGame } from "../../../../hooks/api/useCurrentGame"
import trophy from "../../../../img/winnerwinnerchickendinner.png"
import lost from "../../../../img/betterluck.png"

import "./WinnersPodium.scss"
import { usePlayers } from "../../../../hooks/api/usePlayers"

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
      <BaseContainer>
        <h1>ScoreBoard</h1>
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
      </BaseContainer>
      <img
        id="didYouWin"
        src={imageURL}
        alt="Spielleistung"
        className="trophy"
        style={{ width: "40%" }}
      />
    </div>
  )
}
