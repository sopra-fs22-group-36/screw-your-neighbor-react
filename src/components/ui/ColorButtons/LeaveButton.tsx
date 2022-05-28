import React from "react"
import { useNavigate } from "react-router-dom"
import { useCurrentGame } from "../../../hooks/api/useCurrentGame"
import { Paths } from "../../routing/routers/Paths"
import { Button } from "@mui/material"
import "./ColorButtons.scss"
import LogoutIcon from "@mui/icons-material/Logout"
import { defaultButtonStyle } from "../../../styles/styleConstants"

const LeaveButton = (props: { style? }) => {
  const navigate = useNavigate()
  const { leaveGame } = useCurrentGame()

  const clickLeave = async () => {
    await leaveGame()
    navigate(Paths.LOBBY)
  }

  const style = {
    ...defaultButtonStyle,
    ...(props.style ?? {}),
  }

  return (
    <Button
      onClick={clickLeave}
      className="color-buttons bucolor-darkblue"
      style={style}
      endIcon={<LogoutIcon />}
    >
      Leave Game
    </Button>
  )
}
export default LeaveButton
