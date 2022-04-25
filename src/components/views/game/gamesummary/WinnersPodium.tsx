import React from "react"
import BaseContainer from "../../../ui/BaseContainer"
import { useCurrentGame } from "../../../../hooks/api/useCurrentGame"

import "./WinnersPodium.scss"

export const WinnersPodium = () => {
  const { activeParticipations } = useCurrentGame()

  const sortedPlayers =  activeParticipations.slice().sort((a, b) => b.points - a.points) ?? []
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
    </div>
  )
}
