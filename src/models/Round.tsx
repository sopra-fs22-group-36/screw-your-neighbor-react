import Player from "./Player"
import Turn from "./Turn"

/**
 * Round model
 */
class Round {
  id: number
  roundNumber: number
  winner: Player
  turns: Array<Turn>

  constructor(data = {}) {
    this.id = null
    this.roundNumber = null
    this.winner = null
    this.turns = null
    Object.assign(this, data)
  }
}

export default Round
