import React from "react"
import { observer } from "mobx-react-lite"
import { useCurrentGame } from "../../../../hooks/api/useCurrentGame"
import "../../../ui/BaseContainer.scss"
import { Tooltip } from "@mui/material"
import BaseContainer from "../../../ui/BaseContainer"

export const RoomPlayerContainer = observer(() => {
  const { activeParticipations } = useCurrentGame()

  return (
    <Tooltip
      title={"Here you can see the people who you will play against"}
      placement={"top"}
      arrow={true}
    >
      <div className={"room-playerDiv"}>
        <h2 className="playerPanel"> Playerlist </h2>
        {activeParticipations.map((value, index) => (
          <li className="room-individualPlayer" key={index}>
            {value.player.name}
          </li>
        ))}
      </div>
    </Tooltip>
  )
})
