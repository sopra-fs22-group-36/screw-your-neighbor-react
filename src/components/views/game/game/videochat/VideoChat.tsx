import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { usePlayers } from "../../../../../hooks/api/usePlayers"
import { useCurrentGame } from "../../../../../hooks/api/useCurrentGame"
import Button from "@mui/material/Button"
import { VideoCameraFront } from "@mui/icons-material"
import { JitsiMeeting } from "@jitsi/react-sdk"
import "./VideoChat.scss"

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
            <div className={"button-border"}>
              <Button
                className={"toggle-camera"}
                variant="contained"
                endIcon={<VideoCameraFront />}
                onClick={() => setActive(true)}
              >
                Activate video chat
              </Button>
            </div>
          )
        }
        return (
          <div className={"video-container"}>
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

            <div> </div>
            <Button
              className={"toggle-camera"}
              variant="contained"
              endIcon={<VideoCameraFront />}
              onClick={() => setActive(false)}
            >
              End video chat
            </Button>
          </div>
        )
      })()}
    </div>
  )
})
