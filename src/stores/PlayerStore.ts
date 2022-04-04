import { EntityModelPlayer } from "../generated"
import { action, makeObservable, observable } from "mobx"
import { KeepOnlyOneInterval } from "../util/KeepOnlyOneInterval"

export class PlayerStore {
  @observable me: EntityModelPlayer
  @observable players: Array<EntityModelPlayer>
  private _playersSubscriptions = new KeepOnlyOneInterval()

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

  get playersSubscriptions(): KeepOnlyOneInterval {
    return this._playersSubscriptions
  }
}
