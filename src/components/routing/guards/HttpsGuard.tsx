import * as React from "react"

export type HttpsGuardProps = {
  children: React.ReactNode
}

const isLocalHost = (hostname) =>
  !!(
    hostname === "localhost" ||
    hostname === "[::1]" ||
    hostname.match(/^127(?:\.(?:25[0-5]|2[0-4]\d|[01]?\d\d?)){3}$/)
  )

export const HttpsGuard = (props: HttpsGuardProps) => {
  if (
    typeof window !== "undefined" &&
    window.location &&
    window.location.protocol === "http:" &&
    !isLocalHost(window.location.hostname)
  ) {
    window.location.href = window.location.href.replace(/^http(?!s)/, "https")
    return null
  }

  return <>{props.children}</>
}
