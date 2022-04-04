import { PlayerStore } from "./PlayerStore"
import { action, makeAutoObservable, observable } from "mobx"
import { GamesStore } from "./GamesStore"
import { CurrentGameStore } from "./CurrentGameStore"

export class AppStore {
  @observable errorMessage?: string
  readonly playerStore = new PlayerStore()
  readonly gamesStore = new GamesStore()
  readonly currentGameStore = new CurrentGameStore()

  constructor() {
    makeAutoObservable(this)
  }

  @action
  setErrorMessage(value: string | null) {
    this.errorMessage = value
  }
}
