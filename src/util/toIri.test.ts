import { getDomain } from "../api/api"
import { toIri } from "./toIri"

const domain = getDomain()

describe("applyLinkExtensionMethod", () => {
  it("allows Link.toIri to return usable iri", () => {
    const link = {
      href: `${domain}/entities/1`,
      templated: false,
    }

    expect(toIri(link)).toBe("/entities/1")
  })

  it("allows Link.toIri to return usable iri for templated link", () => {
    const link = {
      href: `${domain}/entities/1{?projection}`,
      templated: true,
    }

    expect(toIri(link)).toBe("/entities/1?projection=embed")
  })

  it("throws error if link is null", () => {
    expect(() => toIri(null)).toThrow(
      "Cannot read properties of null (reading 'href')"
    )
    expect(() => toIri(undefined)).toThrow(
      "Cannot read properties of undefined (reading 'href')"
    )
  })

  it("throws if href of link is null", () => {
    expect(() => toIri({})).toThrow(
      "Cannot read properties of undefined (reading 'replace')"
    )
  })
})
