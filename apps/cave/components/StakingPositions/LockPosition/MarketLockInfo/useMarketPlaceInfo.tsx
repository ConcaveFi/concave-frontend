import {
  ConcaveNFTMarketplace,
  Offer,
  StakingPosition,
  StakingV1Contract,
} from '@concave/marketplace'
import { ButtonProps, useDisclosure } from '@concave/ui'
import { Transaction } from 'ethers'
import { useUpdate_Cavemart_Listin_By_IdMutation } from 'graphql/generated/graphql'
import { useTransactionRegistry } from 'hooks/TransactionsRegistry'
import { concaveProvider } from 'lib/providers'
import { useState } from 'react'
import { useSigner, useWaitForTransaction } from 'wagmi'

export type UserMarketInfoState = ReturnType<typeof useMarketInfo>
export const useMarketInfo = ({ stakingPosition }: { stakingPosition: StakingPosition }) => {
  const chainId = stakingPosition.chainId

  const offerDisclosure = useDisclosure()
  const { registerTransaction } = useTransactionRegistry()
  const { data: signer } = useSigner()
  const [transaction, setTransaction] = useState<Transaction>()
  const [isWaitingForWallet, setIsWaitingForWallet] = useState<boolean>(false)
  const tx = useWaitForTransaction({ hash: transaction?.hash })
  const { mutate } = useUpdate_Cavemart_Listin_By_IdMutation()

  const transactionWrapper = async (fn: () => Promise<Transaction>) => {
    setIsWaitingForWallet(true)
    try {
      const tx = await fn()
      setTransaction(tx)
    } catch {}
    setIsWaitingForWallet(false)
  }
  const withdraw = () => {
    const marketItem = stakingPosition.market
    mutate({
      tokenId: marketItem.tokenId.toString(),
      signatureHash: ``,
      start: marketItem.start.toString(),
      startPrice: marketItem.startPrice.toString(),
      tokenIsListed: false,
      deadline: marketItem.deadline.toString(),
      endPrice: `0`,
    })
    alert(`withdraw ok`)
    // registerTransaction(tx, {
    //   type: 'unlist position',
    //   tokenId: +stakingPosition.tokenId.toString(),
    // })
  }

  const createOffer = async (offer: Offer) => {
    transactionWrapper(async () => {
      try {
        console.log(123)
        const market = new ConcaveNFTMarketplace(concaveProvider(chainId))
        const staking = new StakingV1Contract(concaveProvider(chainId))
        const marketplaceHasPermission = await staking.isApprovedForAll(
          await signer.getAddress(),
          market.address,
        )
        if (!marketplaceHasPermission) {
          const approveTx = await staking.setApprovalForAll(signer, market.address, true)
          registerTransaction(approveTx, { type: 'approve', tokenSymbol: 'position' })
        }
        const tx = await market.createOffer(signer, stakingPosition, offer)
        registerTransaction(tx, {
          type: 'list position',
          action: offer.isAuction ? 'auction' : 'sale',
          tokenId: +stakingPosition.tokenId.toString(),
        })
        return tx
      } catch (e) {
        console.error(e)
        throw e
      }
    })
    offerDisclosure.onClose()
  }

  return {
    stakingPosition,
    tx,
    isWaitingForWallet,
    offerDisclosure,
    chainId,
    createOffer,
    setTransaction,
    withdraw,
  }
}

export const getMarketPlaceButtonProps = (marketItemState: UserMarketInfoState): ButtonProps => {
  const { tx, stakingPosition, isWaitingForWallet, offerDisclosure, withdraw } = marketItemState
  if (tx?.isLoading) {
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
    return { children: 'Unlist sale', onClick: withdraw, variant: 'primary.outline' }
  }
  return { children: 'List for sale', onClick: offerDisclosure.onOpen }
}
