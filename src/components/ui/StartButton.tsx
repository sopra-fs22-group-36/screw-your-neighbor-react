import Button from "@mui/material/Button"
import React from "react"
import ListAltIcon from "@mui/icons-material/ListAlt"
import "./ColorButtons.scss"
import { useCurrentGame } from "../../hooks/api/useCurrentGame"

const StartButton = (props: { style; disabled }) => {
  const { playGame } = useCurrentGame()
  return (
    <div>
      <Button
        className="color-buttons bucolor-lightblue"
        style={props.style}
        disabled={props.disabled}
        endIcon={<ListAltIcon />}
        onClick={playGame}
      >
        Start Game
      </Button>
    </div>
  )
}
export default StartButton
