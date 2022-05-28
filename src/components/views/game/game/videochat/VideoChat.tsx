import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { usePlayers } from "../../../../../hooks/api/usePlayers"
import { useCurrentGame } from "../../../../../hooks/api/useCurrentGame"
import { Close, VideoCameraFront } from "@mui/icons-material"
import { JitsiMeeting } from "@jitsi/react-sdk"
import "./VideoChat.scss"
import { Tooltip } from "@mui/material"
import { SecondaryButton } from "../../../../ui/ColorButtons/SecondaryButton"

const jitsiConfig = {
  disableModeratorIndicator: true,
  disablePolls: true,
  disableSelfView: true,
  disableSelfViewSettings: true,
  hideLobbyButton: true,
  requireDisplayName: false,
  hideDisplayName: true,
  hideDominantSpeakerBadge: true,
  disableProfile: true,
  prejoinConfig: {
    enabled: false,
  },
  readOnlyName: true,
  toolbarButtons: [],
}
export const VideoChat = observer(() => {
  const { me } = usePlayers()
  const { game } = useCurrentGame()

  const [active, setActive] = useState(false)

  const additionalClass = active ? "active" : "inactive"

  return (
    <div className={`videochat ${additionalClass}`}>
      {(() => {
        if (!active) {
          return (
            <Tooltip
              title={
                "Activate the videochat to see the people you are playing against. " +
                "This will help you call their bluffs!"
              }
              arrow={true}
              placement={"bottom"}
            >
              <div className={"button-border"}>
                <SecondaryButton
                  endIcon={<VideoCameraFront />}
                  action={() => setActive(true)}
                >
                  Activate video chat
                </SecondaryButton>
              </div>
            </Tooltip>
          )
        }
        return (
          <div className={"video-container"}>
            <Tooltip title={"Close the Video chat"}>
              <div className={"close-video-chat"}>
                <SecondaryButton
                  action={() => setActive(false)}
                  style={{
                    minWidth: "0",
                  }}
                >
                  <Close />
                </SecondaryButton>
              </div>
            </Tooltip>
            <JitsiMeeting
              roomName={game.videoChatName}
              configOverwrite={jitsiConfig}
              userInfo={{
                displayName: me.name,
                email: "",
              }}
              interfaceConfigOverwrite={{
                filmStripOnly: true,
                SHOW_CHROME_EXTENSION_BANNER: false,
                VIDEO_QUALITY_LABEL_DISABLED: true,
                SHOW_JITSI_WATERMARK: false,
              }}
              getIFrameRef={(iframe) => {
                iframe.style.objectFit = "fill"
                iframe.style.height = "100%"
                iframe.style.width = "100%"
              }}
            />
          </div>
        )
      })()}
    </div>
  )
})
