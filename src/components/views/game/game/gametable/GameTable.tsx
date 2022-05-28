import React, { forwardRef, useRef } from "react"
import { PlayerHand } from "./PlayerHand"
import { useCurrentGame } from "../../../../../hooks/api/useCurrentGame"
import { observer } from "mobx-react-lite"
import { useParticipationAvatars } from "../../../../../hooks/useParticipationAvatars"
import { CardComponent } from "../../../../ui/CardComponent"
import { distributeOpponents } from "./distributeOpponents"
import { Alert } from "@mui/material"
import "./GameTable.scss"
import { Card } from "../../../../../generated"
import { borderRadius } from "../../../../../styles/styleConstants"

type PlayedCardsProps = {
  cards: Card[]
}

const PlayedCards = observer(
  forwardRef<HTMLDivElement, PlayedCardsProps>(
    (props: { cards: Card[] }, ref) => {
      const { cardHandMap } = useCurrentGame()
      const { getAvatarConfigFor } = useParticipationAvatars()

      const cardRanks = Object.keys(Card.cardRank)
      const sortedCards = props.cards
        .slice()
        .sort(
          (a, b) =>
            cardRanks.indexOf(a.cardRank) - cardRanks.indexOf(b.cardRank)
        )
      return (
        <div className={"card-table"} ref={ref}>
          {sortedCards.map((card, index) => {
            const hand = cardHandMap[card._links.self.href]
            const avatarConfig = getAvatarConfigFor(hand.participation)
            return (
              <div key={index} className={"card-wrapper"}>
                <div>
                  <CardComponent card={card} avatarConfig={avatarConfig} />
                </div>
              </div>
            )
          })}
        </div>
      )
    }
  )
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
    activeRound?.cards.length >= 1 ? activeRound?.cards : lastRound?.cards

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
            <Alert
              variant={"filled"}
              severity={"info"}
              style={{
                borderRadius,
                padding: `3px ${borderRadius}`,
              }}
            >
              Round was stacked, rounds in stack: {stackedRounds}
            </Alert>
          </div>
        ) : (
          <></>
        )}
        <PlayedCards cards={cards ?? []} ref={playedCardsRef} />

        {participationSlots.slot1 ? (
          <PlayerHand
            className={"player player-2"}
            participation={participationSlots.slot1}
            playedCards={playedCardsRef.current}
          />
        ) : (
          <></>
        )}
        {participationSlots.slot2 ? (
          <PlayerHand
            className={"player player-3"}
            participation={participationSlots.slot2}
            playedCards={playedCardsRef.current}
          />
        ) : (
          <></>
        )}
        {participationSlots.slot3 ? (
          <PlayerHand
            className={"player player-4"}
            participation={participationSlots.slot3}
            playedCards={playedCardsRef.current}
          />
        ) : (
          <></>
        )}
        {participationSlots.slot4 ? (
          <PlayerHand
            className={"player player-5"}
            participation={participationSlots.slot4}
            playedCards={playedCardsRef.current}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  )
})
