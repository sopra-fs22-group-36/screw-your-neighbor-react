import React, { useEffect, useState } from "react"
import { usePlayers } from "../../../hooks/api/usePlayers"
import Footer from "../../ui/Footer"
import { useNavigate } from "react-router-dom"
import { Paths } from "../../routing/routers/Paths"
import { useQuery } from "../../../hooks/useQuery"
import Oberin from "../../../img/oberin.png"

import BaseContainer from "../../ui/BaseContainer"
import { TextField } from "@mui/material"
import Box from "@mui/material/Box"
import { SecondaryButton } from "../../ui/ColorButtons/SecondaryButton"
import "../../../styles/fonts.scss"
import "../../../styles/ui/Box.scss"
import "../../../styles/ui/Divs.scss"
import "../../../styles/ui/images.scss"
import "./CreatePlayer.scss"

const CreatePlayer = () => {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const changeName = (e) => {
    setName(e.target.value)
  }
  const redirectLink = useQuery().get("redirectTo")

  const { me, loading, createPlayer, startPollPlayers } = usePlayers()

  const submit = async (e) => {
    e.preventDefault()
    await createPlayer(name)
    if (!redirectLink) {
      navigate(Paths.LOBBY)
    } else {
      navigate(redirectLink)
    }
  }

  useEffect(() => {
    if (me !== null) {
      navigate(Paths.LOBBY)
    }
    const playersSubscription = startPollPlayers()
    return () => playersSubscription.cancel()
  }, [me, navigate, startPollPlayers])

  return (
    <div>
      <div className="side-img">
        <img src={Oberin} alt="Oberin" />
      </div>
      <div className="div-box">
        <div className="div-container">
          <BaseContainer>
            <h1 className="create-title">Welcome to "Screw your neighbour"</h1>
          </BaseContainer>

          <Box className="create-container">
            <h4 className="create-box-subtitle">
              Register by entering your name and pressing <br />
              "Take me to the Lobby"
            </h4>
            <form onSubmit={submit}>
              <Box className="create-box">
                <TextField
                  helperText="Please enter your player name"
                  id="demo-helper-text-aligned"
                  label="player name"
                  value={name}
                  onChange={changeName}
                />
                <SecondaryButton
                  action={submit}
                  disabled={loading}
                  style={{
                    width: "93%",
                    maxWidth: "unset",
                  }}
                >
                  TAKE ME TO THE LOBBY
                </SecondaryButton>
              </Box>
            </form>
          </Box>
        </div>
        <Footer />
        <div className="background-img"></div>
      </div>
    </div>
  )
}

export default CreatePlayer
