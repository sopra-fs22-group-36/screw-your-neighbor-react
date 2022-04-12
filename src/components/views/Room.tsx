import React, { useContext, useEffect } from "react"
import BaseContainer from "../ui/BaseContainer"
import { useNavigate } from "react-router-dom"
import { Paths } from "../routing/routers/Paths"
import { useCurrentGame } from "../../hooks/api/useCurrentGame"
import { useGames } from "../../hooks/api/useGames"
import { EntityModelGame } from "../../generated"
import { getDomain } from "../../api/api"
import { appContext } from "../../AppContext"
import { useApi } from "../../hooks/api/useApi"

const Room = () => {
  const navigate = useNavigate()
  const { game, playGame } = useCurrentGame()
  const { startPollGames } = useGames()
  const { currentGameStore } = useContext(appContext)
  const { request, wrapApiCall } = useApi()

  const temporary = async () => {
    //To make sure you can get from the room to the Game
    navigate(Paths.GAME)
    await playGame()
  }

  /**
   * Get request for the current game, will update according the intervall
   */
  useEffect(() => {
    //Start trigger to check, whether the current gameState has change
    //meaning that, one of the players has start the game
    const gamesSubscription = startPollGames()
    const updateGame = setInterval(async () => {
      const uri = currentGameStore.game._links.self.href.replace(
        getDomain(),
        ""
      )
      const url = `${uri}?projection=embed`
      const game: EntityModelGame = await wrapApiCall(
        request.request({
          method: "GET",
          url: url,
        })
      )
      //Send all joined players to the game room
      if (game.gameState === EntityModelGame.gameState.PLAYING) {
        clearInterval(updateGame)
        navigate(Paths.GAME)
        return
      }
    }, 500)
    return () => [gamesSubscription].forEach((sub) => sub.cancel())
  }, [
    startPollGames,
    currentGameStore.game._links.self.href,
    navigate,
    request,
    wrapApiCall,
  ])

  function startGame() {
    navigate(Paths.GAME)
  }

  return (
    <div>
      <div>
        <BaseContainer>
          <h1>Room page</h1>
          <div>You are in the game {game.name}</div>
          <button style={{ height: "50px" }} onClick={temporary}>
            GET TO MY GAME
          </button>
        </BaseContainer>
      </div>
      <div>{game.gameState === "PLAYING" ? startGame : <p>hallo</p>}</div>
    </div>
  )
}

export default Room
