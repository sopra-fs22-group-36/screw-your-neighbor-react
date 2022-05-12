import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { useCurrentGame } from "../../../../../hooks/api/useCurrentGame"
import { range } from "../../../../../util/range"
import { Hand, Match } from "../../../../../generated"
import { iriMatch } from "../../../../../util/iriMatch"
import { delay } from "../../../../../util/timeout"
import BaseContainer from "../../../../ui/BaseContainer"
import { CardComponent } from "../../../../ui/CardComponent"
import { Chip, Grid, Modal } from "@mui/material"
import Button from "@mui/material/Button"
import "./AnnouncementModal.scss"
import LeaveButton from "./LeaveButton"

const matchState = Match.matchState

type HandRowProps = {
  hand: Hand
}

const HandRow = observer((props: HandRowProps) => {
  const { hand } = props
  const { myParticipation } = useCurrentGame()
  const participationLink = hand.participation._links.self

  const isOwnParticipation = iriMatch(
    participationLink,
    myParticipation._links.self
  )
  return (
    <li className={isOwnParticipation ? "own-participation" : ""}>
      <span className={"player-name"}>{hand.participation.player.name}</span>
      {hand.turnActive && (
        <Chip
          color={"info"}
          label={"Announcing"}
          className={"chip"}
          size={"small"}
        ></Chip>
      )}
      <span className={"announced-score"}>{hand.announcedScore}</span>
    </li>
  )
})

export const AnnouncementModal = observer(() => {
  const {
    loading,
    sortedMatches,
    activeMatch,
    yourActiveHand,
    sumOfAnnouncedScores,
    lastPlayerAnnouncing,
    announceScore,
  } = useCurrentGame()

  const [matchForModal, setMatchForModal] = useState(activeMatch)
  const [yourHand, setYourHand] = useState(yourActiveHand)

  const handSize = matchForModal.hands[0]?.cards.length || 0

  let cards = []
  if (activeMatch.matchNumber !== 5) {
    cards = yourHand?.cards.filter((value) => value.round === null)
  } else {
    const otherHands = activeMatch?.hands
      .filter(
        (value) => !iriMatch(yourActiveHand._links.self, value._links.self)
      )
      .slice(-1)[0]
    cards = otherHands.cards

    console.log(JSON.stringify(cards)) //TODO:  REMOVE AFTER TESTING
  }

  const observableMatch = sortedMatches.filter((match) =>
    iriMatch(match._links.self, matchForModal._links.self)
  )[0]

  const hands = observableMatch.hands
    .slice()
    .sort(
      (a, b) =>
        a.participation.participationNumber -
        b.participation.participationNumber
    )

  const active = !loading && yourActiveHand.turnActive
  //Validate the illegal announcing score only for the last player in the queue
  const illegalNumber = lastPlayerAnnouncing
    ? yourActiveHand.cards.length - sumOfAnnouncedScores
    : null

  useEffect(() => {
    const updateMatch = () => {
      setMatchForModal(activeMatch)
      setYourHand(yourActiveHand)
    }
    const matchStateChangedToPlaying =
      matchForModal.matchState === matchState.ANNOUNCING &&
      activeMatch.matchState === matchState.PLAYING

    const matchStateChangedToAnnouncing =
      matchForModal.matchState === matchState.PLAYING &&
      activeMatch.matchState === matchState.ANNOUNCING

    const matchChanged = !iriMatch(
      matchForModal._links.self,
      activeMatch._links.self
    )
    if (
      matchStateChangedToPlaying ||
      (matchStateChangedToAnnouncing && matchChanged)
    ) {
      let cancelled = false
      delay(1000, null).then((_) => {
        cancelled && updateMatch()
      })
      return () => {
        cancelled = true
      }
    }
  }, [
    activeMatch,
    activeMatch._links.self,
    activeMatch.matchState,
    matchForModal._links.self,
    matchForModal.matchState,
    yourActiveHand,
  ])

  return (
    <Modal
      className={"announcement-modal"}
      open={matchForModal.matchState === matchState.ANNOUNCING}
    >
      <>
        <Grid container spacing={0} className={"top-row"}></Grid>
        <Grid container spacing={0} className={"second-row"}>
          <Grid item xs={6}>
            <BaseContainer>
              <h1>How many tricks will you make?</h1>
              <div className={"cards-and-buttons"}>
                <div className={"cards"}>
                  {cards.map((card) => (
                    <div key={card._links.self.href}>
                      <CardComponent card={card} />
                    </div>
                  ))}
                </div>
                <div className={"announce-buttons"}>
                  {range(0, handSize + 3).map((number) => {
                    return (
                      <Button
                        key={number}
                        disabled={!active || illegalNumber === number}
                        onClick={(_) => announceScore(number)}
                        variant={"contained"}
                      >
                        {number}
                      </Button>
                    )
                  })}
                </div>
              </div>
            </BaseContainer>
          </Grid>
          <Grid item xs={6} className={"announced-score-list"}>
            <BaseContainer>
              <h1>Announced Scores</h1>

              <ul className={"player-list"}>
                {hands.map((hand) => {
                  return <HandRow key={hand._links.self.href} hand={hand} />
                })}
              </ul>
              <LeaveButton />
            </BaseContainer>
          </Grid>
        </Grid>
      </>
    </Modal>
  )
})
