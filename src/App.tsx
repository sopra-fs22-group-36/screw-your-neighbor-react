import React from "react"
import "./styles/index.scss"
import AppRouter from "./components/routing/routers/AppRouter"
import { AppContextProvider } from "./AppContext"
import { ApiErrorSnackBar } from "./components/ui/ApiErrorSnackBar"
import { HttpsGuard } from "./components/routing/guards/HttpsGuard"
import { darkScrollbar, GlobalStyles } from "@mui/material"

const App = () => {
  return (
    <div>
      <GlobalStyles
        styles={{
          ...darkScrollbar(),
        }}
      />
      <HttpsGuard>
        <AppContextProvider>
          <ApiErrorSnackBar />
          <AppRouter />
        </AppContextProvider>
      </HttpsGuard>
    </div>
  )
}

export default App
