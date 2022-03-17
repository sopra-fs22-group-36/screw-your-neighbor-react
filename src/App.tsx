import React, { useEffect, useState } from "react"
import { api } from "./api/api"

function App() {
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
      <header>Hello from Sopra group 36</header>
      <div>{backendMessage || "loading"}</div>
    </div>
  )
}

export default App
