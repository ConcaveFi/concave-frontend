import { Fetcher, DAI, CNV, Token, ChainId } from '../src'

describe('Fetcher', () => {
  it('fetches pair data', async () => {
    const DaiCnvPair = await Fetcher.fetchPairData(
      DAI[ChainId.ETHEREUM],
      CNV[ChainId.ETHEREUM] as Token,
    )
    expect(DaiCnvPair.liquidityToken.address).toBe(
      '0x84d53CBA013d0163BB07D65d5123D1634bc2a575' /* real eth mainnet CNV-DAI LP Addy */,
    )
    // using real eth mainnet so we can't know the exact reserve in advance, just expect it to exist
    expect(DaiCnvPair.reserve0).toBeTruthy()
    expect(DaiCnvPair.reserve1).toBeTruthy()

    expect(DaiCnvPair.token0.symbol).toBe((CNV[ChainId.ETHEREUM] as Token).symbol)
    expect(DaiCnvPair.token1.symbol).toBe((DAI[ChainId.ETHEREUM] as Token).symbol)
  })

  it('fetches pair data from address', async () => {
    const DaiCnvPair = await Fetcher.fetchPairFromAddress(
      '0x84d53CBA013d0163BB07D65d5123D1634bc2a575',
    )

    expect(DaiCnvPair.token0.symbol).toBe((CNV[ChainId.ETHEREUM] as Token).symbol)
    expect(DaiCnvPair.token1.symbol).toBe((DAI[ChainId.ETHEREUM] as Token).symbol)
  })
})
