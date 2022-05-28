import React from "react"
import { useNavigate } from "react-router-dom"
import { Paths } from "../../routing/routers/Paths"
import LogoutIcon from "@mui/icons-material/Logout"
import "./ColorButtons.scss"
import { usePlayers } from "../../../hooks/api/usePlayers"
import { SecondaryButton } from "./SecondaryButton"

const LogoutButton = (props: { style? }) => {
  const navigate = useNavigate()
  const { logout } = usePlayers()

  const doLogout = async () => {
    await logout()
    navigate(Paths.CREATE_PLAYER)
  }

  return (
    <SecondaryButton
      action={doLogout}
      style={props.style}
      endIcon={<LogoutIcon />}
    >
      Logout
    </SecondaryButton>
  )
}
export default LogoutButton
