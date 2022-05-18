import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import React, { useState } from "react"
import ListAltIcon from "@mui/icons-material/ListAlt"

const RulesButton = () => {
  const [showRules, setShowRules] = useState(false)

  const theRules = (
    <p>
      {" "}
      One game is split up into nine matches where you first get decreasing
      numbers of cards each match, with a minimum of one card, and then
      increasing numbers of cards again. (5,4,3,2,1,2,3,4). At the beginning of
      each match, you announce a number of “Tricks”. “Tricks” are the number of
      rounds won for each match. During each round, each player places a card
      from their hand. You win a round if your card is the one with the highest
      value. The goal of the game is to announce a certain number of tricks and
      then actually winning them as well. Winning the announced amount of tricks
      will yield you points, differentiating from your announcement you will get
      points deducted. The player with the most points at the end has won.
      During the special round where you only have one card, you won’t be able
      to see your card until after everyone has announced their tricks, but you
      may see the cards of all the other players. - (If you are ever confused on
      what to do you can also just hover over the buttons/cards to get
      information) - Have Fun! :)
    </p>
  )

  const clickRules = async () => {
    setShowRules(!showRules)
  }
  let content = <></>

  // Inform the player that they cannot play the card because it's not their turn yet
  if (showRules) {
    content = (
      <Dialog
        open={showRules}
        onClose={clickRules}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">THESE ARE THE RULES</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {theRules}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={clickRules} autoFocus>
            Got it!
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  return (
    <div>
      <li
        className="listitem licolor1"
        onClick={clickRules}
        style={{ lineHeight: "130%", marginTop: "50%", marginBottom: "10%" }}
      >
        <ListAltIcon style={{ width: "20%", paddingRight: "4px" }} />
        The Rules
      </li>
      {content}
    </div>
  )
}
export default RulesButton
