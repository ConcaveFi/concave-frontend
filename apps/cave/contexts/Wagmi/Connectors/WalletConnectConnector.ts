import type WalletConnectProvider from '@walletconnect/ethereum-provider'
import { providers } from 'ethers'
import { getAddress, hexValue } from 'ethers/lib/utils'

import {
  Chain,
  Connector,
  normalizeChainId,
  ProviderRpcError,
  SwitchChainError,
  UserRejectedRequestError,
} from '@wagmi/core'
import { uriToLink } from 'lib/walletConnect'
import { isMobile } from 'utils/isMobile'

/**
 * Wallets that support chain switching through WalletConnect
 * - imToken (token.im)
 * - MetaMask (metamask.io)
 * - Rainbow (rainbow.me)
 */
const switchChainAllowedRegex = /(imtoken|metamask|rainbow)/i

type WalletConnectOptions = ConstructorParameters<typeof WalletConnectProvider>[0]

type WalletConnectSigner = providers.JsonRpcSigner

export class ExtendedWalletConnectConnector extends Connector<
  WalletConnectProvider,
  WalletConnectOptions,
  WalletConnectSigner
> {
  id = 'walletConnect'
  name = 'WalletConnect'
  wcLink?: { universal?: string; native?: string }
  readonly ready = true

  #provider?: WalletConnectProvider

  constructor(config: { chains?: Chain[]; options?: WalletConnectOptions }) {
    super({ ...config, options: { qrcode: false, ...config.options } })
  }

  async connect({ chainId }: { chainId?: number } = {}) {
    try {
      //   let targetChainId = chainId
      //   if (!targetChainId) {
      //     const lastUsedChainId = getClient().lastUsedChainId
      //     if (lastUsedChainId && !this.isChainUnsupported(lastUsedChainId))
      //       targetChainId = lastUsedChainId
      //   }

      const provider = await this.getProvider({ chainId, create: true })
      provider.on('accountsChanged', this.onAccountsChanged)
      provider.on('chainChanged', this.onChainChanged)
      provider.on('disconnect', this.onDisconnect)

      // Defer message to the next tick to ensure wallet connect data (provided by `.enable()`) is available
      setTimeout(() => {
        this.emit('message', { type: 'connecting' })
        if (isMobile() && (this.wcLink?.universal || this.wcLink?.native)) {
          window.location.href = uriToLink(provider.connector.uri, this.wcLink)
        }
      }, 0)

      const accounts = await provider.enable()

      const account = getAddress(accounts[0] as string)
      const id = await this.getChainId()
      const unsupported = this.isChainUnsupported(id)

      // Not all WalletConnect options support programmatic chain switching
      // Only enable for wallet options that do
      const walletName = provider.connector?.peerMeta?.name ?? ''
      if (switchChainAllowedRegex.test(walletName))
        this.switchChain = this.#switchChain as typeof this.switchChain

      return {
        account,
        chain: { id, unsupported },
        provider: new providers.Web3Provider(<providers.ExternalProvider>provider),
      }
    } catch (error) {
      if (/user closed modal/i.test((error as ProviderRpcError).message))
        throw new UserRejectedRequestError(error)
      throw error
    }
  }

  async disconnect() {
    const provider = await this.getProvider()
    await provider.disconnect()

    provider.removeListener('accountsChanged', this.onAccountsChanged)
    provider.removeListener('chainChanged', this.onChainChanged)
    provider.removeListener('disconnect', this.onDisconnect)

    typeof localStorage !== 'undefined' && localStorage.removeItem('walletconnect')
  }

  async getAccount() {
    const provider = await this.getProvider()
    const accounts = provider.accounts
    // return checksum address
    return getAddress(accounts[0] as string)
  }

  async getChainId() {
    const provider = await this.getProvider()
    const chainId = normalizeChainId(provider.chainId)
    return chainId
  }

  async getProvider({ chainId, create }: { chainId?: number; create?: boolean } = {}) {
    // Force create new provider
    if (!this.#provider || chainId || create) {
      const rpc = !this.options?.infuraId
        ? this.chains.reduce((rpc, chain) => ({ ...rpc, [chain.id]: chain.rpcUrls.default }), {})
        : {}

      const WalletConnectProvider = (await import('@walletconnect/ethereum-provider')).default
      this.#provider = new WalletConnectProvider({
        ...this.options,
        chainId,
        rpc: { ...rpc, ...this.options?.rpc },
      })
    }

    return this.#provider
  }

  async getSigner({ chainId }: { chainId?: number } = {}) {
    const [provider, account] = await Promise.all([
      this.getProvider({ chainId }),
      this.getAccount(),
    ])
    return new providers.Web3Provider(<providers.ExternalProvider>provider, chainId).getSigner(
      account,
    )
  }

  async isAuthorized() {
    try {
      const account = await this.getAccount()
      return !!account
    } catch {
      return false
    }
  }

  async #switchChain(chainId: number) {
    const provider = await this.getProvider()
    const id = hexValue(chainId)

    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: id }],
      })
      return (
        this.chains.find((x) => x.id === chainId) ?? {
          id: chainId,
          name: `Chain ${id}`,
          network: `${id}`,
          rpcUrls: { default: '' },
        }
      )
    } catch (error) {
      const message = typeof error === 'string' ? error : (error as ProviderRpcError)?.message
      if (/user rejected request/i.test(message)) throw new UserRejectedRequestError(error)
      throw new SwitchChainError(error)
    }
  }

  protected onAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) this.emit('disconnect')
    else this.emit('change', { account: getAddress(accounts[0] as string) })
  }

  protected onChainChanged = (chainId: number | string) => {
    const id = normalizeChainId(chainId)
    const unsupported = this.isChainUnsupported(id)
    this.emit('change', { chain: { id, unsupported } })
  }

  protected onDisconnect = () => {
    this.emit('disconnect')
  }
}
