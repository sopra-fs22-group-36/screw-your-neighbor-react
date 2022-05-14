import React from "react"
import { observer } from "mobx-react-lite"
import { useCurrentGame } from "../../../../hooks/api/useCurrentGame"
import "../../../ui/BaseContainer.scss"
import { Tooltip } from "@mui/material"

export const RoomPlayerContainer = observer(() => {
  const { activeParticipations } = useCurrentGame()

  return (
    <Tooltip
      title={"Here you can see the people who you will play against"}
      placement={"top"}
      arrow={true}
    >
      <div className={"room-player-container"}>
        <h2 className="playerPanel"> Playerlist </h2>
        {activeParticipations.map((value, index) => (
          <li key={index}>{value.player.name}</li>
        ))}
      </div>
    </Tooltip>
  )
})
