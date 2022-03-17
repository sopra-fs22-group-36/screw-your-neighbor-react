test('package-lock.json uses lockFileVersion 2', () => {
    const {lockfileVersion} = require('../package-lock.json')
    expect(lockfileVersion).toBe(2)
})
