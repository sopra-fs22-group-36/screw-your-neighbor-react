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
      <div>
        <BaseContainer>
          <h2 style={{ margin: "0px 0px 10px" }}> Playerlist </h2>
          <div className={"roominfobackground"}>
            {activeParticipations.map((value, index) => (
              <li style={{ fontSize: "larger" }} key={index}>
                {value.player.name}
              </li>
            ))}
          </div>
        </BaseContainer>
      </div>
    </Tooltip>
  )
})
