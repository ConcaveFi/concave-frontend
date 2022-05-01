import { StakingV1Abi } from 'contracts/LiquidStaking/LiquidStakingAbi'
import { LIQUID_STAKING_ADDRESS } from 'contracts/LiquidStaking/LiquidStakingAddress'
import { Contract, ethers } from 'ethers'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useState } from 'react'
import { useAccount } from 'wagmi'
const providers = new ethers.providers.InfuraProvider('ropsten', '5ad069733a1a48a897180e66a5fb8846')

export const useDashBoardState = () => {
  const [{ data: account }] = useAccount()
  const netWorkId = useCurrentSupportedNetworkId()
  const [owner, setOwner] = useState(null)

  const stakingContract = new Contract(LIQUID_STAKING_ADDRESS[netWorkId], StakingV1Abi, providers)

  async function getAllPositions() {
    const t = await stakingContract.totalSupply().catch((e) => console.log(e))
    if (t === undefined) return
    setOwner(t?.toString())
  }

  getAllPositions()

  return {
    owner,
  }
}
