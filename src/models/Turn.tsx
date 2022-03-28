import Round from "./Round"
import Card from "./Card"

/**
 * Turn model
 */
class Turn {
  id: number
  round: Round
  card: Card

  constructor(data={}) {
    this.id = null
    this.round = null
    this.card = null
    Object.assign(this, data)
  }
}

export default Turn
