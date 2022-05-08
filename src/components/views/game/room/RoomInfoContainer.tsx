import React from "react"
import { observer } from "mobx-react-lite"
import { useCurrentGame } from "../../../../hooks/api/useCurrentGame"
import Button from "@mui/material/Button"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"



export const RoomInfoContainer = observer(() => {
  const { game, activeParticipations, id } = useCurrentGame()
  const playerCount = activeParticipations?.length || 0
  const inviteLink = `localhost:3000/joinGame/${id}`


  return (
    <div className={`room-info-container`}>
      <h2 className="infoPanel"> Room Info </h2>
      <div> This is room: {game.name}</div>
      <div> Current player count: {playerCount} </div>
      <Button
        //TODO Implement a way that the link (heroku vs localhost) is not hardcoded
        onClick={ () =>  {navigator.clipboard.writeText(inviteLink)}}
        variant="contained"
        endIcon={<ContentCopyIcon />}
        >
        Copy invite Link
      </Button>
    </div>
  )
})
