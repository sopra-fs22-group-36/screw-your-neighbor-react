import React from "react"
import { Avatar } from "@mui/material"
import { AvatarConfig } from "../../hooks/useParticipationAvatars"

export type ConfiguredAvatarProps = {
  config: AvatarConfig
}

export function ConfiguredAvatar({ config }: ConfiguredAvatarProps) {
  return (
    <Avatar
      className={"configured-avatar"}
      sx={{
        bgcolor: `hsl(${config.hue}, 70%, 30%)`,
      }}
    >
      {config.shortHand.toUpperCase()}
    </Avatar>
  )
}
