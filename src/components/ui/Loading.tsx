import React from "react"
import BaseContainer from "./BaseContainer"

export type LoadingProps = {
  children: React.ReactNode
  ready: boolean
}

export const Loading = (props: LoadingProps) => {
  if (props.ready) {
    return <>{props.children}</>
  }
  return <BaseContainer>Loading...</BaseContainer>
}
