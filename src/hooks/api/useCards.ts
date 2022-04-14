import { useApi } from "./useApi"
import { useState } from "react"
import { getDomain } from "../../api/api"
import { Card } from "../../generated"

const cardRank = Card.cardRank

export function useCards() {
  const { request, wrapApiCall } = useApi()
  const [cards] = useState([])

  const updatecards = async (card) => {
    const template = card._links.self.href.replace(getDomain(), "")
    const patchUrl = template.replace("{?projection}", "")
    wrapApiCall(
      request.request({
        method: "PATCH",
        url: patchUrl, //Remove the Host from the url, otherwise it would be double
        body: { cardRank: cardRank.ACE }, //What gets changed -> Need way to change round
      })
    )
  }

  return {
    //The things we return/expose
    cards,
    updatecards,
  }
}
