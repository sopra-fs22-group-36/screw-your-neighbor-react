import React, { useState } from "react"
import { useCurrentGame } from "../../../../../hooks/api/useCurrentGame"
import { observer } from "mobx-react-lite"
import { YourAnnouncedScore } from "./YourAnnouncedScore"
import { AnnouncementModal } from "./AnnouncementModal"

export const ScoreAnnouncing = observer(() => {
  const { yourActiveHand } = useCurrentGame()
  const [score, setScore] = useState(yourActiveHand?.announcedScore)

  const scoreAvailable = score !== null && score !== undefined
  return (
    <div className={"score-announcing"}>
      <YourAnnouncedScore
        scoreAvailable={scoreAvailable}
        score={score}
        onChange={(event) => {
          setScore(parseInt(event.target.value))
        }}
      />
      <AnnouncementModal />
    </div>
  )
})

export default ScoreAnnouncing
