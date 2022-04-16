import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import React, { useState } from "react"
import { useCurrentGame } from "../../../../../hooks/api/useCurrentGame"
import insertCoin from "../../../../../img/icons/insert-coin.png"
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined"

export const ScoreAnnouncing = () => {
  const { loading, announceScore, yourActiveHand } = useCurrentGame()
  const [score, setScore] = useState(yourActiveHand?.announcedScore)

  const clickAnnounceScore = async () => {
    await announceScore(score)
  }

  const scoreAvailable = score !== null && score !== undefined
  return (
    <Box
      className={"score-announcing"}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        bgcolor: "grey.400",
        overflow: "hidden",
        borderRadius: "12px",
        boxShadow: 1,
        fontWeight: "bold",
      }}
    >
      <Box
        component="img"
        sx={{
          height: 100,
          width: 100,
          padding: 1,
        }}
        alt="Announcing my scores"
        src={insertCoin}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "center", md: "flex-start" },
          m: 1,
          minWidth: { md: 180 },
        }}
      >
        <Box component="span" sx={{ fontSize: 16, mt: 1 }}>
          <TextField
            id="outlined-number"
            label="Number"
            type="number"
            style={{ width: 140 }}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            value={scoreAvailable ? score : ""}
            inputProps={{
              min: 0,
            }}
            onChange={(event) => {
              setScore(parseInt(event.target.value))
            }}
          />
        </Box>
        <Box component="span" sx={{ color: "primary.main", fontSize: 22 }}>
          <Button
            disabled={score === null || loading}
            variant="contained"
            startIcon={<CampaignOutlinedIcon fontSize="large" />}
            onClick={clickAnnounceScore}
          >
            Announce
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default ScoreAnnouncing
