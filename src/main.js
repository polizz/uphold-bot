import chalk from 'chalk'
import addTicker from './tickerManager'

const log = (neg, deviation) => {
  const style = neg ? chalk.red : chalk.green
  const sign = neg ? '-' : '+'

  console.log(`${chalk.bgRed.black('Price Deviation:')} ${style(sign + deviation + '%')}`)
}

const consoleHandler = async(info) => {
  try {
    const [flagged, neg, deviation] = await info

    if (flagged) {
      log(neg, deviation)
    }
  } catch (err) {
    console.error(chalk.redBright(`Error: ${err}`))
  }
}

const run = ({threshold, interval}) => {
  addTicker('BTCUSD', threshold, interval, consoleHandler)
  console.log('run')
}

export default run