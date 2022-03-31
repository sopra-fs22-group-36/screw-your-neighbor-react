import React from "react"
import "./styles/index.scss"
import AppRouter from "./components/routing/routers/AppRouter"
import { AppContextProvider } from "./AppContext"
import { ApiErrorSnackBar } from "./components/ui/ApiErrorSnackBar"

const App = () => {
  return (
    <div>
      <AppContextProvider>
        <ApiErrorSnackBar />
        <AppRouter />
      </AppContextProvider>
    </div>
  )
}

export default App
