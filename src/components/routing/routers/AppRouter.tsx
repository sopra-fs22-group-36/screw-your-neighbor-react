import React from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Lobby from "../../views/lobby/Lobby"
import { Paths } from "./Paths"
import { SessionGuard } from "../guards/SessionGuard"
import { GameGuard } from "../guards/GameGuard"
import Register from "../../views/createplayer/Register"

/**
 */
const AppRouter = () => {
  return (
    <BrowserRouter>
      <SessionGuard>
        <Routes>
          <Route
            path={Paths.HOME}
            element={<Navigate to={Paths.CREATE_PLAYER} />}
          />
          <Route path={Paths.LOBBY} element={<Lobby />} />
          <Route
            path={`${Paths.GAME}/:currentGameId`}
            element={<GameGuard redirectTo={Paths.LOBBY} />}
          />
          <Route path={Paths.GAME} element={<Navigate to={Paths.LOBBY} />} />
          <Route path={Paths.CREATE_PLAYER} element={<Register />} />
        </Routes>
      </SessionGuard>
    </BrowserRouter>
  )
}

/*
 * Don't forget to export your component!
 */
export default AppRouter
