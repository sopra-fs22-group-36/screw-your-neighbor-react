import React from "react"
import { useCurrentGame } from "../../../../hooks/api/useCurrentGame"
import trophy from "../../../../img/winnerwinnerchickendinner.png"
import lost from "../../../../img/betterluck.png"
import "./WinnersPodium.scss"
import { usePlayers } from "../../../../hooks/api/usePlayers"
import { Tooltip } from "@mui/material"
import BaseContainer from "../../../ui/BaseContainer"

export const WinnersPodium = () => {
  const { activeParticipations } = useCurrentGame()
  const { me } = usePlayers()
  const sortedPlayers =
    activeParticipations.slice().sort((a, b) => b.points - a.points) ?? []

  let imageURL = ""
  if (sortedPlayers[0].player.name === me.name)
    imageURL = trophy //change to link later - for now it's alright
  else imageURL = lost
  const styling = imageURL === trophy ? "trophy-win" : "trophy-loss"

  return (
    <div className={"winners-podium"}>
      <BaseContainer>
        <h1>ScoreBoard</h1>
        <ol className={"gameSummary-individual-playerlist"}>
          {sortedPlayers.map((participation) => {
            return (
              <li key={participation._links.self.href}>
                <span className={"player-name"}>
                  {participation.player.name}
                </span>
                <span className={"points"}>Points: {participation.points}</span>
              </li>
            )
          })}
        </ol>
        <Tooltip
          title={
            imageURL === trophy
              ? "Congratulation! you won!"
              : "You lost, that's too bad! Try again!"
          }
          arrow={true}
          placement={"right"}
        >
          <img
            id="didYouWin"
            src={imageURL}
            alt="Spielleistung"
            className={styling}
            style={{ width: "40%" }}
          />
        </Tooltip>
      </BaseContainer>
    </div>
  )
}
