import Button from "@mui/material/Button"
import React from "react"
import StartIcon from "@mui/icons-material/Start"
import "./ColorButtons.scss"
import { useCurrentGame } from "../../hooks/api/useCurrentGame"

const StartButton = (props: { style; disabled }) => {
  const { playGame } = useCurrentGame()
  return (
    <div>
      <Button
        className="color-buttons bucolor-green"
        style={props.style}
        disabled={props.disabled}
        endIcon={<StartIcon />}
        onClick={playGame}
      >
        Start Game
      </Button>
    </div>
  )
}
export default StartButton
