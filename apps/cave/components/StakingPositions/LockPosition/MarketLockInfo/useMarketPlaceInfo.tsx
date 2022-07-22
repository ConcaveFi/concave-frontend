import { FIXED_ORDER_MARKET_CONTRACT } from '@concave/core'
import { StakingPosition, StakingV1Contract } from '@concave/marketplace'
import { ButtonProps, useDisclosure } from '@concave/ui'
import { Transaction } from 'ethers'
import { useInsert_Cavemart_ListingMutation } from 'graphql/generated/graphql'
import { concaveProvider } from 'lib/providers'
import { useState } from 'react'
import { useAccount, useQuery, useSigner, useWaitForTransaction } from 'wagmi'

export type UserMarketInfoState = ReturnType<typeof useMarketInfo>
export const useMarketInfo = ({ stakingPosition }: { stakingPosition: StakingPosition }) => {
  const chainId = stakingPosition.chainId
  const { address: userAddress } = useAccount()
  const offerDisclosure = useDisclosure()
  const { data: signer } = useSigner()
  const [transaction, setTransaction] = useState<Transaction>()
  const [isWaitingForWallet, setIsWaitingForWallet] = useState<boolean>(false)
  const tx = useWaitForTransaction({ hash: transaction?.hash })
  const insertCavemart = useInsert_Cavemart_ListingMutation()
  const cavemartCanHandleTokens = useQuery(
    [chainId, `CAVEMART_CAN_HANDLE`, stakingPosition.address, tx],
    () => {
      const provider = concaveProvider(chainId)
      return new StakingV1Contract(provider).isApprovedForAll(
        userAddress,
        FIXED_ORDER_MARKET_CONTRACT[chainId],
      )
    },
  )
  const transactionWrapper = async (fn: () => Promise<Transaction>) => {
    setIsWaitingForWallet(true)
    try {
      const tx = await fn()
      setTransaction(tx)
    } catch {}
    setIsWaitingForWallet(false)
  }
  const withdraw = async () => {
    const marketItem = stakingPosition.market
    await insertCavemart.mutateAsync({
      tokenID: marketItem.tokenId.toString(),
      signatureHash: marketItem.tokenId.toString(),
      endPrice: marketItem.endPrice.toString(),
      start: marketItem.start.toString(),
      startPrice: marketItem.startPrice.toString(),
      tokenOwner: marketItem.seller,
      deadline: marketItem.deadline.toString(),
      tokenIsListed: false,
    })
  }

  const approveContract = () => {
    transactionWrapper(() => {
      const provider = concaveProvider(chainId)
      return new StakingV1Contract(provider).setApprovalForAll(
        signer,
        FIXED_ORDER_MARKET_CONTRACT[chainId],
        true,
      )
    })
  }
  const [waiting, setWaiting] = useState(false)
  const isLoading = tx?.isLoading || cavemartCanHandleTokens.isLoading || waiting

  return {
    isLoading,
    stakingPosition,
    tx,
    isWaitingForWallet,
    offerDisclosure,
    chainId,
    cavemartCanHandleTokens,
    setWaiting,
    approveContract,
    setTransaction,
    withdraw,
  }
}

export const getMarketPlaceButtonProps = (marketItemState: UserMarketInfoState): ButtonProps => {
  const { stakingPosition, isWaitingForWallet, offerDisclosure, withdraw } = marketItemState
  if (marketItemState.isLoading) {
    return { loadingText: 'Loading', disabled: true, isLoading: true }
  }
  if (isWaitingForWallet) {
    return { loadingText: 'Approve in wallet', disabled: true, isLoading: true }
  }
  const market = stakingPosition.market
  if (market?.isListed && market?.type === `dutch auction`) {
    return { children: 'Unlist auction', onClick: withdraw, variant: 'primary.outline' }
  }
  if (market?.isListed && market?.type === `list`) {
    return { children: 'Unlist', onClick: withdraw, variant: 'primary.outline' }
  }
  if (!marketItemState.cavemartCanHandleTokens.data) {
    return {
      children: 'Approve contract',
      onClick: marketItemState.approveContract,
      variant: 'primary.outline',
    }
  }
  return { children: 'List for sale', onClick: offerDisclosure.onOpen }
}
