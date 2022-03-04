import { extractPrices, setInitialPrices } from '../src/tickerManager'

jest.mock('../src/api/upholdTicker', () => {
  const originalModule = jest.requireActual('../src/api/upholdTicker')
  
  const pricesResponse = [
    {
      "ask": "1.0",
      "bid": "2.0",
      "currency": "TEST",
      "pair": "USD"
    },
    {
      "ask": "1.0",
      "bid": "2.0",
      "currency": "TEST",
      "pair": "BTC"
    },
  ]

  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(() => Promise.resolve(pricesResponse)),
    foo: 'mocked foo',
  }
})

describe('tickerManager tests', () => {
  test('setInitialPrices sets initial prices', async () => {
    const symbols = ['USD', 'BTC']
    const store = { 'USD': 0, 'BTC': 0 }
    await setInitialPrices(symbols, store)

    expect(store).toEqual({ 'USD': 2.0, 'BTC': 2.0 })
  })

  test('extractPrice returns prices', async () => {
    const store = { 'TEST-USD': 0, 'BTC': 0 }
    const extractor = extractPrices(['TEST-USD', 'BTC'], store)
    const prices = [
      {
        "ask": "1.0",
        "bid": "2.0",
        "currency": "TEST",
        "pair": "TEST-USD"
      },
      {
        "ask": "1.0",
        "bid": "2.0",
        "currency": "TEST",
        "pair": "BTC"
      },
    ]

    const price = await extractor(Promise.resolve(prices))

    expect(price).toEqual([['TEST-USD', 0, 2.0], ['BTC', 0, 2.0]])
  })
})