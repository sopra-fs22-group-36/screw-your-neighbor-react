import { useApi } from "./useApi"
import { useState } from "react"

export function useCards() {
  const { request, wrapApiCall, cardEntityController } = useApi()
  const [loading, setLoading] = useState(false)
  const [cards, setCards] = useState([])

  const getcards = async () => {
    //Goal is to get a list of cards so that i can make a div or button for each card (that has the name of the card on it) and that when i then click on the card i send a put request to "play it"
    const cardlist = await wrapApiCall(
      cardEntityController.getCollectionResourceCardGet1()
    )

    const list_cards = cardlist._embedded.cards
    setCards(list_cards) //update cards
    return list_cards
  }
  return {
    //was wir exposen
    cards,
    getcards,
  }
}
