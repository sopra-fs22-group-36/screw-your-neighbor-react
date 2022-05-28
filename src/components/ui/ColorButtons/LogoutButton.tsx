import React from "react"
import { useNavigate } from "react-router-dom"
import { Paths } from "../../routing/routers/Paths"
import LogoutIcon from "@mui/icons-material/Logout"
import { Button } from "@mui/material"
import "./ColorButtons.scss"
import { usePlayers } from "../../../hooks/api/usePlayers"

const LogoutButton = (props: { style }) => {
  const navigate = useNavigate()
  const { logout } = usePlayers()

  const doLogout = async () => {
    await logout()
    navigate(Paths.CREATE_PLAYER)
  }

  return (
    <Button
      onClick={doLogout}
      className="color-buttons bucolor-darkblue"
      style={props.style}
      endIcon={<LogoutIcon />}
    >
      Logout
    </Button>
  )
}
export default LogoutButton