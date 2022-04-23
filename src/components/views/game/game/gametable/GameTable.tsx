import React from "react"
import { PlayerHand } from "./PlayerHand"
import { useCurrentGame } from "../../../../../hooks/api/useCurrentGame"
import { CardComponent } from "../../../../ui/CardComponent"
import "./GameTable.scss"

function createParticipation(name) {
  return {
    player: {
      name: name,
    },
  }
}

export const GameTable = () => {
  const { activeRound } = useCurrentGame()

  const cards = activeRound.cards || []

  const participationTwo = createParticipation("Player2")
  const participationThree = createParticipation("Player3")
  const participationFour = createParticipation("Player4")
  const participationFive = createParticipation("Player5")
  return (
    <div className={"game-table"}>
      <div className={"game-table absolute-wrapper"}>
        <div className={"card-table"}>
          {cards.map((card, index) => (
            <div key={index}>
              <CardComponent card={card} />
            </div>
          ))}
        </div>
        <PlayerHand
          className={"player player-2"}
          participation={participationTwo}
        />
        <PlayerHand
          className={"player player-3"}
          participation={participationThree}
        />
        <PlayerHand
          className={"player player-4"}
          participation={participationFour}
        />
        <PlayerHand
          className={"player player-5"}
          participation={participationFive}
        />
      </div>
    </div>
  )
}
