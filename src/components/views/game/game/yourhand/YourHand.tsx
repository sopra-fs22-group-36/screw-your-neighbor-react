import React, { useState } from "react"
import { useCards } from "../../../../../hooks/api/useCards"
import { useCurrentGame } from "../../../../../hooks/api/useCurrentGame"
import { CardComponent } from "../../../../ui/CardComponent"
import "./YourHand.scss"

export const YourHand = () => {
  const { updatecards } = useCards()
  const { activeMatch, yourActiveHand } = useCurrentGame()
  const [opacity, setOpacity] = useState(10)

  const notYetPlayed =
    yourActiveHand?.cards.filter((value) => value.round === null) ?? []

  const clickCard = async (card, number) => {
    setOpacity(number)
    updatecards(card)
  }

  return (
    <div className="your-hand">
      <p>These are the Cards for Match {activeMatch?.matchNumber}:</p>
      {notYetPlayed.map((card, index) => (
        <div
          style={{
            backgroundColor: opacity === index ? "#0b97c4" : "#006666",
          }}
          key={card._links.self.href}
        >
          <CardComponent card={card} onClick={() => clickCard(card, index)} />
        </div>
      ))}
    </div>
  )
}
