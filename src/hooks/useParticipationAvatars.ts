import { Participation } from "../generated"
import { useCurrentGame } from "./api/useCurrentGame"

const shortHandLength = 2

export type AvatarConfig = {
  shortHand: string
  hue: number
}

export function useParticipationAvatars() {
  const { game } = useCurrentGame()

  const shortHandMap = {}
  const usedShortHands = {}

  let zzFallbacks = 0

  const participations = game.participations
  for (const participation of participations) {
    let shortHandString = ""
    shortHandString = createShortHandFromLetters(
      usedShortHands,
      shortHandMap,
      participation
    )
    if (!shortHandMap[participation._links.self.href]) {
      resolveShortHandConflictsWithNumbers(
        shortHandString,
        usedShortHands,
        shortHandMap,
        participation
      )
    }
    if (!shortHandMap[participation._links.self.href]) {
      const zzFallBack = "ZZ" + zzFallbacks++
      usedShortHands[zzFallBack] = true
      shortHandMap[participation._links.self.href] = zzFallBack
    }
  }

  const getAvatarConfigFor = (participation: Participation): AvatarConfig => {
    const shortHand = shortHandMap[participation._links.self.href]
    const length = participations.length || 1
    //only allow hue between 40 and 360, because 0 - 40 contain red tones
    const hue = 40 + (participation.participationNumber / length) * 320
    return {
      shortHand,
      hue,
    }
  }

  return {
    getAvatarConfigFor,
  }
}

function createShortHandFromLetters(
  usedShortHands: Record<string, boolean>,
  shortHandMap: Record<string, string>,
  participation: Participation
) {
  let shortHandString = ""
  const trimmed = participation.player.name.trim()
  for (let i = 0; i < shortHandLength; i++) {
    shortHandString += trimmed.charAt(i)
    if (!usedShortHands[shortHandString]) {
      usedShortHands[shortHandString] = true
      shortHandMap[participation._links.self.href] = shortHandString
      break
    }
  }
  return shortHandString
}

function resolveShortHandConflictsWithNumbers(
  shortHandString: string,
  usedShortHands: Record<string, boolean>,
  shortHandMap: Record<string, string>,
  participation: Participation
) {
  const firstLetter = shortHandString.substring(0, 1)
  for (let i = 1; i < 10; i++) {
    const shortHandStringWithNumber = firstLetter + i
    if (!usedShortHands[shortHandStringWithNumber]) {
      usedShortHands[shortHandStringWithNumber] = true
      shortHandMap[participation._links.self.href] = shortHandStringWithNumber
      break
    }
  }
}
