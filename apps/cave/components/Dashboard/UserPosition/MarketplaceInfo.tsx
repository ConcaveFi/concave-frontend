import {
  Box,
  Button,
  ButtonProps,
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@concave/ui'
import { Loading } from 'components/Loading'
import { Transaction } from 'ethers'
import { Offer } from 'lib/ConcaveNFTMarketplaceProxy/Auction'
import { ConcaveNFTMarketplace } from 'lib/ConcaveNFTMarketplaceProxy/ConcaveNFTMarketplace'
import { fechMarketInfo } from 'lib/ConcaveNFTMarketplaceProxy/Fetcher'
import { MarketItemInfo } from 'lib/ConcaveNFTMarketplaceProxy/MarketInfo'
import { NonFungibleTokenInfo } from 'lib/ConcaveNFTMarketplaceProxy/NonFungibleToken'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { formatFixed } from 'utils/formatFixed'
import { useSigner, useWaitForTransaction } from 'wagmi'
import { ListPositionForSale, useListeForSaleState } from '../UserListPositionCard'
import { Info } from './RedeemViewer'
interface MarketplaceInfoProps {
  nonFungibleTokenInfo: NonFungibleTokenInfo
}

const MarketplaceInfo = (props: MarketplaceInfoProps) => {
  const marketInfoState = useMarketInfo(props)
  const buttonState = useMarketInfoActionButton(marketInfoState)
  const { marketInfo } = marketInfoState
  if (marketInfo.isLoading) {
    return <Loading m={4} size="sm" rLabel="Loading market info" />
  }
  return (
    <Box
      shadow={marketInfo.data.isListed ? '' : 'down'}
      borderRadius="2xl"
      mt={{ lg: 1, md: 0 }}
      mb={3}
      mx={2}
      py={3}
      px={4}
    >
      <Flex justify={{ lg: 'left', md: 'center' }}>
        <Text color="text.low" fontSize="lg" as="b">
          Your Marketplace Listing
        </Text>
      </Flex>
      <Flex justify={{ lg: 'left', md: 'center' }}>
        <Info
          label={'List Price:'}
          width={'full'}
          valueFontSize={'lg'}
          value={
            marketInfo.data.isListed
              ? `${formatFixed(marketInfo.data.listPrice, { places: 4 })} CNV`
              : '---'
          }
        />
        <Info
          label={'Discount:'}
          width={'full'}
          value={
            marketInfo.data.isListed
              ? `${formatFixed(marketInfo.data.discount, { decimals: 2 })} %`
              : '---'
          }
        />
        <Info label={'Expiration Date:'} width={'full'} value={'---'} />
        <Button variant={'primary'} minW={'160px'} size={'md'} width={'full'} {...buttonState} />
      </Flex>
      <ListForSaleModal marketInfoState={marketInfoState} />
    </Box>
  )
}

export type UserMarketInfoState = ReturnType<typeof useMarketInfo>
const useMarketInfo = ({
  nonFungibleTokenInfo,
}: {
  nonFungibleTokenInfo: NonFungibleTokenInfo
}) => {
  const offerDisclosure = useDisclosure()
  const networkId = nonFungibleTokenInfo.networkId
  const [{ data: signer }] = useSigner()
  const contract = new ConcaveNFTMarketplace(networkId)
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
      const tx = await contract.createMarketItem(signer, nonFungibleTokenInfo)
      setTransaction(tx)
    } catch {}
    setIsWaitingForWallet(false)
  }

  const withdrawOffer = async () => {
    setIsWaitingForWallet(true)
    try {
      const tx = await contract.withdrawAuction(signer, nonFungibleTokenInfo)
      setTransaction(tx)
    } catch {}
    setIsWaitingForWallet(false)
  }

  const createOffer = async (offer: Offer) => {
    setIsWaitingForWallet(true)
    try {
      const marketItemInfo = new MarketItemInfo({ ...marketInfo.data, offer })
      const tx = await contract.createOffer(signer, marketItemInfo)
      setTransaction(tx)
    } catch {}
    setIsWaitingForWallet(false)
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

const useMarketInfoActionButton = (marketInfoState: UserMarketInfoState): ButtonProps => {
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

const ListForSaleModal = ({ marketInfoState }: { marketInfoState: UserMarketInfoState }) => {
  const listForSaleState = useListeForSaleState({ marketInfoState })
  return (
    <Modal
      title=""
      size={'xs'}
      isOpen={marketInfoState.offerDisclosure.isOpen}
      onClose={marketInfoState.offerDisclosure.onClose}
      isCentered
    >
      <ModalOverlay bg={'none'} backdropBlur="4px" zIndex={0} />
      <ModalContent>
        <ListPositionForSale state={listForSaleState} />
      </ModalContent>
    </Modal>
  )
}

export default MarketplaceInfo
