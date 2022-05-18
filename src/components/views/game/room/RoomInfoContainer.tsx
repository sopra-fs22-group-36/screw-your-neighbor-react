import React from "react"
import { observer } from "mobx-react-lite"
import { useCurrentGame } from "../../../../hooks/api/useCurrentGame"
import Button from "@mui/material/Button"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import { Tooltip } from "@mui/material"
import RulesButton from "../../../ui/RulesButton"
import BaseContainer from "../../../ui/BaseContainer"
import "./Room.scss"

export const RoomInfoContainer = observer(() => {
  const { game, activeParticipations, id } = useCurrentGame()
  const playerCount = activeParticipations?.length || 0
  const inviteLink = `${window.location.host}/joinGame/${id}`

  return (
    <BaseContainer>
      <h2 style={{ margin: "5px" }}> Room Info </h2>
      <div className={"roominfobackground"}>
        <div> This is room: {game.name}</div>
        <div> Current player count: {playerCount} </div>
        <div style={{ marginTop: "20%" }}>
          <Tooltip
            title={"send this invite-link to people who you want to play with!"}
            arrow={true}
            placement={"bottom"}
          >
            <Button
              onClick={() => {
                navigator.clipboard.writeText(inviteLink)
              }}
              variant="contained"
              endIcon={<ContentCopyIcon />}
            >
              Copy invite Link
            </Button>
          </Tooltip>
        </div>
        <div style={{ marginTop: "20%" }}>
          Don't know the rules?
          <RulesButton style={{ color: "white" }}></RulesButton>
        </div>
      </div>
    </BaseContainer>
  )
})
