import {getTz} from './get-tz'

describe(getTz.name, () => {
    it('returns the timezone', () => {
        expect(getTz()).toBe(process.env.tz)
    })
})