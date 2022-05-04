import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import React, { useState } from "react"
import { Match } from "../../../../../generated"
import { useCards } from "../../../../../hooks/api/useCards"
import { useCurrentGame } from "../../../../../hooks/api/useCurrentGame"
import { CardComponent } from "../../../../ui/CardComponent"
import "./YourHand.scss"
import { observer } from "mobx-react-lite"
import { useIdleTimer } from "react-idle-timer"

export const YourHand = observer(() => {
  const timeout = 9500 //Test how much time actual players need for a decision
  const [playerTimeout, setPlayerTimeout] = useState(false)
  const onIdle = () => {
    setPlayerTimeout(true)
  }
  const onActive = (event) => {
    console.log("active")
  }
  useIdleTimer({ timeout, onIdle, onActive })

  //-------
  const { updatecards } = useCards()
  const { activeMatch, yourActiveHand } = useCurrentGame()
  const [wrongTurn, setWrongTurn] = useState(false)
  const notYetPlayed =
    yourActiveHand?.cards.filter((value) => value.round === null) ?? []

  //Check if all players did the score announcement for this match
  const clickCard = async (card) => {
    if (activeMatch.matchState === Match.matchState.PLAYING) {
      if (yourActiveHand?.turnActive) {
        updatecards(card)
        setPlayerTimeout(false)
      } else {
        setWrongTurn(true)
      }
    }
  }

  // Close dialog
  const handleCloseTurn = () => {
    setWrongTurn(false)
  }

  const handleCloseTimeout = () => {
    setPlayerTimeout(false)
  }

  let content = <></>
  let timeouted = <></>

  if (playerTimeout && yourActiveHand?.turnActive) {
    timeouted = (
      <Dialog
        open={playerTimeout}
        onClose={handleCloseTimeout}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          "HEY! Are you still here?"
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please do something! The other players are waiting!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTimeout} autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  // Inform the player that they cannot play the card because it's not their turn yet
  if (wrongTurn) {
    content = (
      <Dialog
        open={wrongTurn}
        onClose={handleCloseTurn}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          "Hold your horses! It's not your turn yet!"
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are trying to play a card when it's not even your turn yet!
            Please wait a bit..
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTurn} autoFocus>
            Ok..
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  return (
    <div className="your-hand">
      <p>These are the Cards for Match {activeMatch?.matchNumber}:</p>
      {notYetPlayed.map((card) => (
        <div key={card._links.self.href}>
          <CardComponent card={card} onClick={() => clickCard(card)} />
        </div>
      ))}
      {content}
      {timeouted}
    </div>
  )
})
