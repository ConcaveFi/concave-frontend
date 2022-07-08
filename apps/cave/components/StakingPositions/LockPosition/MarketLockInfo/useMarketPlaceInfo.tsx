import {
  ConcaveNFTMarketplace,
  fechMarketInfo,
  Offer,
  StakingPosition,
  StakingV1Contract,
} from '@concave/marketplace'
import { ButtonProps, useDisclosure } from '@concave/ui'
import { Transaction } from 'ethers'
import { useTransactionRegistry } from 'hooks/TransactionsRegistry'
import { concaveProvider } from 'lib/providers'
import { useState } from 'react'
import { useQuery } from 'react-query'
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
  const marketItem = useQuery(
    ['MarketInfo', tx.data, chainId, stakingPosition.tokenId],
    async () => fechMarketInfo(concaveProvider(chainId), stakingPosition),
    { enabled: chainId != undefined, refetchOnWindowFocus: false },
  )

  const transactionWrapper = async (fn: () => Promise<Transaction>) => {
    setIsWaitingForWallet(true)
    try {
      const tx = await fn()
      setTransaction(tx)
    } catch {}
    setIsWaitingForWallet(false)
  }

  const createMarketItem = () =>
    transactionWrapper(() =>
      new ConcaveNFTMarketplace(concaveProvider(chainId)).createMarketItem(signer, stakingPosition),
    )

  const withdrawOffer = () =>
    transactionWrapper(async () => {
      const tx = await new ConcaveNFTMarketplace(concaveProvider(chainId)).withdrawAuction(
        signer,
        stakingPosition,
      )
      registerTransaction(tx, {
        type: 'unlist position',
        tokenId: +stakingPosition.tokenId.toString(),
      })
      return tx
    })

  const createOffer = async (offer: Offer) => {
    transactionWrapper(async () => {
      try {
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
    marketItem,
    tx,
    isWaitingForWallet,
    offerDisclosure,
    chainId,
    createOffer,
    setTransaction,
    withdrawOffer,
    createMarketItem,
  }
}

export const getMarketPlaceButtonProps = (marketItemState: UserMarketInfoState): ButtonProps => {
  const { tx, marketItem, isWaitingForWallet, offerDisclosure, createMarketItem, withdrawOffer } =
    marketItemState
  if (tx?.isLoading) {
    return { loadingText: 'Loading', disabled: true, isLoading: true }
  }
  if (isWaitingForWallet) {
    return { loadingText: 'Approve in wallet', disabled: true, isLoading: true }
  }
  if (marketItem.isLoading) {
    return { loadingText: 'Loading market item', disabled: true, isLoading: true }
  }
  if (marketItem.error) {
    return { children: 'Coming soon', disabled: true }
  }
  // if (!marketItem.data.isMarketItem) {
  //   return { children: 'Create market item', onClick: createMarketItem }
  // }
  if (marketItem.data.isAuction) {
    return { children: 'Unlist auction', onClick: withdrawOffer, variant: 'primary.outline' }
  }
  if (marketItem.data.isSale) {
    return { children: 'Unlist sale', onClick: withdrawOffer, variant: 'primary.outline' }
  }
  return { children: 'List for sale', onClick: offerDisclosure.onOpen }
}
