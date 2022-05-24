import { CurrencyAmount, FACTORY_ADDRESS, Token } from '@concave/core'
import { Contract } from '@ethersproject/contracts'
import { getNetwork } from '@ethersproject/networks'
import { getDefaultProvider } from '@ethersproject/providers'
import invariant from 'tiny-invariant'
import { Pair } from './entities'

const TOKENS_CACHE: { [chainId: number]: { [address: string]: Token } } = {}

const PAIR_ADDRESSES_CACHE: { [tokenAddresses: string]: string } = {}

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

    const token = new Token(chainId, address, decimals, symbol, name)

    TOKENS_CACHE[chainId] = {
      ...TOKENS_CACHE[chainId],
      [address]: token,
    }

    return token
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
    const [token0, token1, [reserves0, reserves1], liquidityToken] = await Promise.all([
      Fetcher.fetchTokenData(await token0Address, provider),
      Fetcher.fetchTokenData(await token1Address, provider),
      pairContract.getReserves(),
      Fetcher.fetchTokenData(pairAddress, provider),
    ])

    const reserves = token0.sortsBefore(token1) ? [reserves0, reserves1] : [reserves1, reserves0]
    return new Pair(
      CurrencyAmount.fromRawAmount(token0, reserves[0]),
      CurrencyAmount.fromRawAmount(token1, reserves[1]),
      liquidityToken,
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
  ): Promise<Pair | undefined> {
    invariant(tokenA.chainId === tokenB.chainId, 'CHAIN_ID')
    const addresses = tokenA.sortsBefore(tokenB)
      ? `${tokenA.address}-${tokenB.address}`
      : `${tokenB.address}-${tokenA.address}`

    if (PAIR_ADDRESSES_CACHE[addresses] === `0x0000000000000000000000000000000000000000`) return

    const pairAddress =
      PAIR_ADDRESSES_CACHE[addresses] ||
      (await new Contract(
        FACTORY_ADDRESS[tokenA.chainId],
        ['function getPair(address tokenA, address tokenB) external view returns (address)'],
        provider,
      ).getPair(tokenA.address, tokenB.address))
    PAIR_ADDRESSES_CACHE[addresses] = pairAddress

    if (pairAddress === `0x0000000000000000000000000000000000000000`) return

    const [reserves0, reserves1] = await new Contract(
      pairAddress,
      ['function getReserves() external view returns (uint112, uint112, uint32)'],
      provider,
    ).getReserves()

    const liquidityToken = await Fetcher.fetchTokenData(pairAddress, provider)
    const reserves = tokenA.sortsBefore(tokenB) ? [reserves0, reserves1] : [reserves1, reserves0]

    return new Pair(
      CurrencyAmount.fromRawAmount(tokenA, reserves[0]),
      CurrencyAmount.fromRawAmount(tokenB, reserves[1]),
      liquidityToken,
    )
  }

  /**
   * Fetches information about a pair and constructs a pair from the given two tokens.
   * @param tokenA first token
   * @param tokenB second token
   * @param provider the provider to use to fetch the data
   */
  public static async fetchPairs(
    chainId = 1,
    provider = getDefaultProvider(chainId),
  ): Promise<Pair[]> {
    const pairContract = await new Contract(
      FACTORY_ADDRESS[chainId],
      [
        'function allPairs(uint256 index) external view returns (address)',
        'function allPairsLength() external view returns (uint256)',
      ],
      provider,
    )
    const promiseAddress: Promise<Pair>[] = []
    const index = await pairContract.allPairsLength()
    for (let i = 0; i < index; i++) {
      const LPPromise = pairContract
        .allPairs(i)
        .then((add: string) => Fetcher.fetchPairFromAddress(add, provider))
      promiseAddress.push(LPPromise)
    }
    return await Promise.all(promiseAddress)
  }
}
