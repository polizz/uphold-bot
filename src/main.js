import chalk from 'chalk'
import addTicker from './tickerManager'

const log = (symbol, neg, deviation) => {
  const style = neg ? chalk.red : chalk.green
  const sign = neg ? '-' : '+'

  // eslint-disable-next-line no-console
  console.log(`${chalk.bgRed.black('Price Deviation:')} ${chalk.bgYellow.black(symbol)} ${style(sign + deviation + '%')}`)
}

const consoleHandler = async(updates) => {
  try {
    const updatedPrices = await updates

    updatedPrices
      .filter(([, flagged]) => flagged)
      .forEach(([symbol, _, neg, deviation]) => {
        log(symbol, neg, deviation)
      })
  } catch (err) {
    console.error(chalk.redBright(`Error: ${err}`))
  }
}

const run = ({pairs, threshold, interval}) => {
  addTicker(pairs.split(' '), threshold, interval, consoleHandler)
}

export default run