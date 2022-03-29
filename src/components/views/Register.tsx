import React, { useState } from "react"
import BaseContainer from "../ui/BaseContainer"
import Player from "../../models/Player"
import { useNavigate } from "react-router-dom"
import { api, handleError } from "../../api/api"

import Button from "@mui/material/Button"
import SendIcon from "@mui/icons-material/Send"
import { TextField } from "@mui/material"
import Box from "@mui/material/Box"

import "../../styles/ui/Box.scss"

/**
 * Landing page where a user can be registered
 * @param props
 * @returns
 */
const Register = (props) => {
  // Get the existing path
  const navigate = useNavigate()
  const [name, setName] = useState(null)
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
    <BaseContainer>
      <h1>Register page</h1>
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
          Send
        </Button>
      </Box>
    </BaseContainer>
  )
}

export default Register