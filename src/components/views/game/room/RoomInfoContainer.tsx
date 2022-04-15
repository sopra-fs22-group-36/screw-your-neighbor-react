import React from "react"
import { observer } from "mobx-react-lite"
import { useCurrentGame } from "../../../../hooks/api/useCurrentGame"
import Button from "@mui/material/Button"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"

export const RoomInfoContainer = observer(() => {
  const { game, activeParticipations } = useCurrentGame()
  const playerCount = activeParticipations?.length || 0

  return (
    <div className={`room-info-container`}>
      <h2 className="infoPanel"> Room Info </h2>
      <div> This is room: {game.name}</div>
      <div> Current player count: {playerCount} </div>
      <div> Creation Date: 07.04.2022 </div>
      <Button variant="contained" endIcon={<ContentCopyIcon />}>
        Copy invite Link
      </Button>
    </div>
  )
})
