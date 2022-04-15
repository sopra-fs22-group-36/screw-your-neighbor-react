import { Link } from "../generated"

export function extractId(link: Link) {
  const extractId = /\/(\d+)/
  const match = link.href.match(extractId)
  return match[1]
}
