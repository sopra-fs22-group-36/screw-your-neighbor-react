import React from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { RegisterGuard } from "../routeProtectors/RegisterGuard"
import { LobbyGuard } from "../routeProtectors/LobbyGuard"
import Register from "../../views/Register"
import Lobby from "../../views/Lobby"
import Sandbox from "../../views/Sandbox"

/**
 */
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route
          path="/lobby"
          element={
            <LobbyGuard>
              <Lobby base="/lobby" />
            </LobbyGuard>
          }
        />
        <Route
          path="/register"
          element={
            <RegisterGuard>
              <Register base="/register" />
            </RegisterGuard>
          }
        />
        <Route path="/sandbox" element={<Sandbox />} />
      </Routes>
    </BrowserRouter>
  )
}

/*
 * Don't forget to export your component!
 */
export default AppRouter
