import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { useCurrentGame } from "../../hooks/api/useCurrentGame"
import "../../styles/ui/BaseContainer.scss"

export const RoomPlayerContainer = observer(() => {
  const { startPollGame, activeParticipations } = useCurrentGame()

  useEffect(() => {
    const gameSubscription = startPollGame()
    return () => gameSubscription.cancel()
  })

  return (
    <div className={"room-player-container"}>
      <h2 className="playerPanel"> Playerlist </h2>
      {activeParticipations.map((value, index) => (
        <li key={index}>{value.player.name}</li>
      ))}
    </div>
  )
})
