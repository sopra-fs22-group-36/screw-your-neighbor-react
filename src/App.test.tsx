import { render, screen } from "@testing-library/react"
import App from "./App"
import React from "react"

test("renders register page", () => {
  render(<App />)
  const linkElement = screen.getByText(/Register page/i)
  expect(linkElement).toBeInTheDocument()
})
