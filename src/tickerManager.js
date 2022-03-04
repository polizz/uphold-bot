import flow from 'lodash/flow'
import getPrices from './api/upholdTicker'
import { calcDelta, flagDeviation } from './pricing/deltaCalculator'

const store = {}

const extractPrices = (symbols, cache) => async (prices) => {
  const awaitedPrices = await prices
  const newSymbolPrices = symbols.map(sym => {
    return [
      sym,
      cache[sym],
      Number.parseFloat(awaitedPrices.find(i => i.pair === sym)?.bid || 0),
    ]
  })

  return newSymbolPrices
}

const setInitialPrices = async (symbols, store) => {
  try {
    const initialPrices = await getPrices()

    symbols.forEach(sym => {
      store[sym] = Number.parseFloat(
        initialPrices.find(i => i.pair === sym)?.bid || 0
      )
    })

  } catch {
    throw new Error('Could not fetch initial currency data')
  }
}

const addTicker = async (symbols, threshold, interval, logCallback) => {
  const extractor = extractPrices(symbols, store)
  await setInitialPrices(symbols, store)

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
  extractPrices,
  setInitialPrices,
}
