import { StakingV1Abi } from 'contracts/LiquidStaking/LiquidStakingAbi'
import { LIQUID_STAKING_ADDRESS } from 'contracts/LiquidStaking/LiquidStakingAddress'
import { Contract, ethers } from 'ethers'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useEffect, useState } from 'react'
import { useAccount, useConnect } from 'wagmi'
import { createAlchemyWeb3, Nft } from '@alch/alchemy-web3'
import { nftContract } from 'components/Dashboard/UserPositionCard'
import { concaveProvider as providers, rawProvider } from 'lib/providers'

export async function getAllUsersPositionsID(address: string, netWorkId: number) {
  const usersNft = await getAllUserNfts(address, netWorkId)
  return usersNft.filter(filterByContract(LIQUID_STAKING_ADDRESS[netWorkId])).map(mapToTokenId)
}

const filterByContract = (contractAddress: string) => (nft: Nft) => {
  return contractAddress.toUpperCase() === nft.contract.address.toUpperCase()
}
const mapToTokenId = (nft: Nft) => nft.id.tokenId

export async function getAllUserNfts(address: string, netWorkId: number) {
  const network = netWorkId === 1 ? 'mainnet' : 'ropsten'
  const web3 = createAlchemyWeb3(`https://eth-${network}.alchemyapi.io/v2/demo`)
  const nft = await web3.alchemy.getNfts({
    owner: address,
  })

  if (nft.ownedNfts.length == 0) {
    return undefined
  } else {
    return nft.ownedNfts
  }
}

export async function getUserPosition(address: string, index: number, netWorkId: number) {
  const stakingContract = new Contract(
    LIQUID_STAKING_ADDRESS[netWorkId],
    StakingV1Abi,
    providers(netWorkId),
  )
  const userPositions = await getAllUsersPositionsID(address, netWorkId)
  const tokenIndexId = +userPositions[index]
  return await stakingContract.positions(tokenIndexId.toString()).catch((error) => {})
}

export async function getUserPositions(address: string, netWorkId: number) {
  const stakingContract = new Contract(
    LIQUID_STAKING_ADDRESS[netWorkId],
    StakingV1Abi,
    providers(netWorkId),
  )
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
  const [{ data: account, error: accountError }] = useAccount()

  const netWorkId = useCurrentSupportedNetworkId()

  const [userPositions, setUserPositions] = useState([])
  const [totalLocked, setTotalLocked] = useState(0)
  const [status, setStatus] = useState<'loading' | 'notConnected' | 'loaded'>('loading')

  useEffect(() => {
    setStatus('loading')
    if (wallet.connected) {
      getUserPositions(account?.address, netWorkId)
        .then((contract) => {
          setStatus('loaded')
          setUserPositions(contract)
          setTotalLocked(getTotalLocked(contract))
        })
        .catch(() => {})
    }
    if (!loading) {
      if (!wallet.connected) setStatus('notConnected')
    }
  }, [loading, netWorkId])

  const isLoading = status === 'loading'
  const notConnected = status === 'notConnected'

  const statusData = {
    isLoading,
    notConnected,
  }

  return {
    status: statusData,
    positions: {
      totalLocked,
      userPositions,
    },
    account,
    netWorkId,
    setUserPositions,
  }
}

function getTotalLocked(contract: nftContract[]) {
  if (!contract) return 0
  const totalLocked = contract?.map((current) => {
    if (current?.shares === undefined) return 0
    const { shares } = current
    return parseInt(shares?._hex, 16) / 1000000000000000000
  })
  return totalLocked?.reduce((last, current) => last + current)
}
