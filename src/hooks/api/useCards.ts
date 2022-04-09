import { useApi } from "./useApi"
import { useState } from "react"
import { getDomain } from "../../api/api"

export function useCards() {
  const { request, wrapApiCall, cardEntityController } = useApi()
  const [cards, setCards] = useState([])

  const getcards = async () => {
    const cardlist = await wrapApiCall(
      cardEntityController.getCollectionResourceCardGet1()
    )
    const list_cards = cardlist._embedded.cards //Get JUST the cards
    setCards(list_cards) //update cards
    return list_cards
  }
  const updatecards = async (card) => {
    const template = card._links.self.href.replace(getDomain(), "")
    const patchUrl = template.replace("{?projection}", "")
    wrapApiCall(
      request.request({
        method: "PATCH",
        url: patchUrl, //Remove the Host from the url, otherwise it would be double
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
