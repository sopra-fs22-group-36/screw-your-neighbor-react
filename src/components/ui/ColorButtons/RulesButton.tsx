import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import React, { useState } from "react"
import ListAltIcon from "@mui/icons-material/ListAlt"
import "./ColorButtons.scss"
import { defaultButtonStyle } from "../../../styles/styleConstants"

const RulesButton = (props: { style? }) => {
  const [showRules, setShowRules] = useState(false)

  const theRules = (
    <>
      One game is split up into nine matches where you first get decreasing
      numbers of cards each match, with a minimum of one card, and then
      increasing numbers of cards again. (5,4,3,2,1,2,3,4). <br /> At the
      beginning of each match, you announce a number of “Tricks”. “Tricks” are
      the number of rounds won for each match. During each round, each player
      places a card from their hand. You win a round if your card is the one
      with the highest value. The goal of the game is to announce a certain
      number of tricks and then actually winning them as well. Winning the
      announced amount of tricks will yield you points, differentiating from
      your announcement you will get points deducted. <br /> The player with the
      most points at the end has won. <br />
      During the special round where you only have one card, you won’t be able
      to see your card until after everyone has announced their tricks, but you
      may see the cards of all the other players. <br /> If you are ever
      confused on what to do you can also just hover over the buttons/cards to
      get more information <br /> <big>Have Fun! :)</big>
    </>
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

  const style = {
    ...defaultButtonStyle,
    ...(props.style ?? {}),
  }

  return (
    <div>
      <Button
        className="color-buttons bucolor-lightblue"
        onClick={clickRules}
        style={style}
        endIcon={<ListAltIcon />}
      >
        The Rules
      </Button>
      {content}
    </div>
  )
}
export default RulesButton
