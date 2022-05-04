import React, { useEffect, useState } from "react"
import { usePlayers } from "../../../hooks/api/usePlayers"
import { useNavigate } from "react-router-dom"
import { Paths } from "../../routing/routers/Paths"
import Title from "../../../img/titleImage.png"
import Oberin from "../../../img/oberin.png"

import "../../../styles/fonts.scss"
import "../../../styles/ui/Box.scss"
import "../../../styles/ui/Divs.scss"
import "../../../styles/ui/images.scss"
import "./LandingPage.scss"

const LandingPage = () => {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const changeName = (e) => {
    setName(e.target.value)
  }

  const { me, loading, createPlayer, startPollPlayers } = usePlayers()

  const submit = async (e) => {
    e.preventDefault()
    await createPlayer(name)
    navigate(Paths.LOBBY)
  }

  useEffect(() => {
    if (me !== null) {
      navigate(Paths.LOBBY)
    }
    const playersSubscription = startPollPlayers()
    return () => playersSubscription.cancel()
  }, [me, navigate, startPollPlayers])

  return (
    <div>
      <div className="side-img">
        <img src={Oberin} alt="Oberin" />
      </div>
      <div className="box">
        <div className="box-left">
          <img className="image" src={Title} alt="title" />
        </div>
        <div className="box-right">
          <form onSubmit={submit}>
            <p className="title">LOGIN</p>
            <br />
            <label htmlFor="bastard name...">PLAYER NAME</label>
            <br />
            <input
              type="text"
              placeholder="your bastard name..."
              onChange={changeName}
            ></input>
            <br />
            <button className="btn" type="submit" disabled={loading}>
              TAKE ME TO LOBBY
            </button>
          </form>
        </div>
      </div>
      <div className="background-img"></div>
    </div>
  )
}

export default LandingPage
