import React from "react"
import { useCards } from "../../../../../hooks/api/useCards"
import { useCurrentGame } from "../../../../../hooks/api/useCurrentGame"
import { CardComponent } from "../../../../ui/CardComponent"
import "./YourHand.scss"
import { toJS } from "mobx" //DEBUGGING - REMOVE LATER

export const YourHand = () => {
  const { updatecards } = useCards()
  const { activeMatch, yourActiveHand, activeRound } = useCurrentGame()

  const notYetPlayed =
    yourActiveHand?.cards.filter((value) => value.round === null) ?? []

  const clickCard = async (card, number) => {
    updatecards(card)
    console.log(toJS(activeRound.cards)) //DEBUGGING - REMOVE LATER
  }

  return (
    <div className="your-hand">
      <p style={{ marginLeft: "10px" }}>
        These are the Cards for Match {activeMatch?.matchNumber} Round{" "}
        {activeMatch?.rounds.length}:
      </p>
      {notYetPlayed.map((card, index) => (
        <div key={card._links.self.href}>
          <CardComponent card={card} onClick={() => clickCard(card, index)} />
        </div>
      ))}
    </div>
  )
}
