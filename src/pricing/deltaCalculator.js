const calcDelta = async (prices) => {
  const [originalPrice, newPrice] = await prices
  
  return 1 - (originalPrice / newPrice)
}

const flagDeviation = threshold => async (deviation) => {
  const measure = await deviation
  const neg = measure < 0
  const absMeasure = Math.abs(measure)

  if (absMeasure > threshold) {
    return [true, neg, absMeasure] 
  }

  return [false, neg, absMeasure]
}

export {
  calcDelta,
  flagDeviation,
}