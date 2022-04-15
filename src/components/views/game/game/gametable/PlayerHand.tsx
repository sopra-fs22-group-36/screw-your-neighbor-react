import React from "react"
import { EntityModelParticipation } from "../../../../../generated"
import "./PlayerHand.scss"

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
    </div>
  )
}
