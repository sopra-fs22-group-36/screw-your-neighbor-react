import Participation from "./Participation"
import Card from "./Card"

/**
 * Hand model
 */
class Hand {
  participation: Participation
  cards: Array<Card>

  constructor(data = {}) {
    this.cards = null
    this.participation = null
    Object.assign(this, data)
  }
}

export default Hand
