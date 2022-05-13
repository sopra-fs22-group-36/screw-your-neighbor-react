import BaseContainer from "../../ui/BaseContainer"
import React, { useContext, useState } from "react"
import Button from "@mui/material/Button"
import SendIcon from "@mui/icons-material/Send"

import { useGames } from "../../../hooks/api/useGames"
import { Paths } from "../../routing/routers/Paths"
import { useNavigate, useParams } from "react-router-dom"
import { observer } from "mobx-react-lite"
import { useCurrentGame } from "../../../hooks/api/useCurrentGame"

const JoinGame = observer(() => {
  const { joinGame } = useGames()
  const navigate = useNavigate()
  const gameId = useParams()
  const { refreshGame } = useCurrentGame()

  const [loading, setLoading] = useState(false)

  const findgame = async () =>{
    setLoading(true)
    const foundGame = await refreshGame().finally(()=>setLoading(false))
    return foundGame
  }
  const theGame = findgame()

  const clickJoin = async () => {
    await joinGame(theGame)
    navigate((Paths.GAME + `/${gameId}`))
  }


  return (
    <div>
      <BaseContainer>
        <h1> Welcome to "Screw your neighbour"</h1>
      </BaseContainer>

      <BaseContainer>
        <h4>
          You were invited to play this game, do you want to join the game?
        </h4>
        <Button
          //onClick={clickJoin}
          type={"submit"}
          variant="contained"
          endIcon={<SendIcon />}
        >
          TAKE ME TO THIS GAME
        </Button>
      </BaseContainer>
      <div className="background-img"></div>
    </div>
  )
})

export default JoinGame
