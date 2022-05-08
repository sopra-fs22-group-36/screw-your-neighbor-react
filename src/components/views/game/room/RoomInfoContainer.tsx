import React from "react"
import { observer } from "mobx-react-lite"
import { useCurrentGame } from "../../../../hooks/api/useCurrentGame"
import Button from "@mui/material/Button"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import {useGames} from "../../../../hooks/api/useGames";

export const RoomInfoContainer = observer(() => {
  const { game, activeParticipations, id } = useCurrentGame()
  const { games } = useGames()
  const playerCount = activeParticipations?.length || 0
  const ID = id
  const inviteLink = `localhost:3000/joinGame/${ID}`


  return (
    <div className={`room-info-container`}>
      <h2 className="infoPanel"> Room Info </h2>
      <div> This is room: {game.name}</div>
      <div> Current player count: {playerCount} </div>
      <Button  onClick={ () =>  {navigator.clipboard.writeText(inviteLink)}}>
        Copy invite Link
      </Button>
    </div>
  )
})
