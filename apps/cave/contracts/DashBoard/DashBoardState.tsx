import { StakingV1Abi } from 'contracts/LiquidStaking/LiquidStakingAbi'
import { LIQUID_STAKING_ADDRESS } from 'contracts/LiquidStaking/LiquidStakingAddress'
import { Contract, ethers } from 'ethers'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { createAlchemyWeb3, Nft } from '@alch/alchemy-web3'
const providers = new ethers.providers.InfuraProvider('ropsten', '5ad069733a1a48a897180e66a5fb8846')

// ------------------------------------------------------------
// Using 3 as ropsten network, later has to change to netWorkId
// ------------------------------------------------------------
export async function getAllUsersPositionsID(address: string) {
  const usersNft = await getAllUserNfts(address)
  return usersNft.filter(filterByContract(LIQUID_STAKING_ADDRESS[3])).map(mapToTokenId)
}

const filterByContract = (contractAddress: string) => (nft: Nft) => {
  return contractAddress === nft.contract.address
}
const mapToTokenId = (nft: Nft) => nft.id.tokenId

export async function getAllUserNfts(address: string) {
  const web3 = createAlchemyWeb3('https://eth-ropsten.alchemyapi.io/v2/demo')
  const nft = await web3.alchemy.getNfts({
    owner: address,
  })
  return nft.ownedNfts
}

export async function getUserPosition(address: string, index: number) {
  const stakingContract = new Contract(LIQUID_STAKING_ADDRESS[3], StakingV1Abi, providers)
  const userPositions = await getAllUsersPositionsID(address)
  const tokenIndexId = +userPositions[index]
  return await stakingContract.positions(tokenIndexId.toString()).catch((error) => {})
}

export async function getUserPositions(address: string) {
  const stakingContract = new Contract(LIQUID_STAKING_ADDRESS[3], StakingV1Abi, providers)
  const userPositions = []
  const userPositionsLength = await stakingContract.balanceOf(address).catch((error) => {})
  for (let index = 0; index < userPositionsLength; index++) {
    const pos = await getUserPosition(address, index)
    userPositions.push(pos)
  }
  return userPositions
}

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
