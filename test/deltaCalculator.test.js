// import jest from 'jest'
import { calcDelta, flagDeviation } from '../src/pricing/deltaCalculator'

describe('deltaCalculator tests', () => {
  test('calcDelta calculates correctly', async () => {
    const positivePriceIncrease = [1, 1.1]
    const negativePriceIncrease = [1, 0.9]

    const posCalcResult = await calcDelta(positivePriceIncrease)
    const negCalcResult = await calcDelta(negativePriceIncrease)

    expect(posCalcResult).toEqual(0.09090909090909094)
    expect(negCalcResult).toEqual(-0.11111111111111116)
  })

  test('flagDeviation properly detects deviations', async () => {
    const flagger = flagDeviation(0.0001)

    const resultPos = await flagger(Promise.resolve(0.01))
    const resultNeg = await flagger(Promise.resolve(-0.01))
    const nonDeviatingPos = await flagger(Promise.resolve(0.00001))
    const nonDeviatingNeg = await flagger(Promise.resolve(-0.00001))

    expect(resultPos).toStrictEqual([true, false, 0.01])
    expect(resultNeg).toStrictEqual([true, true, 0.01])
    expect(nonDeviatingPos).toStrictEqual([false, false, 0.00001])
    expect(nonDeviatingNeg).toStrictEqual([false, true, 0.00001])
  })
})