import React, { forwardRef, useRef } from "react"
import { PlayerHand } from "./PlayerHand"
import { useCurrentGame } from "../../../../../hooks/api/useCurrentGame"
import { observer } from "mobx-react-lite"
import { CardComponent } from "../../../../ui/CardComponent"
import { distributeOpponents } from "./distributeOpponents"
import { Alert } from "@mui/material"
import "./GameTable.scss"
import { Card } from "../../../../../generated"

type PlayedCardsProps = {
  cards: Card[]
}

const PlayedCards = forwardRef<HTMLDivElement, PlayedCardsProps>(
  (props: { cards: Card[] }, ref) => {
    return (
      <div className={"card-table"} ref={ref}>
        {props.cards.map((card, index) => (
          <div key={index} className={"card-place-" + (index + 1)}>
            <CardComponent card={card} />
          </div>
        ))}
      </div>
    )
  }
)

export const GameTable = observer(() => {
  const {
    activeParticipations,
    myParticipation,
    activeRound,
    lastRound,
    sortedRoundsOfActiveMatch,
  } = useCurrentGame()

  const cards =
    activeRound.cards.length >= 1 ? activeRound.cards : lastRound.cards

  const participationSlots = distributeOpponents(
    myParticipation,
    activeParticipations
  )

  const reversedRounds = sortedRoundsOfActiveMatch.slice().reverse().slice(1)
  let stackedRounds = 0
  for (const round of reversedRounds) {
    if (round.stacked) {
      stackedRounds++
    } else {
      break
    }
  }

  const playedCardsRef = useRef()

  return (
    <div className={"game-table"}>
      <div className={"game-table absolute-wrapper"}>
        {stackedRounds > 0 ? (
          <div className={"stacked-indicator"}>
            <Alert variant={"filled"} severity={"warning"}>
              Round was stacked, rounds in stack: {stackedRounds}
            </Alert>
          </div>
        ) : (
          <></>
        )}
        <PlayedCards cards={cards} ref={playedCardsRef} />
        <PlayerHand
          className={"player player-2"}
          participation={participationSlots.slot1}
          playedCards={playedCardsRef.current}
        />
        <PlayerHand
          className={"player player-3"}
          participation={participationSlots.slot2}
          playedCards={playedCardsRef.current}
        />
        <PlayerHand
          className={"player player-4"}
          participation={participationSlots.slot3}
          playedCards={playedCardsRef.current}
        />
        <PlayerHand
          className={"player player-5"}
          participation={participationSlots.slot4}
          playedCards={playedCardsRef.current}
        />
      </div>
    </div>
  )
})
