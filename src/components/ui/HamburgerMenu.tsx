import React, { useState } from "react"
import "./HamburgerMenu.scss"
import { Tooltip, Slide } from "@mui/material"
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
      <Slide direction="right" in={hamburgerOpen} mountOnEnter unmountOnExit>
        <ul className="menuNav showMenu">
          <RulesButton
            style={{
              marginTop: "50%",
              color: "white",
              left: "5%",
              width: "80%",
            }}
          />
          <LeaveButton
            style={{
              marginTop: "10%",
              color: "white",
              left: "5%",
              width: "80%",
            }}
          />
        </ul>
      </Slide>
      <p className={"hamburgerinfotext"}>
        <i className="arrow left"></i>Click here to leave the game or look at
        the rules
      </p>
    </nav>
  )
}
export default HamburgerMenu
