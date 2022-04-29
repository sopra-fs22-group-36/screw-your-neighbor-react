import React, { useState } from "react"
import { MdClose } from "react-icons/md"
import { FiMenu } from "react-icons/fi"
import "./HamburgerMenu.scss"
import SendIcon from "@mui/icons-material/Send"
import ListAltIcon from "@mui/icons-material/ListAlt"
import { useCurrentGame } from "../../hooks/api/useCurrentGame"
import { Paths } from "../routing/routers/Paths"
import { useNavigate } from "react-router-dom"
import { Grow } from "@mui/material"

const HamburgerMenu = () => {
  const navigate = useNavigate()
  const [hamburgerOpen, setHamburgerOpen] = useState(false)
  const [showRules, setShowRules] = useState(false)
  const { leaveGame } = useCurrentGame()
  const theRules = (
    <p>
      {" "}
      "One game is split up into nine matches where you first get decreasing
      numbers of cards each match, with a minimum of one card, and then
      increasing numbers of cards again. (5,4,3,2,1,2,3,4) At the beginning of
      each match, you announce a number of “Tricks”. “Tricks” are the number of
      rounds won for each match. During each round, each player places a card
      from their hand. You win a round if your card is the one with the highest
      value. The goal of the game is to announce a certain number of tricks and
      then actually winning them as well.Winning the announced amount of tricks
      will yield you points, differentiating from your announcement you will get
      points deducted. The player with the most points at the end has won.
      During the special round where you only have one card, you won’t be able
      to see your card until after everyone has announced their tricks, but you
      may see the cards of all the other players. Have Fun! :)
    </p>
  )

  const clickLeave = async () => {
    await leaveGame()
    navigate(Paths.LOBBY)
  }
  const clickRules = async () => {
    setShowRules(!showRules)
  }

  const handleToggle = () => {
    setHamburgerOpen(!hamburgerOpen)
  }

  return (
    <nav className="navBar">
      <button onClick={handleToggle}>
        {hamburgerOpen ? (
          <MdClose className="xbutton" />
        ) : (
          <FiMenu className="xbutton" />
        )}
      </button>
      <ul className={`menuNav ${hamburgerOpen ? " showMenu" : ""}`}>
        <li
          className="listitem licolor1"
          onClick={clickRules}
          style={{
            marginTop: "120px",
          }}
        >
          <ListAltIcon style={{ width: "20%", paddingRight: "4px" }} />
          The Rules
        </li>
        <Grow in={showRules}>{theRules}</Grow>
        <li
          onClick={clickLeave}
          className="listitem licolor2"
          style={{
            marginTop: "80px",
          }}
        >
          <SendIcon style={{ width: "20%", paddingRight: "4px" }} />
          Leave Game
        </li>
      </ul>
    </nav>
  )
}
export default HamburgerMenu
