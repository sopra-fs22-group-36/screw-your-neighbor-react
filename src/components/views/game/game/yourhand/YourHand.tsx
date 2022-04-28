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

export const YourHand = observer(() => {
  const { updatecards } = useCards()
  const { activeMatch, yourActiveHand } = useCurrentGame()
  const [open, setOpen] = useState(false)
  const [wrongTurn, setWrongTurn] = useState(false)
  const notYetPlayed =
    yourActiveHand?.cards.filter((value) => value.round === null) ?? []

  //Check if all players did the score announcement for this match
  const clickCard = async (card) => {
    if (activeMatch.matchState === Match.matchState.PLAYING) {
      if (yourActiveHand?.turnActive) {
        updatecards(card)
      } else {
        console.log(
          "you are trying to play a card when you are not allowed. wait your turn"
        )
        setWrongTurn(true)
      }
    } else {
      setOpen(true)
    }
  }

  // Close dialog trick announcement
  const handleCloseAnnouncement = () => {
    setOpen(false)
  }

  // Close dialog
  const handleCloseTurn = () => {
    setWrongTurn(false)
  }
  let content = <></>

  // Inform the player that it is not possible to play a card
  if (open) {
    content = (
      <Dialog
        open={open}
        onClose={handleCloseAnnouncement}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Wait! Everyone needs to announce their trick first!
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Not all players announced there number of tricks! Please wait...
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAnnouncement} autoFocus>
            Agree
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
          <CardComponent
            foo={
              activeMatch.matchState === Match.matchState.PLAYING
                ? "card-playing"
                : "card-announcing"
            }
            card={card}
            onClick={() => clickCard(card)}
          />
        </div>
      ))}
      {content}
    </div>
  )
})
