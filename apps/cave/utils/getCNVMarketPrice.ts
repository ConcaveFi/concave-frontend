/**
 * Helper to set CNV Market based on BondSpotPrice.
 */
export default function getCNVMarketPrice() {
  return fetch('/api/cnv')
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw Error(res.statusText)
      }
    })
    .then((data) => JSON.parse(data))
    .then((data) => {
      if (data?.data) {
        return data.data.last
      } else {
        throw Error('no data.data')
      }
    })
    .catch((e) => {
      console.error(e)
      return false
    })
}
