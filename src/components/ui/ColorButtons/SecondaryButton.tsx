import React from "react"
import { Button } from "@mui/material"
import "./ColorButtons.scss"
import { defaultButtonStyle } from "../../../styles/styleConstants"

export const SecondaryButton = (props: {
  action
  children
  className?
  style?
  disabled?
  endIcon?
}) => {
  const className = props.className ?? ""
  const style = {
    ...defaultButtonStyle,
    ...(props.style ?? {}),
  }
  const disabled = props.disabled ?? false

  const endIcon = props.endIcon ?? <></>

  return (
    <Button
      disabled={disabled}
      onClick={props.action}
      className={`color-buttons bucolor-darkblue ${className}`}
      style={style}
      endIcon={endIcon}
    >
      {props.children}
    </Button>
  )
}
