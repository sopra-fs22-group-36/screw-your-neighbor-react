import React, { MouseEventHandler } from "react"
import { Card } from "../../generated"
import "./CardComponent.scss"

export type CardComponentProps = {
  card: Card
  onClick?: MouseEventHandler<HTMLDivElement>
}

export const CardComponent = (props: CardComponentProps) => {
  const onClick = props.onClick ?? (() => ({}))
  return (
    <div className="card-component" onClick={onClick}>
      <div>
        {props.card.cardRank} of {props.card.cardSuit}
      </div>
    </div>
  )
}
