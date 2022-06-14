import {
  ConcaveNFTMarketplace,
  fechMarketInfo,
  MarketItemInfo,
  NonFungibleTokenInfo,
  Offer,
} from '@concave/marketplace'
import { ButtonProps, useDisclosure } from '@concave/ui'
import { Transaction } from 'ethers'
import { concaveProvider } from 'lib/providers'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useSigner, useWaitForTransaction } from 'wagmi'

export type UserMarketInfoState = ReturnType<typeof useMarketInfo>
export const useMarketInfo = ({
  nonFungibleTokenInfo,
}: {
  nonFungibleTokenInfo: NonFungibleTokenInfo
}) => {
  const offerDisclosure = useDisclosure()
  const networkId = nonFungibleTokenInfo.networkId
  const { data: signer } = useSigner()
  const [transaction, setTransaction] = useState<Transaction>()
  const [isWaitingForWallet, setIsWaitingForWallet] = useState<boolean>(false)
  const tx = useWaitForTransaction({ hash: transaction?.hash })
  const marketInfo = useQuery(
    ['MarketInfo', tx.data, networkId, nonFungibleTokenInfo.tokenId],
    async () => {
      const marketPlaceInfo = await fechMarketInfo(concaveProvider(networkId), nonFungibleTokenInfo)
      return marketPlaceInfo
    },
    { enabled: !!networkId && !!nonFungibleTokenInfo.tokenId },
  )

  const transactionWrapper = async (fn: () => Promise<Transaction>) => {
    setIsWaitingForWallet(true)
    try {
      await fn()
    } catch {}
    setIsWaitingForWallet(false)
  }

  const createMarketItem = () =>
    transactionWrapper(() =>
      new ConcaveNFTMarketplace(concaveProvider(networkId)).createMarketItem(
        signer,
        nonFungibleTokenInfo,
      ),
    )

  const withdrawOffer = () =>
    transactionWrapper(() =>
      new ConcaveNFTMarketplace(concaveProvider(networkId)).withdrawAuction(
        signer,
        nonFungibleTokenInfo,
      ),
    )

  const createOffer = async (offer: Offer) => {
    transactionWrapper(() => {
      const contract = new ConcaveNFTMarketplace(concaveProvider(networkId))
      const marketItemInfo = new MarketItemInfo({ ...marketInfo.data, offer })
      return contract.createOffer(signer, marketItemInfo)
    })
    offerDisclosure.onClose()
  }

  return {
    marketInfo,
    tx,
    isWaitingForWallet,
    offerDisclosure,
    networkId,
    createOffer,
    setTransaction,
    withdrawOffer,
    createMarketItem,
  }
}

export const getMarketPlaceButtonProps = (marketInfoState: UserMarketInfoState): ButtonProps => {
  const { tx, marketInfo, isWaitingForWallet, offerDisclosure, createMarketItem, withdrawOffer } =
    marketInfoState
  if (tx?.isLoading) {
    return { loadingText: 'Loading', disabled: true, isLoading: true }
  }
  if (isWaitingForWallet) {
    return { loadingText: 'Approve in wallet', disabled: true, isLoading: true }
  }
  if (marketInfo.isLoading) {
    return { loadingText: 'Loading Market Item', disabled: true, isLoading: true }
  }
  if (marketInfo.error) {
    return { children: 'Comming Soom', disabled: true }
  }
  if (!marketInfo.data.isMarketItem) {
    return { children: 'Create Market Item', onClick: createMarketItem }
  }
  if (marketInfo.data.isAuction) {
    return { children: 'Unlist Auction', onClick: withdrawOffer, variant: 'primary.outline' }
  }
  if (marketInfo.data.isSale) {
    return { children: 'Unlist Sale', onClick: withdrawOffer, variant: 'primary.outline' }
  }
  return { children: 'List For Sale', onClick: offerDisclosure.onOpen }
}
