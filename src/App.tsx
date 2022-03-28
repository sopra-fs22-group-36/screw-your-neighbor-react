import React, { useEffect, useState } from "react"
import { api } from "./api/api"
import "./styles/index.scss"
import AppRouter from "./components/routing/routers/AppRouter"

const App = () => {
  const [backendMessage, setBackendMessage] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get("/")
        setBackendMessage(
          response.data?.hello || "no meaningful data retrieved"
        )
      } catch (e) {
        setBackendMessage(`Could not connect to backend, reason: ${e.message}`)
        return
      }
    }

    fetchData()
  })
  return (
    <div>
      <AppRouter />
    </div>
  )
}

export default App
