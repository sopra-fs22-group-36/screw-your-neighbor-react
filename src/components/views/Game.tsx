import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Paths } from "../routing/routers/Paths"
import { usePlayers } from "../../hooks/api/usePlayers"
import { useCurrentGame } from "../../hooks/api/useCurrentGame"
import { useApi } from "../../hooks/api/useApi"
import { appContext } from "../../AppContext"
import { observer } from "mobx-react-lite"
import { Login } from "@mui/icons-material"
import { Button } from "@mui/material"
import BaseContainer from "../ui/BaseContainer"
import { RoomRow } from "../ui/RoomRow"
import "../../styles/ui/Divs.scss"
import { useCards } from "../../hooks/api/useCards"

/**
 * The main game page inside the Jass-Stube includes a table with all players
 * @param props
 * @returns
 */
const Game = observer(() => {
  const navigate = useNavigate()
  const { me } = usePlayers()
  const { loading, game, leaveGame } = useCurrentGame()
  const { cards, getcards, updatecards } = useCards()

  const clickLeave = async () => {
    await leaveGame()
    navigate(Paths.LOBBY)
  }
  useEffect(() => {
    //Gets the cards at the beginning
    getcards()
  })

  let content = <div>No cards..</div>
  if (cards.length > 0) {
    content = (
      <div style={{ display: "inline-block", overflow: "hidden" }}>
        {cards.map((card) => (
          <div
            key={card._links.self.href}
            onClick={() => updatecards(card)}
            className="div-cards"
          >
            <div>
              {card.cardRank} of {card.cardSuit}
            </div>
          </div>
        ))}
      </div>
    )
  } //IMPORTANT: React NEEDS a key when mapping!

  return (
    <BaseContainer>
      <h1>Game page</h1>
      <div>You are {me.name}</div>
      <div>You are in the game {game.name}</div>

      {content}
      <Button
        disabled={loading}
        variant="contained"
        endIcon={<Login />}
        onClick={clickLeave}
      >
        Leave
      </Button>
    </BaseContainer>
  )
})

export default Game
