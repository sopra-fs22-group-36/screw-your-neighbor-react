import Player from "./Player"
import Game from "./Game"

/**
 * Participation model
 */
class Participation {
  id: number
  active: boolean
  playerOrder: number
  player: Player
  game: Game

  constructor(data = {}) {
    this.id = null
    this.active = null
    this.playerOrder = null
    this.player = null
    this.game = null
    Object.assign(this, data)
  }
}

export default Participation
