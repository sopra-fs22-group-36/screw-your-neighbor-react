import axios from "axios"

const isProduction = process.env.NODE_ENV === "production"

const getDomain = () => {
  const prodUrl = "https://screw-your-neighbor-server.herokuapp.com"
  const devUrl = "http://localhost:8080"

  return isProduction ? prodUrl : devUrl
}

const api = axios.create({
  baseURL: getDomain(),
})

export { api }
