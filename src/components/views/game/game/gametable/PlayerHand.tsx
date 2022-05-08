import React from "react"
import { observer } from "mobx-react-lite"
import { EntityModelParticipation } from "../../../../../generated"
import { iriMatch } from "../../../../../util/iriMatch"
import { useCurrentGame } from "../../../../../hooks/api/useCurrentGame"
import { Person } from "@mui/icons-material"
import "./PlayerHand.scss"
import cardBack from "../../../../../img/card-backside.png"

export type PlayerHandProps = {
  participation: EntityModelParticipation
  className: string
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
        <div className={"cards"}>
          {notPlayedCards.map((card) => (
            <img
              key={card._links.self.href}
              src={cardBack}
              alt="card_back_image"
            />
          ))}
        </div>
      </div>
    </div>
  )
})
