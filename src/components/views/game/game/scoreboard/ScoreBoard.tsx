import React from "react"
import { observer } from "mobx-react-lite"
import { useCurrentGame } from "../../../../../hooks/api/useCurrentGame"
import { Participation } from "../../../../../generated"
import { iriMatch } from "../../../../../util/iriMatch"
import BaseContainer from "../../../../ui/BaseContainer"
import { Chip } from "@mui/material"
import "./ScoreBoard.scss"
import { useParticipationAvatars } from "../../../../../hooks/useParticipationAvatars"
import { ConfiguredAvatar } from "../../../../ui/ConfiguredAvatar"

type PlayerRowProps = {
  participation: Participation
}

const PlayerRow = observer((props: PlayerRowProps) => {
  const { participation } = props
  const { activeMatch, myParticipation } = useCurrentGame()
  const { getAvatarConfigFor } = useParticipationAvatars()
  const participationLink = participation?._links.self ?? "participationLink"
  const turnActive =
    activeMatch?.hands
      .filter((hand) =>
        iriMatch(hand.participation._links.self, participationLink)
      )
      .some((hand) => hand.turnActive) ?? false

  const isOwnParticipation = iriMatch(
    participationLink,
    myParticipation?._links.self ?? "myParticipation"
  )

  const avatarConfig = getAvatarConfigFor(participation)

  return (
    <li className={isOwnParticipation ? "own-participation" : ""}>
      <ConfiguredAvatar config={avatarConfig} />
      <span className={"player-name"}>{participation.player.name}</span>
      {turnActive && (
        <Chip
          color={"info"}
          label={"Playing"}
          className={"chip"}
          size={"small"}
        ></Chip>
      )}

      <span className={"points"}>Points: {participation.points}</span>
    </li>
  )
})

export const ScoreBoard = observer(() => {
  const { activeParticipations } = useCurrentGame()

  return (
    <div className={"scoreboard"}>
      <BaseContainer>
        <h1>ScoreBoard</h1>
        <ul className={"player-list"}>
          {activeParticipations.map((participation) => {
            return (
              <PlayerRow
                key={participation._links.self.href}
                participation={participation}
              />
            )
          })}
        </ul>
      </BaseContainer>
    </div>
  )
})
