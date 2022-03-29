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

const handleError = (error) => {
  const response = error.response

  // catch 4xx and 5xx status codes
  if (response && !!`${response.status}`.match(/^[4|5]\d{2}$/)) {
    let info = `\nrequest to: ${response.request.responseURL}`

    if (response.data.status) {
      info += `\nstatus code: ${response.data.status}`
      info += `\nerror: ${response.data.error}`
      info += `\nerror message: ${response.data.message}`
    } else {
      info += `\nstatus code: ${response.status}`
      info += `\nerror message:\n${response.data}`
    }

    console.log(
      "The request was made and answered but was unsuccessful.",
      error.response
    )
    return info
  } else {
    if (error.message.match(/Network Error/)) {
      alert("The server cannot be reached.\nDid you start it?")
    }

    console.log("Something else happened.", error)
    return error.message
  }
}

export { api, handleError }