import { Contract } from '@ethersproject/contracts'
import { getNetwork } from '@ethersproject/networks'
import { getDefaultProvider } from '@ethersproject/providers'
import { Pair } from './entities'
import invariant from 'tiny-invariant'
import { FACTORY_ADDRESS } from './constants'
import { Token } from './entities'
import { CurrencyAmount } from './entities'

const TOKENS_CACHE: { [chainId: number]: { [address: string]: Token } } = {}

/**
 * Contains methods for constructing instances of pairs and tokens from on-chain data.
 */
export abstract class Fetcher {
  /**
   * Cannot be constructed.
   */
  private constructor() {}

  /**
   * Fetch information for a given token on the given chain, using the given ethers provider.
   * @param address address of the token on the chain
   * @param chainId chain of the token
   * @param provider provider used to fetch the token
   */
  public static async fetchTokenData(
    address: string,
    provider = getDefaultProvider(getNetwork(1)),
  ): Promise<Token> {
    const chainId = await provider.getNetwork().then((n) => n.chainId)
    if (TOKENS_CACHE[chainId]?.[address]) return TOKENS_CACHE[chainId][address]

    const tokenContract = new Contract(
      address,
      [
        'function symbol() external view returns (string)',
        'function decimals() external view returns (uint8)',
        'function name() external view returns (string)',
      ],
      provider,
    )
    const [symbol, decimals, name] = await Promise.all([
      tokenContract.symbol(),
      tokenContract.decimals(),
      tokenContract.name(),
    ])

    return new Token(chainId, address, decimals, symbol, name)
  }

  /**
   * Fetches information about a pair and constructs a pair from the given address.
   * @param pairAddress LP address
   * @param provider the provider to use to fetch the data
   */
  public static async fetchPairFromAddress(
    pairAddress: string,
    provider = getDefaultProvider(getNetwork(1)),
  ): Promise<Pair> {
    const pairContract = new Contract(
      pairAddress,
      [
        'function getReserves() external view returns (uint112, uint112, uint32)',
        'function token0() external view returns (address)',
        'function token1() external view returns (address)',
      ],
      provider,
    )

    const token0Address = pairContract.token0()
    const token1Address = pairContract.token1()

    const [token0, token1, [reserves0, reserves1]] = await Promise.all([
      Fetcher.fetchTokenData(await token0Address, provider),
      Fetcher.fetchTokenData(await token1Address, provider),
      pairContract.getReserves(),
    ])

    const reserves = token0.sortsBefore(token1) ? [reserves0, reserves1] : [reserves1, reserves0]
    return new Pair(
      CurrencyAmount.fromRawAmount(token0, reserves[0]),
      CurrencyAmount.fromRawAmount(token1, reserves[1]),
      pairAddress,
    )
  }

  /**
   * Fetches information about a pair and constructs a pair from the given two tokens.
   * @param tokenA first token
   * @param tokenB second token
   * @param provider the provider to use to fetch the data
   */
  public static async fetchPairData(
    tokenA: Token,
    tokenB: Token,
    provider = getDefaultProvider(getNetwork(tokenA.chainId)),
  ): Promise<Pair> {
    invariant(tokenA.chainId === tokenB.chainId, 'CHAIN_ID')

    const pairAddress = await new Contract(
      FACTORY_ADDRESS[tokenA.chainId],
      ['function getPair(address tokenA, address tokenB) external view returns (address)'],
      provider,
    ).getPair(tokenA.address, tokenB.address)

    const [reserves0, reserves1] = await new Contract(
      pairAddress,
      ['function getReserves() external view returns (uint112, uint112, uint32)'],
      provider,
    ).getReserves()

    const reserves = tokenA.sortsBefore(tokenB) ? [reserves0, reserves1] : [reserves1, reserves0]
    return new Pair(
      CurrencyAmount.fromRawAmount(tokenA, reserves[0]),
      CurrencyAmount.fromRawAmount(tokenB, reserves[1]),
      pairAddress,
    )
  }
}
