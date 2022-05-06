import { StakingV1Abi } from 'contracts/LiquidStaking/LiquidStakingAbi'
import { LIQUID_STAKING_ADDRESS } from 'contracts/LiquidStaking/LiquidStakingAddress'
import { Contract, ethers } from 'ethers'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useEffect, useState } from 'react'
import { useAccount, useConnect } from 'wagmi'
import { createAlchemyWeb3, Nft } from '@alch/alchemy-web3'
import { nftContract } from 'components/Dashboard/UserPositionCard'
const providers = new ethers.providers.InfuraProvider('ropsten', '545e522b4c0e45078a25b86f3b646a9b')

export async function getAllUsersPositionsID(address: string, netWorkId: number) {
  const usersNft = await getAllUserNfts(address)
  return usersNft.filter(filterByContract(LIQUID_STAKING_ADDRESS[netWorkId])).map(mapToTokenId)
}

const filterByContract = (contractAddress: string) => (nft: Nft) => {
  return contractAddress === nft.contract.address
}
const mapToTokenId = (nft: Nft) => nft.id.tokenId

// By default it's using the ropsten network, in a real scene
// It's necessary change line 23 with the correct network.
export async function getAllUserNfts(address: string) {
  const web3 = createAlchemyWeb3('https://eth-ropsten.alchemyapi.io/v2/demo')
  const nft = await web3.alchemy.getNfts({
    owner: address,
  })
  return nft.ownedNfts
}
export async function getUserPosition(address: string, index: number, netWorkId: number) {
  const stakingContract = new Contract(LIQUID_STAKING_ADDRESS[3], StakingV1Abi, providers)
  const userPositions = await getAllUsersPositionsID(address, netWorkId)
  const tokenIndexId = +userPositions[index]
  return await stakingContract.positions(tokenIndexId.toString()).catch((error) => {})
}

export async function getUserPositions(address: string, netWorkId: number) {
  const stakingContract = new Contract(LIQUID_STAKING_ADDRESS[3], StakingV1Abi, providers)
  const userPositions = []
  const userPositionsLength = await stakingContract.balanceOf(address).catch((error) => {})
  for (let index = 0; index < userPositionsLength; index++) {
    const pos = await getUserPosition(address, index, netWorkId)
    userPositions.push(pos)
  }
  return userPositions
}

export const useDashBoardState = () => {
  const [{ data: wallet, loading }, connect] = useConnect()
  const [{ data: account, error }] = useAccount()
  const netWorkId = useCurrentSupportedNetworkId()
  const [userContracts, setUserContracts] = useState(null)
  const [totalLocked, setTotalLocked] = useState(undefined)
  const [status, setStatus] = useState<'loading' | 'notConnected' | 'success'>('loading')

  useEffect(() => {
    if (wallet.connected && userContracts === null)
      getUserPositions(account.address, netWorkId)
        .then((contract) => {
          if (!contract) setTotalLocked(0)
          setUserContracts(contract)
          setTotalLocked(getTotalLocked(contract))
          setStatus('success')
        })
        .catch(() => {
          setStatus('success')
          setUserContracts(null)
          setTotalLocked(0)
        })
  }, [account])

  useEffect(() => {
    if (!loading) {
      if (!wallet.connected) setStatus('notConnected')
    }
  }, [loading])

  const isLoading = status === 'loading'
  const notConnected = status === 'notConnected'
  const success = status === 'success'

  const statusData = {
    isLoading,
    notConnected,
    success,
  }

  return {
    statusData,
    totalLocked,
    account,
    netWorkId,
    userContracts,
    setUserContracts,
  }
}

function getTotalLocked(contract: nftContract[]) {
  if (!contract) return undefined
  const totalLocked = contract?.map((current) => {
    if (current?.shares === undefined) return 0
    const { shares } = current
    return parseInt(shares?._hex, 16) / 1000000000000000000
  })
  return totalLocked?.reduce((last, current) => last + current)
}
