import * as dotenv from 'dotenv'
dotenv.config()

import { CNV } from '@concave/core'
import { BigNumber, Contract } from 'ethers'
import { concaveProvider } from '../../lib/providers'
import { chain, erc20ABI } from 'wagmi'

describe('Test concaveProvider', () => {
  it('check mainnet', async () => {
    const chainId = chain.mainnet.id
    const rinkebyProvider = concaveProvider(chainId)
    const token = CNV[chainId]
    const contract = new Contract(token.address, erc20ABI, rinkebyProvider)
    const balance: BigNumber = await contract.balanceOf(
      '0x8522093305253EfB2685241dc0C587CDD9B10e4B',
    )
    expect(balance.toString()).toBeDefined()
  })
  it('check rinkeby', async () => {
    const chainId = chain.rinkeby.id
    const rinkebyProvider = concaveProvider(chainId)
    const token = CNV[chainId]
    const contract = new Contract(token.address, erc20ABI, rinkebyProvider)
    const balance: BigNumber = await contract.balanceOf(
      '0x8522093305253EfB2685241dc0C587CDD9B10e4B',
    )
    expect(balance.toString()).toBeDefined()
  })
})
