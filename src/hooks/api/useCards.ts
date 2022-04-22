import { useApi } from "./useApi"
import { useState } from "react"
import { useCurrentGame } from "./useCurrentGame"
import { toIri } from "../../util/toIri"

export function useCards() {
  const { request, wrapApiCall } = useApi()
  const { activeRound } = useCurrentGame()
  const [cards] = useState([])

  const updatecards = async (card) => {
    const round = toIri(activeRound._links.self)
    wrapApiCall(
      request.request({
        method: "PATCH",
        url: toIri(card._links.self),
        body: { round: round },
      })
    )
  }
  return {
    //The things we return/expose
    cards,
    updatecards,
  }
}
