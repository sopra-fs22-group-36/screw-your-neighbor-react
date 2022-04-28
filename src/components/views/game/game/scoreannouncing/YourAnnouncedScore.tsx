import Box from "@mui/material/Box"
import insertCoin from "../../../../../img/icons/insert-coin.png"
import TextField from "@mui/material/TextField"
import React from "react"

export function YourAnnouncedScore(props: {
  scoreAvailable: boolean
  score: number
  onChange: (event) => void
}) {
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
            value={props.scoreAvailable ? props.score : ""}
            inputProps={{
              min: 0,
            }}
            onChange={props.onChange}
          />
        </Box>
      </Box>
    </Box>
  )
}
