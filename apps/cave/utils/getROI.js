export default function getROI(cnvMarketPrice, bondSpotPrice) {
  const bondSpotPriceInt = +bondSpotPrice
  console.log(bondSpotPriceInt, 'bondSpotPrice recieved by function')
  const cnvMarketPriceInt = +cnvMarketPrice
  console.log(cnvMarketPriceInt, 'marked price recieved by function')
  return `${
    cnvMarketPrice > 0 && bondSpotPriceInt
      ? ((1 - bondSpotPriceInt / cnvMarketPriceInt) * 100).toFixed(2)
      : '-'
  }%`
}
