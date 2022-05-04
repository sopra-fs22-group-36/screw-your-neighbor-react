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

  @computed get lastRound() {
    if (this.sortedRoundsOfActiveMatch.length === 0) {
      return null
    }
    return this.sortedRoundsOfActiveMatch.slice(-2)[0]
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

  //Calculate if only one player, exactlly the last one has to announce the tricks
  @computed get isLastPlayerAnnouncing() {
    let nullValues = 0
    this.activeMatch?.hands.forEach(
      (el) => el.announcedScore === null ?? (nullValues += nullValues + 1)
    )
    if (nullValues === 1) return true
    else return false
  }

  //Count the value for all announced scores so far
  @computed get sumOfAnnouncedScores() {
    let value = 0
    this.activeMatch?.hands.forEach((el) => (value += el.announcedScore))
    return value
  }
}
