import Player from "./Player"
import Match from "./Match"

/**
 * Game model
 */
class Game {
  id: number
  name: string
  state: GameState
  players: Array<Player>
  matches: Array<Match>

  constructor(data = {}) {
    this.id = null
    this.name = null
    this.state = null
    this.players = null
    this.matches = null
    Object.assign(this, data)
  }
}

export default Game
