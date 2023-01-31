import { EventEmitter } from 'eventemitter3'
import { ethers } from 'ethers'
import { getAddress } from 'ethers/lib/utils'
import { ConnectorData } from 'wagmi'
import { localhost } from 'wagmi/chains'
import { normalizeChainId } from '@wagmi/core'

class StaticJsonRpcProvider extends ethers.providers.StaticJsonRpcProvider {}

export type ImpersonateConnectorEvents = {
  changeAddress(address: string): void
  change(data: ConnectorData<StaticJsonRpcProvider>): void
  connect(data: ConnectorData<StaticJsonRpcProvider>): void
  message({ type, data }: { type: string; data?: unknown }): void
  disconnect(): void
  error(error: Error): void
}

export class ImpersonateConnector extends EventEmitter<ImpersonateConnectorEvents> {
  private _address: string
  private provider?: StaticJsonRpcProvider
  public static ID = 'impersonateConnect'
  public readonly id = ImpersonateConnector.ID
  public readonly name = 'Impersonate'
  public readonly ready = true
  public storage = typeof sessionStorage === 'undefined' ? undefined : sessionStorage

  constructor() {
    super()
    if (!this.storage) return
    this.address = this.storage.getItem(ImpersonateConnector.ID)
    this.connect({ chainId: localhost.id })
  }

  public get address(): string {
    return this._address
  }

  public set address(address: string) {
    if (!ethers.utils.isAddress(address)) return
    this._address = address
    this.storage?.setItem(ImpersonateConnector.ID, address)
    this.emit('changeAddress', address)
  }

  async connect({ chainId }: { chainId?: number } = {}) {
    const address = await new Promise((resolve) => {
      this.address && resolve(this.address)
      this.once('changeAddress', resolve)
    })
    const provider = await this.getProvider({ chainId, create: true })
    provider.on('accountsChanged', this.onAccountsChanged)
    provider.on('chainChanged', this.onChainChanged)
    provider.on('disconnect', this.onDisconnect)
    const account = getAddress(address as string)
    const id = await this.getChainId()
    const unsupported = this.isChainUnsupported(id)
    return {
      account,
      chain: { id, unsupported },
      provider: this.getProvider(),
    }
  }

  async disconnect() {
    const provider = await this.getProvider()
    provider.removeListener('accountsChanged', this.onAccountsChanged)
    provider.removeListener('chainChanged', this.onChainChanged)
    provider.removeListener('disconnect', this.onDisconnect)
    this.address = ''
    this.storage?.removeItem(ImpersonateConnector.ID)
  }

  async getAccount() {
    return getAddress(this.address)
  }

  async getChainId() {
    const chainId = normalizeChainId(localhost.id)
    return chainId
  }

  async getProvider({ create }: { chainId?: number; create?: boolean } = {}) {
    if (!this.provider || create) {
      this.provider = new StaticJsonRpcProvider(localhost.rpcUrls.default[0])
    }
    return this.provider
  }

  async getSigner({ chainId }: { chainId?: number } = {}) {
    const [provider] = await Promise.all([this.getProvider({ chainId })])
    await provider.send('hardhat_impersonateAccount', [this.address])
    return provider.getSigner(this.address)
  }

  async isAuthorized() {
    try {
      const account = await this.getAccount()
      return !!account
    } catch {
      return false
    }
  }

  protected isChainUnsupported(id: number) {
    return id !== localhost.id
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
