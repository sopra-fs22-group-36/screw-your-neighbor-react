import Button from "@mui/material/Button"
import React from "react"
import StartIcon from "@mui/icons-material/Start"
import "./ColorButtons.scss"
import { extractId } from "../../../util/extractId"
import { Paths } from "../../routing/routers/Paths"
import { useNavigate } from "react-router-dom"
import { useGames } from "../../../hooks/api/useGames"
import { defaultButtonStyle } from "../../../styles/styleConstants"

const NewGameButton = (props: { style? }) => {
  const navigate = useNavigate()
  const { createOrJoinNextGame } = useGames()
  const clickStartNewGame = async () => {
    const nextGame = await createOrJoinNextGame()
    const nextGameId = extractId(nextGame._links.self)
    navigate(Paths.GAME + `/${nextGameId}`)
  }

  const style = {
    ...defaultButtonStyle,
    ...(props.style ?? {}),
  }

  return (
    <div>
      <Button
        className="color-buttons bucolor-green"
        style={style}
        endIcon={<StartIcon />}
        onClick={clickStartNewGame}
      >
        Start New Game
      </Button>
    </div>
  )
}
export default NewGameButton
