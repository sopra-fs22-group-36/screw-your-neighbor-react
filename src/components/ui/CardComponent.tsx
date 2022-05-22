import React, { MouseEventHandler, useState } from "react"
import { Card, Match } from "../../generated"
import "./CardComponent.scss"
import requireContext from "require-context.macro"
import { useCurrentGame } from "../../hooks/api/useCurrentGame"
import cardBack from "../../img/card-backside.png"
import { AvatarConfig } from "../../hooks/useParticipationAvatars"
import { ConfiguredAvatar } from "./ConfiguredAvatar"

export type CardComponentProps = {
  card: Card
  onClick?: MouseEventHandler<HTMLDivElement>
  stylePlaying?: string
  avatarConfig?: AvatarConfig
}

//Store all cards from a deck in the dict cards
const cards = importAll(requireContext("../../img/deck/", false, /\.png$/))

//Import all images from a directory
function importAll(r) {
  const images = {}
  r.keys().map((item) => (images[item.replace("./", "")] = r(item)))
  return images
}

//Combine card name from rank and suit for find in the storage /img/deck
cards["backside"] = cardBack
function findCard(rank?: Card.cardRank, suit?: Card.cardSuit): string {
  if (!rank || !suit) {
    return "backside"
  }
  let cardName = ""
  let cardSuit = ""
  if (Card.cardSuit.CLUB === suit) cardSuit = "schellen"
  if (Card.cardSuit.DIAMOND === suit) cardSuit = "schilten"
  if (Card.cardSuit.HEART === suit) cardSuit = "rosen"
  if (Card.cardSuit.SPADE === suit) cardSuit = "eichel"
  cardName = cardSuit.concat(rank.toString(), ".png")
  return cardName
}

function timeout(delay: number) {
  return new Promise((res) => setTimeout(res, delay))
}

export const CardComponent = (props: CardComponentProps) => {
  const [isPlayed, setIsPlayed] = useState(false)
  const { activeMatch } = useCurrentGame()

  const onClick = props.onClick ?? (() => ({}))

  const stylePlaying = props.stylePlaying ?? "card-component"

  const clickCard = async (e) => {
    if (activeMatch.matchState === Match.matchState.PLAYING) {
      setIsPlayed(true)
      await timeout(300)
    }
    onClick(e)
  }

  return (
    <div
      className={stylePlaying + (isPlayed ? " moving" : "")}
      onClick={clickCard}
    >
      {props.avatarConfig && <ConfiguredAvatar config={props.avatarConfig} />}
      <div className={"img-div"}>
        <img
          src={cards[findCard(props.card.cardRank, props.card.cardSuit)]}
          alt="card"
        />
      </div>
    </div>
  )
}
