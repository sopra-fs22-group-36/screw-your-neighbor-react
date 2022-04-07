import { useApi } from "./useApi"
import { useState } from "react"
import { getDomain } from "../../api/api"

export function useCards() {
  const { request, wrapApiCall, cardEntityController } = useApi()
  // const [loading, setLoading] = useState(false)
  const [cards, setCards] = useState([])

  const getcards = async () => {
    const cardlist = await wrapApiCall(
      cardEntityController.getCollectionResourceCardGet1() //This get function is already defined in our cardEntityController - Can we also use this for PATCH?
    )
    const list_cards = cardlist._embedded.cards //Get JUST the cards
    setCards(list_cards) //update cards
    return list_cards
  }
  const updatecards = async (card) => {
    //Make a patch request
    wrapApiCall(
      request.request({
        method: "PATCH",
        url: card._links.self.href.replace(getDomain(), ""), //Remove the Host from the url, otherwise it would be double
        body: { cardRank: "ACE" }, //What gets changed
      })
    )
  }

  return {
    //The things we return/expose
    cards,
    getcards,
    updatecards,
  }
}
