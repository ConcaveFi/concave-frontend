import {
  AddressMap,
  ChainId,
  CNV,
  CNV_ADDRESS,
  CurrencyAmount,
  DAI,
  DAI_ADDRESS,
  FACTORY_ADDRESS,
  Token,
  TokenMap,
  USDC,
  USDC_ADDRESS,
  WNATIVE,
  WNATIVE_ADDRESS,
} from '@concave/core'
import { BigNumber } from '@ethersproject/bignumber'
import { Contract } from '@ethersproject/contracts'
import { getNetwork, Network, Networkish } from '@ethersproject/networks'
import invariant from 'tiny-invariant'
import { Pair } from './entities'
import { InfuraProvider, Provider } from '@ethersproject/providers'
import { env } from "process";

const getDefaultProvider = (network: Networkish): Provider => {
  return new InfuraProvider(network, env.NEXT_PUBLIC_INFURA_ID)
}


const makeTokenCacheItem = (addresses: AddressMap, tokenMap: TokenMap) =>
  Object.values(addresses).reduce((a, address) => ({ ...a, [address]: tokenMap }), {})


// preload some tokens we already know
const TOKENS_CACHE: { [address: string]: { [chainId in ChainId]: Token } } = {
  ...makeTokenCacheItem(CNV_ADDRESS, CNV),
  ...makeTokenCacheItem(DAI_ADDRESS, DAI),
  ...makeTokenCacheItem(WNATIVE_ADDRESS, WNATIVE),
  ...makeTokenCacheItem(USDC_ADDRESS, USDC),
}

const PAIR_ADDRESSES_CACHE: { [tokenAddresses: string]: string } = {
  // ethereum
  ['0x000000007a58f5f58E697e51Ab0357BC9e260A04-0x6B175474E89094C44Da98b954EedeAC495271d0F']:
    '0x84d53CBA013d0163BB07D65d5123D1634bc2a575', // CNV - DAI
  ['0x000000007a58f5f58E697e51Ab0357BC9e260A04-0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2']:
    '0x0635380165F7693B7A9D5D6693dF5c860376aEe7', // WETH - CNV
  ['0x6B175474E89094C44Da98b954EedeAC495271d0F-0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2']:
    '0x7f7AE4cb07a81fE810D7Bee9500B2b9eDdC5Ea1A', // WETH - DAI

  // rinkeby
  ['0x4A8b871784A8e6344126F47d48283a87Ea987f27-0xe1776Da3FBe3bBf198263Cb053d589FC3cfe1b30']:
    '0x804A9Be7b60310245Bcf2e50d59c28A2Fa862Eb0', // CNV - DAI
  ['0x4A8b871784A8e6344126F47d48283a87Ea987f27-0xc778417E063141139Fce010982780140Aa0cD5Ab']:
    '0x60d8A6B6D11d03c2674229EA1Ad17600f5a3A60E', // WETH - CNV
}

/**
 * Contains methods for constructing instances of pairs and tokens from on-chain data.
 */
export abstract class Fetcher {
  /**
   * Cannot be constructed.
   */
  private constructor() { }

  /**
   * Fetch information for a given token on the given chain, using the given ethers provider.
   * @param address address of the token on the chain
   * @param provider provider used to fetch the token
   */
  public static async fetchTokenData(
    address: string,
    provider = getDefaultProvider(getNetwork(1)),
    storage?: Storage
  ): Promise<Token> {
    const chainId: ChainId = await provider.getNetwork().then((n) => n.chainId)
    if (TOKENS_CACHE[address]?.[chainId]) return TOKENS_CACHE[address][chainId]
    const KEY = `TOKEN-${chainId}-${address}`
    const tokenContract = new Contract(
      address,
      [
        'function symbol() external view returns (string)',
        'function decimals() external view returns (uint8)',
        'function name() external view returns (string)',
        'function totalSupply() external view returns (uint256)',
      ],
      provider,
    )
    const json = storage?.getItem(KEY) || '{}';
    const FROM_STORAGE = JSON.parse(json)
    const [symbol, decimals, name, totalSupply] = await Promise.all([
      FROM_STORAGE.symbol || tokenContract.symbol(),
      FROM_STORAGE.decimals || tokenContract.decimals(),
      FROM_STORAGE.name || tokenContract.name(),
      tokenContract.totalSupply(),
    ])
    storage?.setItem(KEY, JSON.stringify({ symbol, decimals, name }))
    const token = new Token(chainId, address, decimals, symbol, name, totalSupply)

    TOKENS_CACHE[address] = {
      ...TOKENS_CACHE[address],
      [chainId]: token,
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
    storage?: Storage
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
      Fetcher.fetchTokenData(await token0Address, provider, storage),
      Fetcher.fetchTokenData(await token1Address, provider, storage),
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
    storage?: Storage
  ): Promise<Pair[]> {
    const address = FACTORY_ADDRESS[chainId];
    const FACTORY_PAIRS_ADDRESS = `PAIRS-${chainId}-${address}`
    const pairs: string[] = JSON.parse(storage?.getItem(FACTORY_PAIRS_ADDRESS) || `[]`)
    const pairContract = new Contract(
      FACTORY_ADDRESS[chainId],
      [
        'function allPairs(uint256 index) external view returns (address)',
        'function allPairsLength() external view returns (uint256)',
      ],
      provider,
    )

    const totalPairs: BigNumber = await pairContract.allPairsLength()
    const index = totalPairs.toNumber()
    for (let i = pairs.length; i < index; i++) {
      const address: string = await pairContract.allPairs(i)
      pairs.push(address)
    }
    storage?.setItem(FACTORY_PAIRS_ADDRESS, JSON.stringify(pairs))
    return Promise.all(pairs.map((add: string) => Fetcher.fetchPairFromAddress(add, provider, storage)))
  }
}
