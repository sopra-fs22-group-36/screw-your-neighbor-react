import Match from "./Match"
import Participation from "./Participation"

/**
 * ScoreAnnouncement model
 */
class ScoreAnnoucement {
  id: number
  announcedScore: number
  participaiton: Participation
  match: Match

  constructor(data = {}) {
    this.id = null
    this.announcedScore = null
    this.participaiton = null
    this.match = null
    Object.assign(this, data)
  }
}

export default ScoreAnnoucement
