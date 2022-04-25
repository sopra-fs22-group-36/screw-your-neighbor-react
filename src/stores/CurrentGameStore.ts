import { action, computed, makeAutoObservable, observable } from "mobx"
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
    if (!this.game) {
      return []
    }
    const entityModelEmbeddedHidden = embedProxy(this.game)
    return entityModelEmbeddedHidden.participations
      .filter((participation) => participation.active)
      .map(embedProxy)
  }

  @computed get sortedMatches() {
    if (!this.game) {
      return []
    }

    return (
      embedProxy(this.game)
        .matches?.slice()
        .sort((a, b) => a.matchNumber - b.matchNumber) ?? []
    )
  }

  @computed get activeMatch() {
    if (this.sortedMatches.length === 0) {
      return null
    }
    return this.sortedMatches.slice(-1)[0]
  }

  @computed get sortedRoundsOfActiveMatch() {
    if (!this.activeMatch) {
      return []
    }
    return this.activeMatch.rounds
      .slice()
      .sort((a, b) => a.roundNumber - b.roundNumber)
  }

  @computed get activeRound() {
    if (this.sortedRoundsOfActiveMatch.length === 0) {
      return null
    }
    return this.sortedRoundsOfActiveMatch.slice(-1)[0]
  }

  @computed get yourActiveHand() {
    if (!this.participation) {
      return null
    }
    const yourHands =
      this.activeMatch?.hands.filter(
        (value) =>
          value.participation._links.self.href ===
          this.participation._links.self.href
      ) ?? []
    if (yourHands.length === 0) {
      return null
    }
    return yourHands.slice(-1)[0]
  }

  @computed get sortedParticipations(){
    if(!this.game) {
      return []
    }


    return (
      embedProxy(this.game)
        .participations.slice()
        .sort((a,b) => b.points - a.points) ?? []
    )

  }
}
