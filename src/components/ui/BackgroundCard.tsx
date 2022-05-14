import React, { MouseEventHandler, useState } from "react"
import { Card, Match } from "../../generated"
import "./CardComponent.scss"
import { useCurrentGame } from "../../hooks/api/useCurrentGame"
import cardBack from "../../img/card-backside.png"

export type BackgroundCardProps = {
  card: Card
  stylePlaying?: string
  onClick?: MouseEventHandler<HTMLDivElement>
}

export const BackgroundCard = (props: BackgroundCardProps) => {
  const { activeMatch } = useCurrentGame()
  const [played, setPlayed] = useState(false)

  const onClick = props.onClick ?? (() => ({}))

  const stylePlaying = props.stylePlaying ?? "card-component"

  const clickCard = async (e) => {
    if (activeMatch.matchState === Match.matchState.PLAYING) {
      setPlayed(true)
    }
    onClick(e)
  }
  //TODO: FIND REAL HEIGHT OF THE "NORMAL CARDS"
  return (
    <div
      onClick={clickCard}
      className={stylePlaying + (played ? " moving" : "")}
    >
      <div>
        <img src={cardBack} alt="card_back_image" style={{ height: "200px" }} />
      </div>
    </div>
  )
}
