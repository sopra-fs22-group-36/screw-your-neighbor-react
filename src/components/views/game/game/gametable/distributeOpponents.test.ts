import { distributeOpponents } from "./distributeOpponents"

describe("distributeOpponents", () => {
  it("throws an error if me is undefined or null", () => {
    expect(() => distributeOpponents(null, [])).toThrow(
      "me must be defined and have self link"
    )

    expect(() => distributeOpponents(undefined, [])).toThrow(
      "me must be defined and have self link"
    )
  })

  it("throws an error if me has no self link", () => {
    expect(() => distributeOpponents({}, [])).toThrow(
      "me must be defined and have self link"
    )
  })

  it("returns all slots as empty when allParticipations is empty", () => {
    const me = createParticipation("/participations/1")
    expect(distributeOpponents(me, [])).toStrictEqual({})
  })

  describe("puts opponents at correct slot", () => {
    const cases = [
      {
        me: createParticipation(null, 1),
        numOpponents: 1,
        expected: {
          slot3: createParticipation(null, 2),
        },
      },
      {
        me: createParticipation(null, 2),
        numOpponents: 1,
        expected: {
          slot3: createParticipation(null, 1),
        },
      },
      {
        me: createParticipation(null, 1),
        numOpponents: 2,
        expected: {
          slot2: createParticipation(null, 2),
          slot3: createParticipation(null, 3),
        },
      },
      {
        me: createParticipation(null, 2),
        numOpponents: 2,
        expected: {
          slot2: createParticipation(null, 3),
          slot3: createParticipation(null, 1),
        },
      },
      {
        me: createParticipation(null, 3),
        numOpponents: 2,
        expected: {
          slot2: createParticipation(null, 1),
          slot3: createParticipation(null, 2),
        },
      },
      {
        me: createParticipation(null, 1),
        numOpponents: 3,
        expected: {
          slot2: createParticipation(null, 2),
          slot3: createParticipation(null, 3),
          slot4: createParticipation(null, 4),
        },
      },
      {
        me: createParticipation(null, 2),
        numOpponents: 3,
        expected: {
          slot2: createParticipation(null, 3),
          slot3: createParticipation(null, 4),
          slot4: createParticipation(null, 1),
        },
      },
      {
        me: createParticipation(null, 4),
        numOpponents: 3,
        expected: {
          slot2: createParticipation(null, 1),
          slot3: createParticipation(null, 2),
          slot4: createParticipation(null, 3),
        },
      },
      {
        me: createParticipation(null, 1),
        numOpponents: 4,
        expected: {
          slot1: createParticipation(null, 2),
          slot2: createParticipation(null, 3),
          slot3: createParticipation(null, 4),
          slot4: createParticipation(null, 5),
        },
      },
      {
        me: createParticipation(null, 3),
        numOpponents: 4,
        expected: {
          slot1: createParticipation(null, 4),
          slot2: createParticipation(null, 5),
          slot3: createParticipation(null, 1),
          slot4: createParticipation(null, 2),
        },
      },
      {
        me: createParticipation(null, 5),
        numOpponents: 4,
        expected: {
          slot1: createParticipation(null, 1),
          slot2: createParticipation(null, 2),
          slot3: createParticipation(null, 3),
          slot4: createParticipation(null, 4),
        },
      },
    ]

    cases.forEach((cases) => {
      const me = cases.me
      const meParticipationNumber = me.participationNumber
      const firstPart = `for ${cases.numOpponents} opponents`
      const secondPart = `when me has participationNumber ${meParticipationNumber}`
      it(`${firstPart} ${secondPart}`, () => {
        const opponents = []
        for (let i = 1; opponents.length < cases.numOpponents; i++) {
          if (i === meParticipationNumber) {
            i++
          }
          opponents.push(createParticipation(`/participations/${i}`, i))
          if (i > cases.numOpponents) {
            i = i - cases.numOpponents
          }
        }
        const allParticipations = [me, ...opponents]

        expect(distributeOpponents(me, allParticipations)).toStrictEqual(
          cases.expected
        )
      })
    })
  })
})

function createParticipation(href?: string, participationNumber?: number) {
  const selfLink = href ?? `/participations/${participationNumber}`
  return {
    participationNumber: participationNumber,
    _links: {
      self: {
        href: selfLink,
      },
    },
  }
}
