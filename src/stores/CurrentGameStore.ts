import { action, makeAutoObservable, observable } from "mobx"
import { EntityModelGame, EntityModelParticipation } from "../generated"
import { KeepOnlyOneInterval } from "../util/KeepOnlyOneInterval"

export class CurrentGameStore {
  @observable game?: EntityModelGame
  @observable participation?: EntityModelParticipation
  readonly gameSubscriptions = new KeepOnlyOneInterval()

  constructor() {
    makeAutoObservable(this)
  }

  @action
  setGame(game?: EntityModelGame) {
    this.game = game
  }

  @action
  setParticipation(participation?: EntityModelParticipation) {
    this.participation = participation
  }
}
