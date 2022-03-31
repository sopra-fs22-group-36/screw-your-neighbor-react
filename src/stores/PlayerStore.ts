import { EntityModelPlayer } from "../generated"
import { action, makeObservable, observable } from "mobx"

export class PlayerStore {
  @observable me: EntityModelPlayer
  @observable players: Array<EntityModelPlayer>
  private _playersSubscription?: NodeJS.Timer

  constructor() {
    this.me = null
    this.players = []
    makeObservable(this)
  }

  @action
  setMe(player?: EntityModelPlayer) {
    this.me = player
  }

  @action
  setPlayers(players: Array<EntityModelPlayer>) {
    this.players = players
  }

  set playersSubscription(value: NodeJS.Timer) {
    if (this._playersSubscription) {
      clearInterval(value)
      return
    }
    this._playersSubscription = value
  }

  clearPlayerSubscription() {
    clearInterval(this._playersSubscription)
    this._playersSubscription = null
  }
}
