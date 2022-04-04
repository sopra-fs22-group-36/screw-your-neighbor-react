import { action, makeAutoObservable, observable } from "mobx"
import { EntityModelGame } from "../generated"
import { KeepOnlyOneInterval } from "../util/KeepOnlyOneInterval"

export class GamesStore {
  @observable games: Array<EntityModelGame> = []
  readonly gamesSubscriptions = new KeepOnlyOneInterval()

  constructor() {
    makeAutoObservable(this)
  }

  @action
  setGames(games: Array<EntityModelGame>) {
    this.games = games
  }
}
