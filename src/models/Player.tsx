/**
 * Player model
 */
class Player {
  id: number
  name: string
  sessionID: number

  constructor(data = {}) {
    this.id = null
    this.name = null
    this.sessionID = null
    Object.assign(this, data)
  }
}

export default Player
