import React from "react"
import { observer } from "mobx-react-lite"
import { useCurrentGame } from "../../../../hooks/api/useCurrentGame"
import Button from "@mui/material/Button"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import { Tooltip } from "@mui/material"

export const RoomInfoContainer = observer(() => {
  const { game, activeParticipations, id } = useCurrentGame()
  const playerCount = activeParticipations?.length || 0
  const inviteLink = `${window.location.host}/joinGame/${id}`

  return (
    <div className={`room-info-container`}>
      <h2 className="infoPanel"> Room Info </h2>
      <div> This is room: {game.name}</div>
      <div> Current player count: {playerCount} </div>
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
  )
})
