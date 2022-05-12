import React, { useState } from "react"
import SendIcon from "@mui/icons-material/Send"
import { useNavigate } from "react-router-dom"
import { useCurrentGame } from "../../../../../hooks/api/useCurrentGame"
import { Paths } from "../../../../routing/routers/Paths"

const LeaveButton = () => {
  const navigate = useNavigate()
  const { leaveGame } = useCurrentGame()

  const clickLeave = async () => {
    await leaveGame()
    navigate(Paths.LOBBY)
  }

  return (
    <button
      onClick={clickLeave}
      className="listitem licolor2"
      style={{
        color: "white",
      }}
    >
      Leave Game
    </button>
  )
}
export default LeaveButton
