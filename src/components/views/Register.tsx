import React, { useState } from "react"
import BaseContainer from "../ui/BaseContainer"
import Footer from "../ui/Footer"
import Player from "../../models/Player"
import { useNavigate } from "react-router-dom"
import { api, handleError } from "../../api/api"

import Button from "@mui/material/Button"
import SendIcon from "@mui/icons-material/Send"
import { TextField } from "@mui/material"
import Box from "@mui/material/Box"
import "../../styles/fonts.scss"
import "../../styles/ui/Box.scss"
import "../../styles/ui/images.scss"
/**
 * Landing page where a user can be registered
 * @param props
 * @returns
 */
const Register = (props) => {
  // Get the existing path
  const navigate = useNavigate()
  const [name, setName] = useState("")
  // user for text field change to update the name
  const handleChange = (e) => {
    setName(e.target.value)
  }

  /**
   * Send the player registeration to the endpoint
   */
  const doRegister = async () => {
    try {
      const requestBody = JSON.stringify({ name })
      const response = await api.post("/players", requestBody)

      // Get the returned user and update a new object.
      const player = new Player(response.data)

      // Store the token into the local storage.
      localStorage.setItem("id", `${player.id}`)

      // Register successfully worked --> navigate to the route /game in the GameRouter
      navigate("/game")
    } catch (error) {
      alert(`Something went wrong during the register: \n${handleError(error)}`)
    }
  }

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
            onChange={handleChange}
          />
          <p></p>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={() => doRegister()}
          >
            TAKE ME TO THE LOBBY
          </Button>
        </Box>
      </BaseContainer>
      <Footer/>
      <div className="background-img">
    </div>
    </div>
  )
}

export default Register
