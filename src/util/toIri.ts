import { Link } from "../generated"
import { getDomain } from "../api/api"

export function toIri(link: Link) {
  const removedDomain = link.href.replace(getDomain(), "")
  if (!link.templated) {
    return removedDomain
  }
  return removedDomain.replace("{?projection}", "?projection=embed")
}
