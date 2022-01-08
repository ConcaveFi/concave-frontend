// Extends `window` to add `ethereum`.
declare global {
  interface Window {
    ethereum: any
  }
}

export const switchNetwork = (chainId = '0x1') =>
  window.ethereum?.request({ method: 'wallet_switchEthereumChain', params: [{ chainId }] })

export const addNetwork = (params) =>
  window.ethereum?.request({ method: 'wallet_addEthereumChain', params })
