import { observer } from "mobx-react-lite"
import * as React from "react"
import { useEffect, useState } from "react"
import { usePlayers } from "../../../hooks/api/usePlayers"
import { useNavigate } from "react-router-dom"
import { Paths } from "../routers/Paths"
import { Loading } from "../../ui/Loading"
import { useLocation } from "react-router"

export type SessionGuardProps = {
  children: React.ReactNode
}

export const SessionGuard = observer((props: SessionGuardProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { me, fetchingSession, hasCurrentSession } = usePlayers()

  const [sessionFetched, setSessionFetched] = useState(me !== null)

  useEffect(() => {
    if (!sessionFetched && !fetchingSession) {
      //TODO add cancel possibility
      hasCurrentSession()
        .then((value) => {
          if (!value && location.pathname !== Paths.CREATE_PLAYER) {
            navigate(
              location.pathname === "/"
                ? Paths.CREATE_PLAYER
                : Paths.CREATE_PLAYER +
                    "/?redirectTo=" +
                    encodeURI(location.pathname)
            )
          }
        })
        .finally(() => setSessionFetched(true))
    }
  }, [
    fetchingSession,
    hasCurrentSession,
    location.pathname,
    navigate,
    sessionFetched,
  ])

  return <Loading ready={sessionFetched}>{props.children}</Loading>
})
