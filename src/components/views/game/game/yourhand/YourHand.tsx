import React from "react"
import { useCards } from "../../../../../hooks/api/useCards"
import { useCurrentGame } from "../../../../../hooks/api/useCurrentGame"
import { CardComponent } from "../../../../ui/CardComponent"
import "./YourHand.scss"
import { observer } from "mobx-react-lite"

export const YourHand = observer(() => {
  const { updatecards } = useCards()
  const { activeMatch, yourActiveHand } = useCurrentGame()

  const notYetPlayed =
    yourActiveHand?.cards.filter((value) => value.round === null) ?? []

  const clickCard = async (card, number) => {
    setTimeout(() => updatecards(card), 600)
  }

  return (
    <div className="your-hand">
      <p style={{ marginLeft: "10px" }}>
        These are the Cards for Match {activeMatch?.matchNumber} Round
        {activeMatch?.rounds.length}:
      </p>
      {notYetPlayed.map((card, index) => (
        <div key={card._links.self.href}>
          <CardComponent card={card} onClick={() => clickCard(card, index)} />
        </div>
      ))}
    </div>
  )
})
