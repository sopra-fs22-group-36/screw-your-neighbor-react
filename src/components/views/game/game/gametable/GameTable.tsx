import React from "react"
import { PlayerHand } from "./PlayerHand"
import { useCurrentGame } from "../../../../../hooks/api/useCurrentGame"
import { observer } from "mobx-react-lite"
import { CardComponent } from "../../../../ui/CardComponent"
import { distributeOpponents } from "./distributeOpponents"
import "./GameTable.scss"

export const GameTable = observer(() => {
  const { activeParticipations, myParticipation, activeRound } =
    useCurrentGame()

  const cards = activeRound.cards || []

  const participationSlots = distributeOpponents(
    myParticipation,
    activeParticipations
  )

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
          participation={participationSlots.slot1}
        />
        <PlayerHand
          className={"player player-3"}
          participation={participationSlots.slot2}
        />
        <PlayerHand
          className={"player player-4"}
          participation={participationSlots.slot3}
        />
        <PlayerHand
          className={"player player-5"}
          participation={participationSlots.slot4}
        />
      </div>
    </div>
  )
})
