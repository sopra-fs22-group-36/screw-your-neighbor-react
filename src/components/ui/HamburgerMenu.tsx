import React, { useEffect, useState } from "react"
import "./HamburgerMenu.scss"
import { Tooltip, Slide } from "@mui/material"
import RulesButton from "./ColorButtons/RulesButton"
import LeaveButton from "./ColorButtons/LeaveButton"

const HamburgerMenu = () => {
  const [hamburgerOpen, setHamburgerOpen] = useState(false)
  const [openTooltip, setOpenTooltip] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOpenTooltip(false)
    }, 5000)

    return () => clearTimeout(timeout)
  }, [])

  const handleToggle = () => {
    setHamburgerOpen(!hamburgerOpen)
  }

  return (
    <nav className="navBar">
      <input type="checkbox" id="menu_checkbox" onClick={handleToggle} />
      <Tooltip title={"Menu"} arrow={true} placement={"right"}>
        <label className="hamburgerlabel" htmlFor="menu_checkbox">
          <div></div>
          <Tooltip
            title={"Click here to leave the game or look at the rules"}
            arrow={true}
            placement={"right"}
            open={openTooltip}
          >
            <div></div>
          </Tooltip>
          <div></div>
        </label>
      </Tooltip>
      <Slide direction="right" in={hamburgerOpen} mountOnEnter unmountOnExit>
        <ul className="menuNav showMenu">
          <RulesButton
            style={{
              marginTop: "50%",
              left: "5%",
              width: "80%",
            }}
          />
          <LeaveButton
            style={{
              marginTop: "10%",
              left: "5%",
              width: "80%",
            }}
          />
        </ul>
      </Slide>
    </nav>
  )
}
export default HamburgerMenu
