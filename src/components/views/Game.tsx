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
import ScoreAnnouncing from "../ui/ScoreAnnouncing"

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
  const [played, setPlayed] = useState([])

  const clickLeave = async () => {
    await leaveGame()
    navigate(Paths.LOBBY)
  }

  const updateAll = async (card) => {
    // make patch request and add cards to list of played cards
    //IN THE FINAL VERISON: remove card from hand
    updatecards(card)

    const name = `${card.cardRank} of ${card.cardSuit}` //To avoid being able to play the same card multiple times
    if (!played.includes(name)) {
      updateCardPlayed(name)
    }
  }
  const updateCardPlayed = async (name) => {
    //Add card to the list of played cards
    const newArr = [...played]
    const index = played.length
    newArr[index] = name
    setPlayed(newArr)
  }

  useEffect(() => {
    //Gets the cards at the beginning
    getcards()
  })

  let content = <div>No cards..</div>
  if (cards.length > 0) {
    content = (
      <div className="cardbox">
        {cards.map((card) => (
          <div
            key={card._links.self.href}
            onClick={() => updateAll(card)}
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

  let playedcontent = <div>No cards played..</div> //Display the cards that were played
  if (played.length > 0) {
    playedcontent = (
      <div className="cardbox">
        {played.map((playedcard, index) => (
          <div
            style={{
              backgroundColor: "#ff82ab",
            }}
            key={index}
            className="cards"
          >
            <div>{playedcard}</div>
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
        <br />
        <h3>You have played the following cards:</h3>
        {playedcontent}
        <Button
          disabled={loading}
          variant="contained"
          endIcon={<Login />}
          onClick={clickLeave}
        >
          Leave
        </Button>
        <p></p>
        <ScoreAnnouncing />
      </BaseContainer>
    </div>
  )
})

export default Game
