const calcDelta = async (prices) => {
  const allPrices = await prices

  const deltas = allPrices.map(([symbol, originalPrice, newPrice]) => {
    return [symbol, 1 - (originalPrice / newPrice)]
  })

  return deltas
}

const flagDeviation = threshold => async (deviations) => {
  const measures = await deviations

  const updates = measures.map(([symbol, measure]) => {
    const neg = measure < 0
    const absMeasure = Math.abs(measure)
  
    if (absMeasure > threshold) {
      return [symbol, true, neg, absMeasure] 
    }
  
    return [symbol, false, neg, absMeasure]
  })

  return updates
}

export {
  calcDelta,
  flagDeviation,
}