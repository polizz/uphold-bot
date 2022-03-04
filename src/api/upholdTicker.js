import axios from 'axios'

const URL = `https://api.uphold.com/v0/ticker/BTC`

const getTickerPrices = async () => {
  const response = await axios.get(URL)
  return response.data
}

export default getTickerPrices