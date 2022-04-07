import { AppClient } from "../generated"

const isProduction = process.env.NODE_ENV === "production"

const getDomain = () => {
  const prodUrl = "https://screw-your-neighbor-server.herokuapp.com"
  const devUrl = "http://localhost:8080"

  return isProduction ? prodUrl : devUrl
}

const api = new AppClient({
  BASE: getDomain(),
  WITH_CREDENTIALS: true,
  HEADERS: {
    "Content-Type": "application/json",
  },
})

export { api, getDomain }
