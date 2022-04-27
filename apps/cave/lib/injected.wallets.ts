export const getWalletType = () => {
  if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    if (window.ethereum.isMetaMask) return 'Metamask'
    if (window.ethereum.isBraveWallet) return 'Brave'
    if (window.ethereum.isFrame) return 'Frame'
    if (window.ethereum.isTally) return 'Tally'
  }
  return 'Wallet'
}

/**
 * Check the user active Wallet to return an object {text: add to wallet, img: from public/assets}
 */
export const renderProviderText = (userWallet: string) => {
  if (userWallet !== undefined) {
    const providerTextList = {
      Metamask: { text: 'to Metamask', img: '/assets/connectors/metamask.png' },
      Brave: { text: 'to Brave Wallet', img: '/assets/connectors/brave.png' },
      Frame: { text: 'to Frame', img: '/assets/connectors/frame.png' },
      Tally: { text: 'to Tally', img: '/assets/connectors/tally.png' },
      Wallet: { text: 'to Wallet', img: '/assets/connectors/injected.png' },
    }
    return (providerTextList as any)[getWalletType()]
  } else {
    return 'Connect wallet'
  }
}
