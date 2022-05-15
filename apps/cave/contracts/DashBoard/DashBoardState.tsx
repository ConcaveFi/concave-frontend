import { createAlchemyWeb3, Nft } from '@alch/alchemy-web3'
import { nftContract } from 'components/Dashboard/UserPositionCard'
import { LIQUID_STAKING_ADDRESS } from 'contracts/LiquidStaking/LiquidStakingAddress'
import { BigNumber } from 'ethers'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { StakingV1Contract } from 'lib/StakingV1Proxy/Contract'
import { useEffect, useState } from 'react'
import { useAccount, useConnect } from 'wagmi'

export async function getAllUsersPositionsID(address: string, netWorkId: number) {
  const usersNft = await getAllUserNfts(address, netWorkId)
  return usersNft.filter(filterByContract(LIQUID_STAKING_ADDRESS[netWorkId])).map(mapToTokenId)
}
export async function getAllUsersPositions(address: string, netWorkId: number) {
  const usersNft = await getAllUserNfts(address, netWorkId)
  return usersNft.filter(filterByContract(LIQUID_STAKING_ADDRESS[netWorkId]))
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
  const userPositions = await getAllUsersPositions(address, netWorkId)
  const nonFungibletoken = userPositions[index]
  const tokenIndexId = +nonFungibletoken.id.tokenId
  const stakingV1Contract = new StakingV1Contract(netWorkId)
  const positionInfo = await stakingV1Contract.positions(tokenIndexId)
  return { ...positionInfo, ...nonFungibletoken }
}

export async function getUserPositions(address: string, netWorkId: number) {
  const stakingV1Contract = new StakingV1Contract(netWorkId)
  const userPositions: Promise<{
    deposit: BigNumber
    maturity: number
    poolID: number
    rewardDebt: BigNumber
    shares: BigNumber
  }>[] = []
  const userPositionsLength = await stakingV1Contract.balanceOf(address)
  for (let index = 0; userPositionsLength.gt(index); index++) {
    const pos = getUserPosition(address, index, netWorkId)
    userPositions.push(pos)
  }
  return Promise.all(userPositions)
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
        .then((userPositions) => {
          setStatus('loaded')
          setUserPositions(userPositions)
          setTotalLocked(getTotalLocked(userPositions))
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
