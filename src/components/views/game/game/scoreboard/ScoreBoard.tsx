import React from "react"
import { observer } from "mobx-react-lite"
import { useCurrentGame } from "../../../../../hooks/api/useCurrentGame"
import BaseContainer from "../../../../ui/BaseContainer"
import "./ScoreBoard.scss"

export const ScoreBoard = observer(() => {
  const { activeParticipations } = useCurrentGame()

  return (
    <div className={"scoreboard"}>
      <BaseContainer>
        <h1>ScoreBoard</h1>
        <ul className={"player-list"}>
          {activeParticipations.map((participation) => {
            return (
              <li key={participation._links.self.href}>
                <span className={"player-name"}>
                  {participation.player.name}
                </span>
                <span className={"points"}>Points: {participation.points}</span>
              </li>
            )
          })}
        </ul>
      </BaseContainer>
    </div>
  )
})
