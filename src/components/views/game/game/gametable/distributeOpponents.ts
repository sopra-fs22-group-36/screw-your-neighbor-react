import { EntityModelParticipation } from "../../../../../generated"
import { iriMatch } from "../../../../../util/iriMatch"

export type ParticipationSlots = {
  slot1?: EntityModelParticipation
  slot2?: EntityModelParticipation
  slot3?: EntityModelParticipation
  slot4?: EntityModelParticipation
}

export function distributeOpponents(
  me: EntityModelParticipation,
  allParticipations: EntityModelParticipation[]
): ParticipationSlots {
  if (!me || !me._links?.self?.href) {
    throw new Error("me must be defined and have self link")
  }

  const sorted = allParticipations.sort(
    (a, b) => a.participationNumber - b.participationNumber
  )

  let meIndex
  for (const i in sorted) {
    if (iriMatch(sorted[i]._links.self, me._links.self)) {
      meIndex = parseInt(i)
      break
    }
  }

  const sortedAroundMe = []
  for (let i = 0; i < sorted.length - 1; i++) {
    let currentIndex = i + meIndex + 1
    if (currentIndex >= sorted.length) {
      currentIndex = currentIndex - sorted.length
    }
    sortedAroundMe.push(sorted.slice(currentIndex)[0])
  }

  if (sorted.length === 2) {
    return {
      slot3: sortedAroundMe[0],
    }
  }

  if (sorted.length === 3) {
    return {
      slot2: sortedAroundMe[0],
      slot3: sortedAroundMe[1],
    }
  }

  if (sorted.length === 4) {
    return {
      slot2: sortedAroundMe[0],
      slot3: sortedAroundMe[1],
      slot4: sortedAroundMe[2],
    }
  }

  if (sorted.length === 5) {
    return {
      slot1: sortedAroundMe[0],
      slot2: sortedAroundMe[1],
      slot3: sortedAroundMe[2],
      slot4: sortedAroundMe[3],
    }
  }

  return {}
}
