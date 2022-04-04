import React from "react"
import Footer from "../ui/Footer"
import BaseContainer from "../ui/BaseContainer"
import { useNavigate } from "react-router-dom"
import { handleError } from "../../api/api"
import "../../styles/ui/Button.scss"
import "../../styles/ui/Divs.scss"
import "../../styles/ui/Lists.scss"
import "../../styles/ui/images.scss"

const Lobby = (props) => {
  const navigate = useNavigate()
  /* code for later!
  const Room = ({room}) => (
        <div className="">
            <div style={{cursor:"crosshair", padding:"1em"}} className="player username" onClick={() => console.log("You clicked on something! wow!")}>Room</div>
            <div className="">players: {room.players}</div>
        </div>
    );
*/

  const doLogout = async () => {
    try {
      localStorage.removeItem("id")

      // Register successfully worked --> navigate to the route /game in the GameRouter
      navigate("/register")
      console.log("logged out")
    } catch (error) {
      alert(`Something went wrong during the register: \n${handleError(error)}`)
      console.log(error)
    }
  }

  let content = (
    <img
      src="https://grrrls.at/wp-content/uploads/2020/01/no-image.jpg"
      alt="Lamp"
      width="32"
      height="32"
    ></img>
  ) //placeholder
  if (localStorage.getItem("id") != null) {
    content = (
      <div className="div-rooms">
        <div className="roomlist">
          <div className="roomlistitem">Room 1</div>
          <div className="roomlistitem">Room 2</div>
          <div className="roomlistitem">Room 3</div>
          <div className="roomlistitem">Room 4</div>
        </div>

        <button className="button" onClick={() => doLogout()}>
          Logout
        </button>
      </div>
    )
  }

  return (
    <div className="div-box">
      <BaseContainer>
        <h1 className="font-title">Lobby</h1>
      </BaseContainer>
      <br />
      <BaseContainer>
        <h3>Choose one of the Rooms to join</h3>
        {content}
      </BaseContainer>

      <Footer />
      <div className="background-img"></div>
    </div>
  )
}

export default Lobby
