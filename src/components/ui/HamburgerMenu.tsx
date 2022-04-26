import React, { useState } from "react"
import { MdClose } from "react-icons/md"
import { FiMenu } from "react-icons/fi"
import "./HamburgerMenu.scss"
import SendIcon from "@mui/icons-material/Send"
import ListAltIcon from "@mui/icons-material/ListAlt"
import { useCurrentGame } from "../../hooks/api/useCurrentGame"
import { Paths } from "../routing/routers/Paths"
import { useNavigate } from "react-router-dom"

const HamburgerMenu = () => {
  const navigate = useNavigate()
  const [hamburgerOpen, setHamburgerOpen] = useState(false)
  const [showRules, setShowRules] = useState(" ")
  const { leaveGame } = useCurrentGame()
  const [marginLeave, setMarginLeave] = useState("700px")

  const clickLeave = async () => {
    await leaveGame()
    navigate(Paths.LOBBY)
  }
  const clickRules = async () => {
    setMarginLeave("86px")
    setShowRules(
      "One game is split up into nine matches where you first get decreasing numbers of cards each match,\n" +
        "with a minimum of one card, \n" +
        "and then increasing numbers of cards again. (5,4,3,2,1,2,3,4)\n" +
        "At the beginning of each match, you announce a number of “Tricks”. \n" +
        "“Tricks” are the number of rounds won for each match.\n" +
        "During each round, each player places a card from their hand.\n" +
        "You win a round if your card is the one with the highest value.\n" +
        "The goal of the game is to announce a certain number of tricks and then actually winning them as well.\n" +
        "Winning the announced amount of tricks will yield you points," +
        " differentiating from your announcement you will get points deducted.\n" +
        "The player with the most points at the end has won\n" +
        "During the special round where you only have one card, you won’t \n" +
        "be able to see your card until after everyone has announced\n" +
        "their tricks, but you may see the cards of all the other players.\n"
    )
  }

  const handleToggle = () => {
    setHamburgerOpen(!hamburgerOpen)
    setShowRules(" ") //TOGGLE RULES ON AND OFF WITH SAME BUTTON!!
    setMarginLeave("700px")
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
        <li
          onClick={clickRules}
          style={{
            marginTop: "100px",
            background:
              "linear-gradient(0deg, rgba(15,113,26,1) 0%, rgba(51,173,42,1) 50%, rgba(99,255,0,1) 100%)",
          }}
        >
          {" "}
          <ListAltIcon />
          The Rules
        </li>
        <p>{showRules}</p>
        <li onClick={clickLeave} style={{ marginTop: marginLeave }}>
          {" "}
          <SendIcon />
          Leave Game
        </li>
      </ul>
    </nav>
  )
}
export default HamburgerMenu
