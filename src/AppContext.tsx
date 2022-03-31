import React, { createContext } from "react"
import { useLocalObservable } from "mobx-react-lite"
import { AppStore } from "./stores/AppStore"

export const appContext = createContext(new AppStore())

export const AppContextProvider = ({ children }) => {
  const appStore = useLocalObservable(() => new AppStore())
  return <appContext.Provider value={appStore}>{children}</appContext.Provider>
}
