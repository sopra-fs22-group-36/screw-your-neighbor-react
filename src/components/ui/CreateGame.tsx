import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useGames } from "../../hooks/api/useGames"

import { TextField } from "@mui/material"
import Button from "@mui/material/Button"
import SendIcon from "@mui/icons-material/Send"
import Box from "@mui/material/Box"
import { Paths } from "../routing/routers/Paths"
import "../../styles/ui/Box.scss"

export const CreateGame = () => {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const { loading, createGame } = useGames()

  const changeName = (e) => {
    setName(e.target.value)
  }

  const submit = async () => {
    await createGame(name)
    navigate(Paths.ROOM) //GAME and ROOM are the same in the Backend but the view is different for the Frontend! How to change?
  }

  return (
    <Box className="Box">
      <TextField
        helperText="Please enter your room name"
        id="demo-helper-text-aligned"
        label="game name"
        value={name}
        onChange={changeName}
      />
      <Button
        disabled={loading}
        variant="contained"
        endIcon={<SendIcon />}
        onClick={submit}
      >
        create game
      </Button>
    </Box>
  )
}
