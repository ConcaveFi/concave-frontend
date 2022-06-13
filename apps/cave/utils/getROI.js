export default function getROI(cnvMarketPrice, bondSpotPrice) {
  const bondSpotPriceInt = +bondSpotPrice
  const cnvMarketPriceInt = +cnvMarketPrice
  console.log("bond spot price int", bondSpotPriceInt, "cnvMarketPriceInt", cnvMarketPriceInt)
  return `${
    cnvMarketPrice > 0 && bondSpotPriceInt
      ? ((1 - bondSpotPriceInt / cnvMarketPriceInt) * 100).toFixed(2)
      : '-'
  }%`
}
