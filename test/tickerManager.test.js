import { extractPrice } from '../src/tickerManager'

describe('tickerManager tests', () => {
  test('extractPrice returns prices', async () => {
    const store = { 'TEST-USD': 0 }
    const extractor = extractPrice('TEST-USD', store)
    const prices = [
      {
        "ask": "1.0",
        "bid": "2.0",
        "currency": "TEST",
        "pair": "TEST-USD"
      },
    ]

    const price = await extractor(Promise.resolve(prices))

    expect(price).toEqual([0, 2.0])
  })
})