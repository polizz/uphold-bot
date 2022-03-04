# Upload BTC Price Bot


# Features
- Retrieves Uphold BTC-USC prices every 5 seconds
- Alerts console when price moves above or below 0.01% threshold

# Install
1. `git clone`
2. `npm install`

# Usage
`$ node run dev` or `$ node run start`

You can also override the default 5 second refresh interval by providing an override argument:

6 second refresh: 
`$ node run dev -- -i 6000`