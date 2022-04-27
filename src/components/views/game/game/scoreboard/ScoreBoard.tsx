import React from "react"
import { observer } from "mobx-react-lite"
import { useCurrentGame } from "../../../../../hooks/api/useCurrentGame"
import { iriMatch } from "../../../../../util/iriMatch"
import BaseContainer from "../../../../ui/BaseContainer"
import { Chip } from "@mui/material"
import "./ScoreBoard.scss"

export const ScoreBoard = observer(() => {
  const { activeParticipations, activeMatch } = useCurrentGame()

  return (
    <div className={"scoreboard"}>
      <BaseContainer>
        <h1>ScoreBoard</h1>
        <ul className={"player-list"}>
          {activeParticipations.map((participation) => {
            const self = participation._links.self
            const turnActive = activeMatch.hands
              .filter((hand) => iriMatch(hand.participation._links.self, self))
              .some((hand) => hand.turnActive)
            return (
              <li key={self.href}>
                <span className={"player-name"}>
                  {participation.player.name}
                </span>
                {turnActive && (
                  <Chip
                    color={"info"}
                    label={"Playing"}
                    className={"chip"}
                    size={"small"}
                  ></Chip>
                )}

                <span className={"points"}>Points: {participation.points}</span>
              </li>
            )
          })}
        </ul>
      </BaseContainer>
    </div>
  )
})
