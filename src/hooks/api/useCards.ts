import { useApi } from "./useApi"
import { useState } from "react"
import { getDomain } from "../../api/api"
import { Card } from "../../generated"
import { useCurrentGame } from "./useCurrentGame"
import { toIri } from "../../util/toIri"

const cardRank = Card.cardRank

export function useCards() {
  const { request, wrapApiCall } = useApi()
  const { game } = useCurrentGame()
  const [cards] = useState([])

  const updatecards = async (card) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const roundnrforcard =
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      toIri(game.matches[0]?.rounds[0]?._links.self)
    const template = card._links.self.href.replace(getDomain(), "")
    const patchUrl = template.replace("{?projection}", "")
    const patchround = roundnrforcard.replace("{?projection}", "")
    wrapApiCall(
      request.request({
        method: "PATCH",
        url: patchUrl,
        body: { round: patchround },
      })
    )
  }
  return {
    //The things we return/expose
    cards,
    updatecards,
  }
}
