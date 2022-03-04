// import jest from 'jest'
import { calcDelta, flagDeviation } from '../src/pricing/deltaCalculator'

describe('deltaCalculator tests', () => {
  test('calcDelta calculates correctly', async () => {
    const positivePriceIncrease = [['BTC', 1, 1.1], ['USD', 1, 1.1]]
    const negativePriceIncrease = [['BTC', 1, 0.9], ['USD', 1, 0.9]]

    const posCalcResult = await calcDelta(positivePriceIncrease)
    const negCalcResult = await calcDelta(negativePriceIncrease)

    expect(posCalcResult).toEqual([['BTC',0.09090909090909094], ['USD',0.09090909090909094]])
    expect(negCalcResult).toEqual([['BTC', -0.11111111111111116], ['USD', -0.11111111111111116]])
  })

  test('flagDeviation properly detects deviations', async () => {
    const flagger = flagDeviation(0.0001)

    const posFlagged = [['BTC', 0.01]]
    const negFlagged = [['BTC', -0.01]]
    const posNonFlagged = [['BTC', 0.00001]]
    const negNonFlagged = [['BTC', -0.00001]]

    const resultPos = await flagger(Promise.resolve(posFlagged))
    const resultNeg = await flagger(Promise.resolve(negFlagged))
    const nonDeviatingPos = await flagger(Promise.resolve(posNonFlagged))
    const nonDeviatingNeg = await flagger(Promise.resolve(negNonFlagged))

    expect(resultPos).toStrictEqual([['BTC', true, false, 0.01]])
    expect(resultNeg).toStrictEqual([['BTC', true, true, 0.01]])
    expect(nonDeviatingPos).toStrictEqual([['BTC', false, false, 0.00001]])
    expect(nonDeviatingNeg).toStrictEqual([['BTC', false, true, 0.00001]])
  })
})