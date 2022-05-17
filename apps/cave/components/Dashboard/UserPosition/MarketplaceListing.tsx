import {
  Box,
  Button,
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@concave/ui'
import { ethers } from 'ethers'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { ConcaveNFTMarketplace } from 'lib/ConcaveNFTMarketplaceProxy/ConcaveNFTMarketplace'
import { useMemo } from 'react'
import { useQuery } from 'react-query'
import { useSigner } from 'wagmi'
import UserListPositionCard from '../UserListPositionCard'

interface MarketplaceListingProps {
  address: string
  tokenId: string
}

const MarketplaceListing = (props: MarketplaceListingProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [{ data: signer }] = useSigner()
  const chainId = useCurrentSupportedNetworkId()
  const audiction = useQuery(['Auction', chainId, props.address, props.tokenId], () => {
    const contract = new ConcaveNFTMarketplace(chainId)
    return contract.nftContractAuctions(props.address, props.tokenId)
  })

  const actionButton = useMemo(() => {
    const contract = new ConcaveNFTMarketplace(chainId)
    const buttonProps = {
      fontWeight: 'bold',
      fontSize: 'md',
      w: '150px',
      h: '40px',
    }
    const isListed = audiction.data?.minPrice.gt(0)
    const label = isListed ? 'Unlist' : 'List for Sale'
    const onClick = isListed
      ? () => {
          contract.withdrawAuction(signer, props.address, props.tokenId)
        }
      : onOpen
    const variant = isListed ? 'primary.outline' : 'primary'
    return (
      <Button {...buttonProps} onClick={onClick} variant={variant}>
        {label}
      </Button>
    )
  }, [audiction.data?.minPrice, chainId, onOpen, props.address, props.tokenId, signer])

  return (
    <Box
      mx={2}
      shadow="down"
      height={{ lg: '100px', md: '145px' }}
      borderRadius="16px"
      mt={{ lg: 1, md: 0 }}
      mb={3}
    >
      <Modal title="" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg={'none'} backdropBlur="4px" zIndex={0} />
        <ModalContent>
          <Flex>
            <UserListPositionCard address={props.address} tokenId={props.tokenId} />
          </Flex>
        </ModalContent>
      </Modal>

      <Flex justify={{ lg: 'left', md: 'center' }}>
        <Text pl="6" my={1} pt="3" color="text.low" fontSize="lg" as="b">
          {`Your Marketplace Listing `}
        </Text>
      </Flex>
      <Flex direction={{ lg: 'row', md: 'column' }} alignItems="center" justify="start">
        <Flex>
          <Flex
            width={'110px'}
            direction={'column'}
            textAlign={{ lg: 'start', md: 'center' }}
            ml="2"
          >
            <Text color="text.low" fontSize="sm">
              List Price:
            </Text>
            <Text fontSize="md" fontWeight="bold">
              {audiction.data ? ethers.utils.formatUnits(audiction.data?.minPrice, 0) : '------'}
            </Text>
          </Flex>
          <Flex
            width={'110px'}
            direction={'column'}
            textAlign={{ lg: 'start', md: 'center' }}
            ml="2"
          >
            <Text color="text.low" fontSize="sm">
              Discount:
            </Text>
            <Text fontSize="md" fontWeight="bold">
              ----
            </Text>
          </Flex>
          <Flex
            width={'110px'}
            direction={'column'}
            textAlign={{ lg: 'start', md: 'center' }}
            ml="2"
          >
            <Text color="text.low" fontSize="sm">
              Expiration Date:
            </Text>
            <Text fontSize="md" fontWeight="bold">
              {audiction.data
                ? ethers.utils.formatUnits(audiction.data?.auctionBidPeriod, 0)
                : '--.--.--'}
            </Text>
          </Flex>
        </Flex>
        <Flex direction={'column'} flex={1} textAlign={{ lg: 'start', md: 'center' }} ml="2">
          {actionButton}
        </Flex>
      </Flex>
    </Box>
  )
}

export default MarketplaceListing
