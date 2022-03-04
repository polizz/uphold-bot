import arg from 'arg'
import main from './main'

const parseArgumentsIntoOptions = (rawArgs) => {
 const args = arg(
   {
     '--interval': Number,
     '-i': '--interval',
     '--threshold': Number,
     '-t': '--threshold',
     '--pairs': String,
     '-p': '--pairs',
   },
   {
     argv: rawArgs.slice(2),
   }
 )
 return {
   interval: args['--interval'] || 5000,
   threshold: args['--threshold'] || 0.01,
   pairs: args['--pairs'] || 'BTCUSD',
 }
}

const cli = (args) => {
 let options = parseArgumentsIntoOptions(args)
 console.warn(options)

 main(options)
}

cli(process.argv)