import React from "react"
import { useNavigate } from "react-router-dom"
import { useCurrentGame } from "../../hooks/api/useCurrentGame"
import { Paths } from "../routing/routers/Paths"
import SendIcon from "@mui/icons-material/Send"
import { Button } from "@mui/material"
import "./ColorButtons.scss"

const LeaveButton = (props: { style }) => {
  const navigate = useNavigate()
  const { leaveGame } = useCurrentGame()

  const clickLeave = async () => {
    await leaveGame()
    navigate(Paths.LOBBY)
  }

  return (
    <Button
      onClick={clickLeave}
      className="color-buttons bucolor-darkblue"
      style={props.style}
      endIcon={<SendIcon />}
    >
      Leave Game
    </Button>
  )
}
export default LeaveButton
