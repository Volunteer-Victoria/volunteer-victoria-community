import {max} from './max';

describe(max.name, () => {
    it('returns the max', () => {
        expect(max(1,2,3)).toBe(3)
    })
})