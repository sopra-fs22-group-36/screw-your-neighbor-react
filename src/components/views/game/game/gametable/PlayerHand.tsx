import React from "react"
import { EntityModelParticipation } from "../../../../../generated"
import "./PlayerHand.scss"
import cardBack from "../../../../../img/card-backside.png"

export type PlayerHandProps = {
  participation: EntityModelParticipation
  className: string
}

export const PlayerHand = (props: PlayerHandProps) => {
  if (!props.participation) {
    return <></>
  }
  const playerName = props.participation.player.name
  return (
    <div className={`player-hand ${props.className}`}>
      <h3>Here comes the hand of {playerName}</h3>
      <img src={cardBack} alt="card_back_image" />
      <img src={cardBack} alt="card_back_image" />
      <img src={cardBack} alt="card_back_image" />
      <img src={cardBack} alt="card_back_image" />
      <img src={cardBack} alt="card_back_image" />
    </div>
  )
}
