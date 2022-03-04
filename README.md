# Uphold BTC Price Bot


# Features
- Retrieves Uphold BTC-USC prices every 5 seconds (adjustable)
- Alerts console when price moves above or below 0.01% threshold (adjustable)

# Install
1. `git clone https://github.com/polizz/uphold-bot`
2. `npm install`

# Usage
`$ node run dev` 

or

`$ node run start`

# Arguments
You can also override the default 5 second refresh interval by providing an override argument:

6 second refresh: 
`$ node run dev -- --interval 6000`

You can monitor other BTC pairs with:
`$ node run dev -- --pair 'AAPL-BTC ADBE-BTC AMD-BTC'`

You can alert on different percentage above/below start with:
`$ node run dev -- --threshold 0.0000001`