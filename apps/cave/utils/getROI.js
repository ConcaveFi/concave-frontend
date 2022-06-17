/**
 * Take cnvMarketPrice and bondSpotPrice to calculate ROI
 * @param {string} cnvMarketPrice
 * @param {string} bondSpotPrice
 * @returns {string} Returns calculated ROI
 */
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
