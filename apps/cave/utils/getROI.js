export default function getROI(cnvMarketPrice, bondSpotPrice) {
  const bondSpotPriceInt = +bondSpotPrice
  const cnvMarketPriceInt = +cnvMarketPrice
  return `${
    cnvMarketPrice > 0 && bondSpotPriceInt
      ? ((1 - bondSpotPriceInt / cnvMarketPriceInt) * 100).toFixed(2)
      : '-'
  }%`
}
