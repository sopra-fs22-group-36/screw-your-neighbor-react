import React from "react"
import { useNavigate } from "react-router-dom"
import { useCurrentGame } from "../../hooks/api/useCurrentGame"
import { Paths } from "../routing/routers/Paths"
import SendIcon from "@mui/icons-material/Send"

const LeaveButton = () => {
  const navigate = useNavigate()
  const { leaveGame } = useCurrentGame()

  const clickLeave = async () => {
    await leaveGame()
    navigate(Paths.LOBBY)
  }

  return (
    <li
      onClick={clickLeave}
      className="listitem licolor2"
      style={{
        color: "white",
        fontSize: "x-large",
        listStyle: "none",
      }}
    >
      <SendIcon style={{ width: "20%", paddingRight: "4px" }} />
      Leave Game
    </li>
  )
}
export default LeaveButton
