import React from "react"
import { observer } from "mobx-react-lite"
import { useCurrentGame } from "../../../../hooks/api/useCurrentGame"
import BaseContainer from "../../../ui/BaseContainer"
import SendIcon from "@mui/icons-material/Send"
import Button from "@mui/material/Button"
import { useNavigate } from "react-router-dom"
import { Paths } from "../../../routing/routers/Paths"

export const GameSummary = observer(() => {
  const navigate = useNavigate()
  const { game, closeGame, loading } = useCurrentGame()

  const clickCloseGame = async () => {
    await closeGame()
    navigate(Paths.LOBBY)
  }

  return (
    <BaseContainer>
      <h2>Game: {game.name} is finished</h2>
      <Button
        disabled={loading}
        variant="contained"
        endIcon={<SendIcon />}
        onClick={clickCloseGame}
      >
        Close game
      </Button>
    </BaseContainer>
  )
})
