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

export const YourHand = () => {
  const { updatecards } = useCards()
  const { activeMatch, yourActiveHand } = useCurrentGame()
  const [opacity, setOpacity] = useState(10)
  const [open, setOpen] = useState(false)

  const notYetPlayed =
    yourActiveHand?.cards.filter((value) => value.round === null) ?? []

  //Check if all players did the score announcement for this match
  const clickCard = async (card, number) => {
    setOpacity(number)
    if (activeMatch.matchState === Match.matchState.PLAYING) {
      updatecards(card)
    } else {
      console.log("hallo")
      setOpen(true)
    }
  }

  // Close dialog
  const handleClose = () => {
    setOpen(false)
  }


  let content = <></>

  // Inform the player that it is not possible to play a card
  if (open) {
    content = (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Screw-your-neighbor: talk to other users"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Not all players announced there number of tricks! Please wait...
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  return (
    <div className="your-hand">
      <p>These are the Cards for Match {activeMatch?.matchNumber}:</p>
      {notYetPlayed.map((card, index) => (
        <div
          style={{
            backgroundColor: opacity === index ? "#0b97c4" : "#006666",
          }}
          key={card._links.self.href}
        >
          <CardComponent card={card} onClick={() => clickCard(card, index)} />
        </div>
      ))}
      {content}
    </div>
  )
}
