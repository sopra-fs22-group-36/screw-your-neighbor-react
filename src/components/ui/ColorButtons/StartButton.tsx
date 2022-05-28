import Button from "@mui/material/Button"
import React from "react"
import StartIcon from "@mui/icons-material/Start"
import "./ColorButtons.scss"
import { useCurrentGame } from "../../../hooks/api/useCurrentGame"
import { defaultButtonStyle } from "../../../styles/styleConstants"

const StartButton = (props: { style?; disabled }) => {
  const { playGame } = useCurrentGame()

  const style = {
    ...defaultButtonStyle,
    ...(props.style ?? {}),
  }

  return (
    <div>
      <Button
        className="color-buttons bucolor-green"
        style={style}
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
