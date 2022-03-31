import { PlayerStore } from "./PlayerStore"
import { action, makeAutoObservable, observable } from "mobx"

export class AppStore {
  @observable errorMessage?: string
  readonly playerStore = new PlayerStore()

  constructor() {
    makeAutoObservable(this)
  }

  @action
  setErrorMessage(value: string | null) {
    this.errorMessage = value
  }
}
