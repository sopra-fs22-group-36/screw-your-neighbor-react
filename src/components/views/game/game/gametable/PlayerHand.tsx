import React, { useRef } from "react"
import { observer } from "mobx-react-lite"
import { EntityModelParticipation } from "../../../../../generated"
import { iriMatch } from "../../../../../util/iriMatch"
import { useCurrentGame } from "../../../../../hooks/api/useCurrentGame"
import { useTransition, a, config } from "react-spring"
import { Person } from "@mui/icons-material"
import "./PlayerHand.scss"
import { useParticipationAvatars } from "../../../../../hooks/useParticipationAvatars"
import { ConfiguredAvatar } from "../../../../ui/ConfiguredAvatar"
import { Badge } from "@mui/material"
import { CardComponent } from "../../../../ui/CardComponent"

export type PlayerHandProps = {
  participation: EntityModelParticipation
  className: string
  playedCards: HTMLElement
}

export const PlayerHand = observer((props: PlayerHandProps) => {
  const useCurrentGameHook = useCurrentGame()
  const { getAvatarConfigFor } = useParticipationAvatars()

  const currentHand = useCurrentGameHook.activeMatch?.hands
    .filter((value) =>
      iriMatch(props.participation._links.self, value.participation._links.self)
    )
    .slice(-1)[0]

  const notPlayedCards = currentHand?.cards.filter((card) => !card.round) ?? []

  const cardsContainer = useRef<HTMLDivElement>()

  const difference = getTargetCoordinates(cardsContainer, props.playedCards)

  const transition = useTransition(
    notPlayedCards,
    createTransitionConfig(difference)
  )

  const avatarConfig = getAvatarConfigFor(props.participation)

  return (
    <div className={`player-hand ${props.className}`}>
      <div className={"content"}>
        <div className={"opponent"}>
          <Badge
            sx={{
              "& .MuiBadge-badge": {
                fontSize: 18,
                height: 30,
                minWidth: 30,
                borderRadius: 15,
              },
            }}
            badgeContent={<span>{currentHand?.numberOfWonTricks}</span>}
            color={"primary"}
            className={"number-of-won-tricks"}
          >
            <Person
              sx={{
                fontSize: "13em",
                color: "black",
              }}
            />
          </Badge>
          <ConfiguredAvatar config={avatarConfig} />
        </div>
        <div className={"cards"} ref={cardsContainer}>
          {transition(
            (styles, item) =>
              item && (
                <a.div className={"animated-card"} style={styles}>
                  <CardComponent card={item} />
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
