import Round from "./Round"
import Hand from "./Hand"
import ScoreAnnouncement from "./ScoreAnnouncement"

/**
 * Match model
 */
class Match {
  id: number
  matchNumber: string
  numberOfPlayedCards: number
  scoreAnnouncements: Array<ScoreAnnouncement>
  rounds: Array<Round>
  hands: Array<Hand>

  constructor(data = {}) {
    this.id = null
    this.matchNumber = null
    this.numberOfPlayedCards = null
    this.rounds = null
    this.hands = null
    Object.assign(this, data)
  }
}

export default Match
