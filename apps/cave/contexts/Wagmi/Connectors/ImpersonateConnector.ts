import type WalletConnectProvider from '@walletconnect/ethereum-provider'
import { ethers, providers } from 'ethers'
import { getAddress, hexValue } from 'ethers/lib/utils'
import { chain } from 'wagmi'
import {
  Connector,
  normalizeChainId,
  ProviderRpcError,
  UserRejectedRequestError,
} from '@wagmi/core'

type WalletConnectOptions = ConstructorParameters<typeof WalletConnectProvider>[0]

type WalletConnectSigner = providers.JsonRpcSigner

export class ImpersonateConnector extends Connector<
  ethers.providers.StaticJsonRpcProvider,
  WalletConnectOptions,
  WalletConnectSigner
> {
  public static ID = 'impersonateConnect'
  id = ImpersonateConnector.ID
  name = 'Impersonate'
  wcLink?: { universal?: string; native?: string }
  readonly ready = true
  private address: string;
  #provider?: ethers.providers.StaticJsonRpcProvider
  constructor() {
    super({ chains: [chain.localhost], options: { qrcode: false, rpc: chain.localhost.rpcUrls.default } })
    const isServer = typeof window === 'undefined'
    if (!isServer) {
      this.connect({ chainId: chain.localhost.id })
    }
  }
  public setAddresss = (address: string) => {
    if (!ethers.utils.isAddress(address)) return
    sessionStorage.setItem(ImpersonateConnector.ID, address)
    this.address = address
  }
  async connect({ chainId }: { chainId?: number } = {}) {
    const currentConnectedAddress: string = sessionStorage.getItem(ImpersonateConnector.ID)
    if (currentConnectedAddress) {
      this.address = currentConnectedAddress
    } else {
      await new Promise((resolve) => {
        if (currentConnectedAddress) resolve(true)
        const interval = setInterval(() => {
          if (this.address) {
            clearInterval(interval)
            resolve(this.address)
          }
        }, 100)
      });
    }
    try {
      const provider = await this.getProvider({ chainId, create: true })
      provider.on('accountsChanged', this.onAccountsChanged)
      provider.on('chainChanged', this.onChainChanged)
      provider.on('disconnect', this.onDisconnect)
      const account = getAddress(this.address as string)
      const id = await this.getChainId()
      const unsupported = this.isChainUnsupported(id)
      return {
        account,
        chain: { id, unsupported },
        provider: this.getProvider()
      }
    } catch (error) {
      if (/user closed modal/i.test((error as ProviderRpcError).message))
        throw new UserRejectedRequestError(error)
      throw error
    }
  }

  async disconnect() {
    sessionStorage.removeItem(ImpersonateConnector.ID)
    this.address = ''
    const provider = await this.getProvider()
    provider.removeListener('accountsChanged', this.onAccountsChanged)
    provider.removeListener('chainChanged', this.onChainChanged)
    provider.removeListener('disconnect', this.onDisconnect)
    typeof localStorage !== 'undefined' && localStorage.removeItem('walletconnect')
  }

  async getAccount() {
    return getAddress(this.address)
  }

  async getChainId() {
    const chainId = normalizeChainId(chain.localhost.id)
    return chainId
  }

  async getProvider({ create }: { chainId?: number; create?: boolean } = {}) {
    if (!this.#provider || create) {
      this.#provider = new ethers.providers.StaticJsonRpcProvider(chain.localhost.rpcUrls.default)
    }
    return this.#provider
  }

  async getSigner({ chainId }: { chainId?: number } = {}) {
    const [provider] = await Promise.all([
      this.getProvider({ chainId }),
    ])
    await new Promise((resolve) => { setTimeout(() => resolve(1), 3000) })
    await provider.send("hardhat_impersonateAccount", [this.address])
    return provider.getSigner(this.address);
  }

  async isAuthorized() {
    try {
      const account = await this.getAccount()
      return !!account
    } catch {
      return false
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
