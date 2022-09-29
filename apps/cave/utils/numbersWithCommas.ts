/**
 * adds commas to javascript numbers, can handle numbers with decimals
 */
export function numberWithCommas(x: number | string): string {
  const parts = x.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}
