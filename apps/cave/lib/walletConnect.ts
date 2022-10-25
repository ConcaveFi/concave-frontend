type WalletConnectRegistryData = {
  name: string
  description: string
  /*
    wallet website
  */
  homepage: string
  /*
    wallet supported chains
  */
  chains: string[]
  app_type: 'wallet' | 'hybrid'
  image_id: string
  image_url: {
    sm: string
    md: string
    lg: string
  }
  /*
    app download link (app store, etc)
  */
  app: {
    browser: string
    ios: string
    android: string
    mac: string
    windows: string
    linux: string
  }
  mobile: { native: string; universal: string }
  desktop: { native: string; universal: string }
  metadata: { shortName: string; colors: { primary: string; secondary: string } }
}

const walletRegistryURL = `https://registry.walletconnect.org/data/wallets.json`

const weirdRegistryWalletsWeWillIgnore = ['Wallet 3', 'Bitpie', 'Wallet3']
export const fetchWalletConnectRegistry = async (): Promise<WalletConnectRegistryData[]> => {
  const registry = await fetch(walletRegistryURL).then((res) => res.json())
  return (Object.values(registry) as WalletConnectRegistryData[]).filter(
    ({ name }) => !!name && !weirdRegistryWalletsWeWillIgnore.includes(name),
  )
}

export function uriToLink(uri: string, wcLinks: Partial<WalletConnectRegistryData['mobile']>) {
  const encodedUri = encodeURIComponent(uri)
  const { universal: universalLink, native: deepLink } = wcLinks

  if (universalLink) return `${universalLink}/wc?uri=${encodedUri}`
  if (deepLink) return `${deepLink}${deepLink.endsWith(':') ? '//' : '/'}wc?uri=${encodedUri}`
}
