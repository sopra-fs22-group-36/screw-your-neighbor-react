import React, { useState } from "react"
import "./HamburgerMenu.scss"
import { Tooltip } from "@mui/material"
import { Slide } from "@mui/material"
import RulesButton from "./RulesButton"
import LeaveButton from "./LeaveButton"

const HamburgerMenu = () => {
  const [hamburgerOpen, setHamburgerOpen] = useState(false)
  const handleToggle = () => {
    setHamburgerOpen(!hamburgerOpen)
  }

  return (
    <nav className="navBar">
      <input type="checkbox" id="menu_checkbox" onClick={handleToggle} />
      <Tooltip title={"Menu"} arrow={true} placement={"right"}>
        <label className="hamburgerlabel" htmlFor="menu_checkbox">
          <div></div>
          <div></div>
          <div></div>
        </label>
      </Tooltip>
      <label className="hamburgerlabel" htmlFor="menu_checkbox">
        <div></div>
        <div></div>
        <div></div>
      </label>

      <Slide direction="right" in={hamburgerOpen} mountOnEnter unmountOnExit>
        <ul className="menuNav showMenu">
          <RulesButton />
          <LeaveButton />
        </ul>
      </Slide>
    </nav>
  )
}
export default HamburgerMenu
