import Match from "./Match"
import Participation from "./Participation"

/**
 * ScoreAnnouncement model
 */
class ScoreAnnouncement {
  id: number
  announcedScore: number
  participation: Participation
  match: Match

  constructor(data = {}) {
    this.id = null
    this.announcedScore = null
    this.participation = null
    this.match = null
    Object.assign(this, data)
  }
}

export default ScoreAnnouncement
