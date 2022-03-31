import React from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { RegisterGuard } from "../routeProtectors/RegisterGuard"
import { LobbyGuard } from "../routeProtectors/LobbyGuard"
import Register from "../../views/Register"
import Lobby from "../../views/Lobby"
import Sandbox from "../../views/Sandbox"
import { Paths } from "./Paths"

/**
 */
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={Paths.HOME}
          element={<Navigate to={Paths.CREATE_PLAYER} />}
        />
        <Route
          path={Paths.LOBBY}
          element={
            <LobbyGuard>
              <Lobby />
            </LobbyGuard>
          }
        />
        <Route
          path={Paths.CREATE_PLAYER}
          element={
            <RegisterGuard>
              <Register />
            </RegisterGuard>
          }
        />
        <Route path={Paths.SANDBOX} element={<Sandbox />} />
      </Routes>
    </BrowserRouter>
  )
}

/*
 * Don't forget to export your component!
 */
export default AppRouter
