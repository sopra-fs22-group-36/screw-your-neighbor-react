import React, { MouseEventHandler } from "react"
import { Card } from "../../generated"
import "./CardComponent.scss"

export type CardComponentProps = {
  card: Card
  onClick?: MouseEventHandler<HTMLDivElement>
}

//Store all cards from a deck in the dict cards
const cards = importAll(require.context("../../img/deck/", false, /\.png$/))

//Import all images from a directory
function importAll(r) {
  const images = {}
  r.keys().map((item) => (images[item.replace("./", "")] = r(item)))
  return images
}

//Combine card name from rank and suit for find in the storage /img/deck
function findCard(rank: Card.cardRank, suit: Card.cardSuit): string {
  let cardName = ""
  let cardSuit = ""
  if (Card.cardSuit.CLUB === suit) cardSuit = "schellen"
  if (Card.cardSuit.DIAMOND === suit) cardSuit = "schilten"
  if (Card.cardSuit.HEART === suit) cardSuit = "rosen"
  if (Card.cardSuit.SPADE === suit) cardSuit = "eichel"
  cardName = cardSuit.concat(rank.toString(), ".png")
  return cardName
}

export const CardComponent = (props: CardComponentProps) => {
  const onClick = props.onClick ?? (() => ({}))
  return (
    <div className="card-component" onClick={onClick}>
      <div>
        <img
          src={cards[findCard(props.card.cardRank, props.card.cardSuit)]}
          alt="card"
        />
      </div>
    </div>
  )
}
