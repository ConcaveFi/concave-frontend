/** Transform a wallet address
 *  {6first keys}{...}{4 keys}
 */
export function formatAddress(hash: string, length = 38): string {
  if (!hash) return ''
  return hash.replace(hash.substring(6, length), '...')
}
