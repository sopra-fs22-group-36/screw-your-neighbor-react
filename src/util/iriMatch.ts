import { Link } from "../generated"
import { toIri } from "./toIri"

function toLink(iriOrString: string | Link): Link {
  if (typeof iriOrString === "string") {
    return {
      href: iriOrString,
    }
  }
  return iriOrString
}

export function iriMatch(iri1: string | Link, iri2: string | Link) {
  const link1 = toIri(toLink(iri1)).replace("?projection=embed", "")
  const link2 = toIri(toLink(iri2)).replace("?projection=embed", "")

  return link1 === link2
}
