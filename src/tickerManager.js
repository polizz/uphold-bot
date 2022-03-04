import flow from 'lodash/flow'
import getPrices from './api/upholdTicker'
import { calcDelta, flagDeviation } from './pricing/deltaCalculator'

const store = {}

const extractPrice = (symbol, cache) => async (prices) => {
  const symbolPrice = (await prices)
    .find(i => i.pair === symbol)?.bid || 0

  return [
    cache[symbol],
    Number.parseFloat(await symbolPrice),
  ]
}

const addTicker = async (symbol, threshold, interval, logCallback) => {
  const extractor = extractPrice(symbol, store)

  try {
    store[symbol] = (await extractor(getPrices()))[1]
  } catch {
    throw new Error('Could not fetch initial currency data')
  }

  const tickerFlow = flow(
    getPrices,
    extractor,
    calcDelta,
    flagDeviation(threshold),
    logCallback,
  )

  setInterval(tickerFlow, interval)
}

export default addTicker
export {
  extractPrice,
}
