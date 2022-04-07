import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Paths } from "../routing/routers/Paths"
import { usePlayers } from "../../hooks/api/usePlayers"
import { useCurrentGame } from "../../hooks/api/useCurrentGame"
import { observer } from "mobx-react-lite"
import { Login } from "@mui/icons-material"
import { Button } from "@mui/material"
import BaseContainer from "../ui/BaseContainer"
import "../../styles/ui/Divs.scss"
import "../../styles/ui/Cards.scss"
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
  const [opacity, setOpacity] = useState(10)

  const clickLeave = async () => {
    await leaveGame()
    navigate(Paths.LOBBY)
  }

  const bothfunctions = async (card, number) => {
    //Change style and make patch request
    //IN THE FINAL VERISON: remove card from hand
    //Also need to remember what card was currently played so that you can place it on the table
    setOpacity(number)
    updatecards(card)
  }

  useEffect(() => {
    //Gets the cards at the beginning
    getcards()
  })

  let content = <div>No cards..</div>
  if (cards.length > 0) {
    content = (
      <div className="cardbox">
        {cards.map((card, index) => (
          <div
            style={{
              backgroundColor: opacity === index ? "#0b97c4" : "#006666",
            }}
            key={card._links.self.href}
            onClick={() => bothfunctions(card, index)}
            className="cards"
          >
            <div>
              {card.cardRank} of {card.cardSuit}
            </div>
          </div>
        ))}
      </div>
    )
  }

  //Game doesn't like it when you refresh the page because of the ".name" - get from backend
  return (
    <div className="div-box">
      <BaseContainer>
        <h1>
          Welcome, {me.name} to Game: {game.name}
        </h1>
        <p>These are the Cards:</p>
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
    </div>
  )
})

export default Game
