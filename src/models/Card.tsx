/**
 * Card model
 */
class Card {
  id: number
  suit: Suit
  rank: Rank

  constructor(data={}) {
    this.id = null
    this.rank = null
    this.suit = null
    Object.assign(this, data)
  }
}

export default Card