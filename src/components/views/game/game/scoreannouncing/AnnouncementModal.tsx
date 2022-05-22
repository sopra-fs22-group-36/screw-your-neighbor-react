import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { useCurrentGame } from "../../../../../hooks/api/useCurrentGame"
import { range } from "../../../../../util/range"
import { Hand, Match } from "../../../../../generated"
import { iriMatch } from "../../../../../util/iriMatch"
import { delay } from "../../../../../util/timeout"
import { useParticipationAvatars } from "../../../../../hooks/useParticipationAvatars"
import BaseContainer from "../../../../ui/BaseContainer"
import { CardComponent } from "../../../../ui/CardComponent"
import { Chip, Grid, Modal, Tooltip } from "@mui/material"
import Button from "@mui/material/Button"
import "./AnnouncementModal.scss"
import LeaveButton from "../../../../ui/LeaveButton"

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
    <Tooltip
      title={
        !hand.announcedScore
          ? `Here you will see how many tricks ${hand.participation.player.name} expects to make.
             They have not voted yet!`
          : `${hand.participation.player.name} expects to win ${hand.announcedScore} tricks!`
      }
      arrow={true}
      enterDelay={750}
    >
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
    </Tooltip>
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
    cardHandMap,
    announceScore,
  } = useCurrentGame()

  const { getAvatarConfigFor } = useParticipationAvatars()

  const [matchForModal, setMatchForModal] = useState(activeMatch)

  const handSize = matchForModal.hands[0]?.cards.length || 0

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
  const activatedNumberInfo = !illegalNumber
    ? `Here you can choose how many tricks you think you will win!`
    : `Here you can choose how many tricks you think you will win! As per the rules you are not allowed to choose
         ${illegalNumber} as the total of announced tricks would equal the amount of cards!`

  useEffect(() => {
    const updateMatch = async () => {
      setMatchForModal(activeMatch)
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
      delay(800, null).then((_) => {
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
  let cards = []
  const isMatchNumber5 = activeMatch?.matchNumber === 5
  if (!isMatchNumber5) {
    cards = yourActiveHand?.cards.filter((value) => value.round === null)
  } else {
    const otherHands = activeMatch?.hands
    cards = otherHands.flatMap((enemyhands) => enemyhands.cards)
  }

  return (
    <Modal
      className={"announcement-modal"}
      open={matchForModal.matchState === matchState.ANNOUNCING}
      sx={{
        top: "40%",
      }}
      hideBackdrop={true}
    >
      <>
        <Grid container spacing={0} className={"second-row"}>
          <Grid item xs={6}>
            <BaseContainer>
              <h1>How many tricks will you make?</h1>
              <div className={"cards-and-buttons"}>
                <div className={"cards"}>
                  {cards.map((card) => {
                    const hand = cardHandMap[card._links.self.href]
                    const avatarConfig = getAvatarConfigFor(hand.participation)

                    const isOwnCard = iriMatch(
                      yourActiveHand?._links.self,
                      hand._links.self
                    )

                    const toolTipText = getCardToolTipText(
                      hand,
                      isMatchNumber5,
                      isOwnCard
                    )

                    return (
                      <Tooltip key={card._links.self.href} title={toolTipText}>
                        <div>
                          <CardComponent
                            card={card}
                            avatarConfig={isMatchNumber5 ? avatarConfig : null}
                          />
                        </div>
                      </Tooltip>
                    )
                  })}
                </div>
                <Tooltip
                  title={
                    !active
                      ? "It's not your turn to announce yet!"
                      : activatedNumberInfo
                  }
                  placement={"bottom"}
                  arrow={true}
                  enterDelay={750}
                >
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
                </Tooltip>
              </div>
            </BaseContainer>
          </Grid>
          <Grid item xs={6} className={"announced-score-list"}>
            <BaseContainer>
              <h1>Announced Scores</h1>
              <ul>
                {hands.map((hand) => {
                  return <HandRow key={hand._links.self.href} hand={hand} />
                })}
              </ul>
              <LeaveButton
                style={{ width: "25%", marginTop: "0%", color: "white" }}
              />
            </BaseContainer>
          </Grid>
        </Grid>
      </>
    </Modal>
  )
})

function getCardToolTipText(
  hand: Hand,
  isMatchNumber5: boolean,
  isOwnCard: boolean
) {
  if (!isMatchNumber5) {
    return ""
  }

  if (isOwnCard) {
    return "This is your card. You cannot see your own card in the 5th match."
  }
  const playerName = hand.participation.player.name
  return `This is the card of ${playerName}`
}
