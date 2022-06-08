import { ButtonProps, useDisclosure } from '@concave/ui'
import { Transaction } from 'ethers'
import { Offer } from 'lib/ConcaveNFTMarketplaceProxy/Auction'
import { ConcaveNFTMarketplace } from 'lib/ConcaveNFTMarketplaceProxy/ConcaveNFTMarketplace'
import { fechMarketInfo } from 'lib/ConcaveNFTMarketplaceProxy/Fetcher'
import { MarketItemInfo } from 'lib/ConcaveNFTMarketplaceProxy/MarketInfo'
import { NonFungibleTokenInfo } from 'lib/ConcaveNFTMarketplaceProxy/NonFungibleToken'
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
  const [{ data: signer }] = useSigner()
  const [transaction, setTransaction] = useState<Transaction>()
  const [isWaitingForWallet, setIsWaitingForWallet] = useState<boolean>(false)
  const [tx] = useWaitForTransaction({ hash: transaction?.hash })
  const marketInfo = useQuery(
    ['MarketInfo', tx, networkId, nonFungibleTokenInfo.tokenId],
    async () => {
      const marketPlaceInfo = await fechMarketInfo(networkId, nonFungibleTokenInfo)
      return marketPlaceInfo
    },
    { enabled: !!networkId && !!nonFungibleTokenInfo.tokenId },
  )

  const createMarketItem = async () => {
    setIsWaitingForWallet(true)
    try {
      const contract = new ConcaveNFTMarketplace(networkId)
      const tx = await contract.createMarketItem(signer, nonFungibleTokenInfo)
      setTransaction(tx)
    } catch {}
    setIsWaitingForWallet(false)
  }

  const withdrawOffer = async () => {
    setIsWaitingForWallet(true)
    try {
      const contract = new ConcaveNFTMarketplace(networkId)
      const tx = await contract.withdrawAuction(signer, nonFungibleTokenInfo)
      setTransaction(tx)
    } catch {}
    setIsWaitingForWallet(false)
  }

  const createOffer = async (offer: Offer) => {
    setIsWaitingForWallet(true)
    try {
      const contract = new ConcaveNFTMarketplace(networkId)
      const marketItemInfo = new MarketItemInfo({ ...marketInfo.data, offer })
      const tx = await contract.createOffer(signer, marketItemInfo)
      setTransaction(tx)
    } catch {}
    setIsWaitingForWallet(false)
    offerDisclosure.onClose()
  }

  return {
    marketInfo,
    tx,
    isWaitingForWallet,
    offerDisclosure,
    createOffer,
    setTransaction,
    withdrawOffer,
    createMarketItem,
  }
}

export const getMarketPlaceButtonProps = (marketInfoState: UserMarketInfoState): ButtonProps => {
  const { tx, marketInfo, isWaitingForWallet, offerDisclosure, createMarketItem, withdrawOffer } =
    marketInfoState
  if (tx?.loading) {
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
  console.log(marketInfo)
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
