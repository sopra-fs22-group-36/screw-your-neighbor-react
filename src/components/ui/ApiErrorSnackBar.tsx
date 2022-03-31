import React, { useContext } from "react"
import { appContext } from "../../AppContext"
import { Alert, IconButton, Snackbar } from "@mui/material"
import { observer } from "mobx-react-lite"
import CloseIcon from "@mui/icons-material/Close"

export const ApiErrorSnackBar = observer(() => {
  const appStore = useContext(appContext)
  const errorMessage = appStore.errorMessage

  const onClose = () => appStore.setErrorMessage(null)

  return (
    <Snackbar
      open={!!errorMessage}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{
        horizontal: "center",
        vertical: "top",
      }}
    >
      <Alert severity={"error"}>
        <span>{errorMessage}</span>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Alert>
    </Snackbar>
  )
})
