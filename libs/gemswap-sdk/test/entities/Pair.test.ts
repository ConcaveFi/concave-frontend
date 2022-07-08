import { CurrencyAmount, Token, WETH9 } from '@concave/core'
import { Pair, Price } from '../../src/entities'

import { InsufficientInputAmountError } from '../../src/errors'

describe('Pair', () => {
  const USDC = new Token(1, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 18, 'USDC', 'USD Coin')
  const DAI = new Token(
    1,
    '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    18,
    'DAI',
    'DAI Stablecoin',
  )

  describe('constructor', () => {
    it('cannot be used for tokens on different chains', () => {
      expect(() =>
        Pair.createVirtualPair(
          CurrencyAmount.fromRawAmount(USDC, '100'),
          CurrencyAmount.fromRawAmount(WETH9[3], '100'),
          '0x1111111111111111111111111111111111111111',
        ),
      ).toThrow('CHAIN_IDS')
    })
  })

  // describe('#getAddress', () => {
  //   it('returns the correct address', () => {
  //     expect(Pair.getAddress(USDC, DAI)).toEqual('0xAaF5110db6e744ff70fB339DE037B990A20bdace')
  //   })
  // })

  describe('#token0', () => {
    it('always is the token that sorts before', () => {
      expect(
        Pair.createVirtualPair(
          CurrencyAmount.fromRawAmount(USDC, '100'),
          CurrencyAmount.fromRawAmount(DAI, '100'),
          '0x1111111111111111111111111111111111111111',
        ).token0,
      ).toEqual(DAI)
      expect(
        Pair.createVirtualPair(
          CurrencyAmount.fromRawAmount(DAI, '100'),
          CurrencyAmount.fromRawAmount(USDC, '100'),
          '0x1111111111111111111111111111111111111111',
        ).token0,
      ).toEqual(DAI)
    })
  })
  describe('#token1', () => {
    it('always is the token that sorts after', () => {
      expect(
        Pair.createVirtualPair(
          CurrencyAmount.fromRawAmount(USDC, '100'),
          CurrencyAmount.fromRawAmount(DAI, '100'),
          '0x1111111111111111111111111111111111111111',
        ).token1,
      ).toEqual(USDC)
      expect(
        Pair.createVirtualPair(
          CurrencyAmount.fromRawAmount(DAI, '100'),
          CurrencyAmount.fromRawAmount(USDC, '100'),
          '0x1111111111111111111111111111111111111111',
        ).token1,
      ).toEqual(USDC)
    })
  })
  describe('#reserve0', () => {
    it('always comes from the token that sorts before', () => {
      expect(
        Pair.createVirtualPair(
          CurrencyAmount.fromRawAmount(USDC, '100'),
          CurrencyAmount.fromRawAmount(DAI, '101'),
          '0x1111111111111111111111111111111111111111',
        ).reserve0,
      ).toEqual(CurrencyAmount.fromRawAmount(DAI, '101'))
      expect(
        Pair.createVirtualPair(
          CurrencyAmount.fromRawAmount(DAI, '101'),
          CurrencyAmount.fromRawAmount(USDC, '100'),
          '0x1111111111111111111111111111111111111111',
        ).reserve0,
      ).toEqual(CurrencyAmount.fromRawAmount(DAI, '101'))
    })
  })
  describe('#reserve1', () => {
    it('always comes from the token that sorts after', () => {
      expect(
        Pair.createVirtualPair(
          CurrencyAmount.fromRawAmount(USDC, '100'),
          CurrencyAmount.fromRawAmount(DAI, '101'),
          '0x1111111111111111111111111111111111111111',
        ).reserve1,
      ).toEqual(CurrencyAmount.fromRawAmount(USDC, '100'))
      expect(
        Pair.createVirtualPair(
          CurrencyAmount.fromRawAmount(DAI, '101'),
          CurrencyAmount.fromRawAmount(USDC, '100'),
          '0x1111111111111111111111111111111111111111',
        ).reserve1,
      ).toEqual(CurrencyAmount.fromRawAmount(USDC, '100'))
    })
  })

  describe('#token0Price', () => {
    it('returns price of token0 in terms of token1', () => {
      expect(
        Pair.createVirtualPair(
          CurrencyAmount.fromRawAmount(USDC, '101'),
          CurrencyAmount.fromRawAmount(DAI, '100'),
          '0x1111111111111111111111111111111111111111',
        ).token0Price,
      ).toEqual(new Price(DAI, USDC, '100', '101'))
      expect(
        Pair.createVirtualPair(
          CurrencyAmount.fromRawAmount(DAI, '100'),
          CurrencyAmount.fromRawAmount(USDC, '101'),
          '0x1111111111111111111111111111111111111111',
        ).token0Price,
      ).toEqual(new Price(DAI, USDC, '100', '101'))
    })
  })

  describe('#token1Price', () => {
    it('returns price of token1 in terms of token0', () => {
      expect(
        Pair.createVirtualPair(
          CurrencyAmount.fromRawAmount(USDC, '101'),
          CurrencyAmount.fromRawAmount(DAI, '100'),
          '0x1111111111111111111111111111111111111111',
        ).token1Price,
      ).toEqual(new Price(USDC, DAI, '101', '100'))
      expect(
        Pair.createVirtualPair(
          CurrencyAmount.fromRawAmount(DAI, '100'),
          CurrencyAmount.fromRawAmount(USDC, '101'),
          '0x1111111111111111111111111111111111111111',
        ).token1Price,
      ).toEqual(new Price(USDC, DAI, '101', '100'))
    })
  })

  describe('#priceOf', () => {
    const pair = Pair.createVirtualPair(
      CurrencyAmount.fromRawAmount(USDC, '101'),
      CurrencyAmount.fromRawAmount(DAI, '100'),
      '0x1111111111111111111111111111111111111111',
    )
    it('returns price of token in terms of other token', () => {
      expect(pair.priceOf(DAI)).toEqual(pair.token0Price)
      expect(pair.priceOf(USDC)).toEqual(pair.token1Price)
    })

    it('throws if invalid token', () => {
      expect(() => pair.priceOf(WETH9[1])).toThrow('TOKEN')
    })
  })

  describe('#reserveOf', () => {
    it('returns reserves of the given token', () => {
      expect(
        Pair.createVirtualPair(
          CurrencyAmount.fromRawAmount(USDC, '100'),
          CurrencyAmount.fromRawAmount(DAI, '101'),
          '0x1111111111111111111111111111111111111111',
        ).reserveOf(USDC),
      ).toEqual(CurrencyAmount.fromRawAmount(USDC, '100'))
      expect(
        Pair.createVirtualPair(
          CurrencyAmount.fromRawAmount(DAI, '101'),
          CurrencyAmount.fromRawAmount(USDC, '100'),
          '0x1111111111111111111111111111111111111111',
        ).reserveOf(USDC),
      ).toEqual(CurrencyAmount.fromRawAmount(USDC, '100'))
    })

    it('throws if not in the pair', () => {
      expect(() =>
        Pair.createVirtualPair(
          CurrencyAmount.fromRawAmount(DAI, '101'),
          CurrencyAmount.fromRawAmount(USDC, '100'),
          '0x1111111111111111111111111111111111111111',
        ).reserveOf(WETH9[1]),
      ).toThrow('TOKEN')
    })
  })

  describe('#chainId', () => {
    it('returns the token0 chainId', () => {
      expect(
        Pair.createVirtualPair(
          CurrencyAmount.fromRawAmount(USDC, '100'),
          CurrencyAmount.fromRawAmount(DAI, '100'),
          '0x1111111111111111111111111111111111111111',
        ).chainId,
      ).toEqual(1)
      expect(
        Pair.createVirtualPair(
          CurrencyAmount.fromRawAmount(DAI, '100'),
          CurrencyAmount.fromRawAmount(USDC, '100'),
          '0x1111111111111111111111111111111111111111',
        ).chainId,
      ).toEqual(1)
    })
  })
  describe('#involvesToken', () => {
    expect(
      Pair.createVirtualPair(
        CurrencyAmount.fromRawAmount(USDC, '100'),
        CurrencyAmount.fromRawAmount(DAI, '100'),
        '0x1111111111111111111111111111111111111111',
      ).involvesToken(USDC),
    ).toEqual(true)
    expect(
      Pair.createVirtualPair(
        CurrencyAmount.fromRawAmount(USDC, '100'),
        CurrencyAmount.fromRawAmount(DAI, '100'),
        '0x1111111111111111111111111111111111111111',
      ).involvesToken(DAI),
    ).toEqual(true)
    expect(
      Pair.createVirtualPair(
        CurrencyAmount.fromRawAmount(USDC, '100'),
        CurrencyAmount.fromRawAmount(DAI, '100'),
        '0x1111111111111111111111111111111111111111',
      ).involvesToken(WETH9[1]),
    ).toEqual(false)
  })
  describe('miscellaneous', () => {
    it('getLiquidityMinted:0', async () => {
      const tokenA = new Token(3, '0x0000000000000000000000000000000000000001', 18)
      const tokenB = new Token(3, '0x0000000000000000000000000000000000000002', 18)
      const pair = Pair.createVirtualPair(
        CurrencyAmount.fromRawAmount(tokenA, '0'),
        CurrencyAmount.fromRawAmount(tokenB, '0'),
        '0x1111111111111111111111111111111111111111',
      )

      expect(() => {
        pair.getLiquidityMinted(
          CurrencyAmount.fromRawAmount(pair.liquidityToken, '0'),
          CurrencyAmount.fromRawAmount(tokenA, '1000'),
          CurrencyAmount.fromRawAmount(tokenB, '1000'),
        )
      }).toThrow(InsufficientInputAmountError)

      expect(() => {
        pair.getLiquidityMinted(
          CurrencyAmount.fromRawAmount(pair.liquidityToken, '0'),
          CurrencyAmount.fromRawAmount(tokenA, '1000000'),
          CurrencyAmount.fromRawAmount(tokenB, '1'),
        )
      }).toThrow(InsufficientInputAmountError)

      const liquidity = pair.getLiquidityMinted(
        CurrencyAmount.fromRawAmount(pair.liquidityToken, '0'),
        CurrencyAmount.fromRawAmount(tokenA, '1001'),
        CurrencyAmount.fromRawAmount(tokenB, '1001'),
      )

      expect(liquidity.quotient.toString()).toEqual('1')
    })

    it('getLiquidityMinted:!0', async () => {
      const tokenA = new Token(3, '0x0000000000000000000000000000000000000001', 18)
      const tokenB = new Token(3, '0x0000000000000000000000000000000000000002', 18)
      const pair = Pair.createVirtualPair(
        CurrencyAmount.fromRawAmount(tokenA, '10000'),
        CurrencyAmount.fromRawAmount(tokenB, '10000'),
        '0x1111111111111111111111111111111111111111',
      )

      expect(
        pair
          .getLiquidityMinted(
            CurrencyAmount.fromRawAmount(pair.liquidityToken, '10000'),
            CurrencyAmount.fromRawAmount(tokenA, '2000'),
            CurrencyAmount.fromRawAmount(tokenB, '2000'),
          )
          .quotient.toString(),
      ).toEqual('2000')
    })

    it('getLiquidityValue:!feeOn', async () => {
      const tokenA = new Token(3, '0x0000000000000000000000000000000000000001', 18)
      const tokenB = new Token(3, '0x0000000000000000000000000000000000000002', 18)
      const pair = Pair.createVirtualPair(
        CurrencyAmount.fromRawAmount(tokenA, '1000'),
        CurrencyAmount.fromRawAmount(tokenB, '1000'),
        '0x1111111111111111111111111111111111111111',
      )

      {
        const liquidityValue = pair.getLiquidityValue(
          tokenA,
          CurrencyAmount.fromRawAmount(pair.liquidityToken, '1000'),
          CurrencyAmount.fromRawAmount(pair.liquidityToken, '1000'),
          false,
        )
        expect(liquidityValue.currency.equals(tokenA)).toBe(true)
        expect(liquidityValue.quotient.toString()).toBe('1000')
      }

      // 500
      {
        const liquidityValue = pair.getLiquidityValue(
          tokenA,
          CurrencyAmount.fromRawAmount(pair.liquidityToken, '1000'),
          CurrencyAmount.fromRawAmount(pair.liquidityToken, '500'),
          false,
        )
        expect(liquidityValue.currency.equals(tokenA)).toBe(true)
        expect(liquidityValue.quotient.toString()).toBe('500')
      }

      // tokenB
      {
        const liquidityValue = pair.getLiquidityValue(
          tokenB,
          CurrencyAmount.fromRawAmount(pair.liquidityToken, '1000'),
          CurrencyAmount.fromRawAmount(pair.liquidityToken, '1000'),
          false,
        )
        expect(liquidityValue.currency.equals(tokenB)).toBe(true)
        expect(liquidityValue.quotient.toString()).toBe('1000')
      }
    })

    it('getLiquidityValue:feeOn', async () => {
      const tokenA = new Token(3, '0x0000000000000000000000000000000000000001', 18)
      const tokenB = new Token(3, '0x0000000000000000000000000000000000000002', 18)
      const pair = Pair.createVirtualPair(
        CurrencyAmount.fromRawAmount(tokenA, '1000'),
        CurrencyAmount.fromRawAmount(tokenB, '1000'),
        '0x1111111111111111111111111111111111111111',
      )

      const liquidityValue = pair.getLiquidityValue(
        tokenA,
        CurrencyAmount.fromRawAmount(pair.liquidityToken, '500'),
        CurrencyAmount.fromRawAmount(pair.liquidityToken, '500'),
        true,
        '250000', // 500 ** 2
      )
      expect(liquidityValue.currency.equals(tokenA)).toBe(true)
      expect(liquidityValue.quotient.toString()).toBe('917') // ceiling(1000 - (500 * (1 / 6)))
    })
  })
})
