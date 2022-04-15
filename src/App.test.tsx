/* eslint-disable @typescript-eslint/ban-ts-comment */
import { cleanup, render, screen, waitFor } from "@testing-library/react"
import App from "./App"
import React from "react"
import { usePlayers } from "./hooks/api/usePlayers"

jest.mock("./hooks/api/usePlayers")

const usePlayersMock = jest.mocked(usePlayers)

beforeEach(() => {
  jest.resetAllMocks()
})

afterEach(cleanup)

const usePlayersReturn = jest.mocked({
  hasCurrentSession: jest.fn(),
  startPollPlayers: jest.fn(),
  me: null,
})

test("renders register page", async () => {
  const promise = Promise.resolve(false)
  usePlayersReturn.hasCurrentSession.mockReturnValue(promise)
  usePlayersReturn.startPollPlayers.mockReturnValue({ cancel: () => null })
  usePlayersReturn.me = null
  // @ts-ignore
  usePlayersMock.mockReturnValue(usePlayersReturn)

  render(<App />)
  await waitFor(() => promise)

  screen.getByText(/Welcome to "Screw your neighbour"/i)
})
