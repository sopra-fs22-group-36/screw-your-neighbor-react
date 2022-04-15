import { action, computed, makeAutoObservable, observable, toJS } from "mobx"
import { EntityModelGame, EntityModelParticipation } from "../generated"
import { KeepOnlyOneInterval } from "../util/KeepOnlyOneInterval"
import { embedProxy } from "../util/embedProxy"

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

  @computed get activeParticipations() {
    const entityModelGame = toJS(this.game)
    if (!entityModelGame) {
      return []
    }
    const entityModelEmbeddedHidden = embedProxy(this.game)
    return entityModelEmbeddedHidden.participations
      .filter((participation) => participation.active)
      .map(embedProxy)
  }
}
