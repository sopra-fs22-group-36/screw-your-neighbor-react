import React, { useState } from "react"
import { MdClose } from "react-icons/md"
import { FiMenu } from "react-icons/fi"
import "./HamburgerMenu.scss"
import SendIcon from "@mui/icons-material/Send"
import { useCurrentGame } from "../../hooks/api/useCurrentGame"
import { Paths } from "../routing/routers/Paths"
import { useNavigate } from "react-router-dom"

const HamburgerMenu = () => {
  const navigate = useNavigate()
  const [hamburgerOpen, setHamburgerOpen] = useState(false)
  const { leaveGame } = useCurrentGame()

  const clickLeave = async () => {
    await leaveGame()
    navigate(Paths.LOBBY)
  }

  const handleToggle = () => {
    setHamburgerOpen(!hamburgerOpen)
  }
  return (
    <nav className="navBar">
      <button onClick={handleToggle}>
        {hamburgerOpen ? (
          <MdClose style={{ color: "#fff", width: "20px", height: "40px" }} />
        ) : (
          <FiMenu style={{ color: "#7b7b7b", width: "20px", height: "40px" }} />
        )}
      </button>
      <ul className={`menuNav ${hamburgerOpen ? " showMenu" : ""}`}>
        {" "}
        <SendIcon />
        <li onClick={clickLeave} style={{ marginTop: "800px" }}>
          {" "}
          <SendIcon />
          Leave
        </li>
      </ul>
    </nav>
  )
}
export default HamburgerMenu
