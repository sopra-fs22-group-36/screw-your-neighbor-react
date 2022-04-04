import React, { useEffect, useState } from "react"
import { usePlayers } from "../../hooks/api/usePlayers"
import Footer from "../ui/Footer"
import { useNavigate } from "react-router-dom"
import { Paths } from "../routing/routers/Paths"

import Button from "@mui/material/Button"
import BaseContainer from "../ui/BaseContainer"
import SendIcon from "@mui/icons-material/Send"
import { TextField } from "@mui/material"
import Box from "@mui/material/Box"
import "../../styles/fonts.scss"
import "../../styles/ui/Box.scss"
import "../../styles/ui/Divs.scss"
import "../../styles/ui/images.scss"

const Register = () => {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const changeName = (e) => {
    setName(e.target.value)
  }

  const { loading, createPlayer, startPollPlayers } = usePlayers()

  const submit = async () => {
    await createPlayer(name)
    navigate(Paths.LOBBY)
  }

  useEffect(() => {
    const playersSubscription = startPollPlayers()
    return () => playersSubscription.cancel()
  })

  return (
    <div className="div-box">
      <BaseContainer>
        <h1 className="font-title">Welcome to "Screw your neighbour"</h1>
      </BaseContainer>
      <br />
      <BaseContainer>
        <h4>
          {" "}
          Register by entering your name in the field below and pressing "Take
          me to the Lobby"
        </h4>
        <Box className="Box">
          <TextField
            helperText="Please enter your player name"
            id="demo-helper-text-aligned"
            label="player name"
            value={name}
            onChange={changeName}
          />
          <p></p>
          <Button
            disabled={loading}
            variant="contained"
            endIcon={<SendIcon />}
            onClick={submit}
          >
            TAKE ME TO THE LOBBY
          </Button>
        </Box>
      </BaseContainer>
      <Footer />
      <div className="background-img"></div>
    </div>
  )
}

export default Register
