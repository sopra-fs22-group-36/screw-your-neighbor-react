import React from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Register from "../../views/Register"
import Lobby from "../../views/Lobby"
import Sandbox from "../../views/Sandbox"
import Game from "../../views/Game"
import { Room } from "../../views/Room"
import { Paths } from "./Paths"
import { SessionGuard } from "../guards/SessionGuard"

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
          <Route path={Paths.GAME} element={<Game />} />
          <Route path={Paths.ROOM} element={<Room />} />
          <Route path={Paths.CREATE_PLAYER} element={<Register />} />
          <Route path={Paths.SANDBOX} element={<Sandbox />} />
        </Routes>
      </SessionGuard>
    </BrowserRouter>
  )
}

/*
 * Don't forget to export your component!
 */
export default AppRouter
