import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useGames } from "../../../hooks/api/useGames"
import { extractId } from "../../../util/extractId"

import { TextField, Tooltip } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import Box from "@mui/material/Box"
import { Paths } from "../../routing/routers/Paths"
import "../../../styles/ui/Box.scss"
import "../lobby/CreateGame.scss"
import { SecondaryButton } from "../../ui/ColorButtons/SecondaryButton"

export const CreateGame = () => {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const { loading, createGame } = useGames()

  const changeName = (e) => {
    setName(e.target.value)
  }

  const submit = async (e) => {
    e.preventDefault()
    const createdGame = await createGame(name)
    const gameId = extractId(createdGame._links.self)
    navigate(Paths.GAME + `/${gameId}`)
  }

  return (
    <form onSubmit={submit}>
      <Box className="game-box">
        <TextField
          helperText="Please enter your room name"
          id="demo-helper-text-aligned"
          label="game name"
          value={name}
          onChange={changeName}
        />
        <Tooltip
          title={
            'Enter a name for your game and click on "CREATE GAME" to create a new game room'
          }
          arrow={true}
          placement={"left"}
          enterDelay={500}
        >
          <div>
            <SecondaryButton
              disabled={loading}
              endIcon={<SendIcon />}
              action={submit}
              style={{
                width: "93%",
              }}
            >
              create game
            </SecondaryButton>
          </div>
        </Tooltip>
      </Box>
    </form>
  )
}
