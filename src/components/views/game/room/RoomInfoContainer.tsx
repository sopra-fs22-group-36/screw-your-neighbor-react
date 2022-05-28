import React from "react"
import { observer } from "mobx-react-lite"
import { useCurrentGame } from "../../../../hooks/api/useCurrentGame"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import { Tooltip } from "@mui/material"
import RulesButton from "../../../ui/ColorButtons/RulesButton"
import BaseContainer from "../../../ui/BaseContainer"
import "./Room.scss"
import { SecondaryButton } from "../../../ui/ColorButtons/SecondaryButton"

export const RoomInfoContainer = observer(() => {
  const { game, activeParticipations, id } = useCurrentGame()
  const playerCount = activeParticipations?.length || 0
  const inviteLink = `${window.location.host}/joinGame/${id}`

  return (
    <BaseContainer>
      <h2 style={{ margin: "5px" }}> Room Info </h2>
      <div className={"room-info-background"}>
        <div style={{ maxWidth: "150px", wordWrap: "break-word" }}>
          This is room: {game.name}
        </div>
        <div> Current player count: {playerCount} </div>
        <div style={{ marginTop: "20%" }}>
          <Tooltip
            title={"send this invite-link to people who you want to play with!"}
            arrow={true}
            placement={"bottom"}
          >
            <div>
              <SecondaryButton
                action={() => {
                  navigator.clipboard.writeText(inviteLink)
                }}
                endIcon={<ContentCopyIcon />}
              >
                Copy invite Link
              </SecondaryButton>
            </div>
          </Tooltip>
        </div>
        <div style={{ marginTop: "20%" }}>
          Don't know the rules?
          <RulesButton />
        </div>
      </div>
    </BaseContainer>
  )
})
