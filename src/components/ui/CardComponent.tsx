import { number } from "prop-types"
import React, { MouseEventHandler } from "react"
import { Card } from "../../generated"
import "./CardComponent.scss"
import eichelAss from "../../img/deck/eichelAss.png"

export type CardComponentProps = {
  card: Card
  onClick?: MouseEventHandler<HTMLDivElement>
}

function findCard (rank: Card.cardRank, suit: Card.cardSuit): string {
  let cardName = ""
  if (Card.cardSuit.CLUB === suit)
    cardName = "schellen"
  if (Card.cardSuit.DIAMOND === suit)
    cardName = "schilten"
  if (Card.cardSuit.HEART === suit)
    cardName = "rosen"
  if (Card.cardSuit.SPADE === suit)
    cardName = "eichel"
  cardName.concat(rank.toString(), ".png")
  return cardName
}

export const CardComponent = (props: CardComponentProps) => {
  const onClick = props.onClick ?? (() => ({}))
  return (
    <div className="card-component" onClick={onClick}>
      <div>
        <img src={eichelAss} />
        {props.card.cardRank} of {props.card.cardSuit}
      </div>
    </div>
  )
}
