import React, { MouseEventHandler, useState } from "react"
import { Card, Match } from "../../generated"
import "./CardComponent.scss"
import { useCurrentGame } from "../../hooks/api/useCurrentGame"
import cardBack from "../../img/card-backside.png"

export type BackgroundCardProps = {
  card: Card
  onClick?: MouseEventHandler<HTMLDivElement>
  stylePlaying?: string
}

function timeout(delay: number) {
  return new Promise((res) => setTimeout(res, delay))
}

export const BackgroundCard = (props: BackgroundCardProps) => {
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
  //TODO: FIND REAL HEIGHT OF THE "NORMAL CARDS"
  return (
    <div
      className={stylePlaying + (isPlayed ? " moving" : "")}
      onClick={clickCard}
    >
      <div>
        <img src={cardBack} alt="card_back_image" style={{ height: "200px" }} />
      </div>
    </div>
  )
}
