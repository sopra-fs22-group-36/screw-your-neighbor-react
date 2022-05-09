import BaseContainer from "../../ui/BaseContainer"
import React from "react"
import Button from "@mui/material/Button"
import SendIcon from "@mui/icons-material/Send"

const JoinGame = () => {
  return (
    <div>
      <BaseContainer>
        <h1> Welcome to "Screw your neighbour"</h1>
      </BaseContainer>

      <BaseContainer>
        <h4>
          You were invited to play this game, do you want to join the game?
        </h4>
      </BaseContainer>
      <Button type={"submit"} variant="contained" endIcon={<SendIcon />}>
        TAKE ME TO THIS GAME
      </Button>

      <div className="background-img"></div>
    </div>
  )
}

export default JoinGame
