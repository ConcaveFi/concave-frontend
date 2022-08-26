import { BondAbi, BOND_ADDRESS, DAI_ADDRESS } from '@concave/core'
import { Contract, utils } from 'ethers'
import { concaveProvider } from 'lib/providers'

export const getBondSpotPrice = async (networkId: number, tokenAddress?: string) => {
  const bondingContract = new Contract(BOND_ADDRESS[networkId], BondAbi, concaveProvider(networkId))
  const DAI = DAI_ADDRESS[networkId]
  const spotPrice = await bondingContract.getSpotPrice(DAI)
  const formatted = utils.formatEther(spotPrice)
  return formatted
}
