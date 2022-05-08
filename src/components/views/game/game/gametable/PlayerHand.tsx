import React, { useRef } from "react"
import { observer } from "mobx-react-lite"
import { EntityModelParticipation } from "../../../../../generated"
import { iriMatch } from "../../../../../util/iriMatch"
import { useCurrentGame } from "../../../../../hooks/api/useCurrentGame"
import { useTransition, a, config } from "react-spring"
import { Person } from "@mui/icons-material"
import "./PlayerHand.scss"
import cardBack from "../../../../../img/card-backside.png"

export type PlayerHandProps = {
  participation: EntityModelParticipation
  className: string
  playedCards: HTMLElement
}

export const PlayerHand = observer((props: PlayerHandProps) => {
  if (!props.participation) {
    return <></>
  }
  const useCurrentGameHook = useCurrentGame()
  const playerName = props.participation.player.name

  const currentHand = useCurrentGameHook.activeMatch.hands
    .filter((value) =>
      iriMatch(props.participation._links.self, value.participation._links.self)
    )
    .slice(-1)[0]

  const notPlayedCards = currentHand.cards.filter((card) => !card.round)

  const cardsContainer = useRef<HTMLDivElement>()

  const difference = getTargetCoordinates(cardsContainer, props.playedCards)

  const transition = useTransition(
    notPlayedCards,
    createTransitionConfig(difference)
  )

  return (
    <div className={`player-hand ${props.className}`}>
      <div className={"content"}>
        <div className={"opponent"}>
          <Person
            sx={{
              fontSize: "13em",
              color: "black",
            }}
          />
          <span className={"player-name"}>{playerName}</span>
        </div>
        <div className={"cards"} ref={cardsContainer}>
          {transition(
            (styles, item) =>
              item && (
                <a.div className={"animated-card"} style={styles}>
                  <img src={cardBack} alt="card_back_image" />
                </a.div>
              )
          )}
        </div>
      </div>
    </div>
  )
})

function getTargetCoordinates(
  cardsContainer: React.MutableRefObject<HTMLDivElement>,
  playedCards: HTMLElement
) {
  if (cardsContainer.current) {
    const cardsContainerRect = cardsContainer.current.getBoundingClientRect()
    const playedCardsRect = playedCards.getBoundingClientRect()

    const targetX = playedCardsRect.x + playedCardsRect.width / 2
    const targetY = playedCardsRect.y + playedCardsRect.width / 2
    return {
      x: targetX - cardsContainerRect.x,
      y: targetY - cardsContainerRect.y,
    }
  }
  return {
    x: 0,
    y: 0,
  }
}

function createTransitionConfig(difference: { x: number; y: number }) {
  const initialConfig = {
    x: 0,
    y: 0,
    opacity: 1,
    rotateZ: 0,
  }
  return {
    keys: (item) => item._links.self.href,
    from: {
      ...initialConfig,
    },
    enter: {
      ...initialConfig,
    },
    leave: {
      ...difference,
      opacity: 0,
      rotateZ: 360,
    },
    config: {
      ...config.molasses,
      tension: 140,
      friction: 40,
    },
  }
}
