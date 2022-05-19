import { CNV, CurrencyAmount } from '@concave/gemswap-sdk'
import { Box, Flex, Input, NumericInput, Text } from '@concave/ui'
import ChooseButton from 'components/Marketplace/ChooseButton'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { ConcaveNFTMarketplace } from 'lib/ConcaveNFTMarketplaceProxy/ConcaveNFTMarketplace'
import { NonFungibleTokenInfo } from 'lib/ConcaveNFTMarketplaceProxy/NonFungibleToken'
import { useState } from 'react'
import { formatFixed } from 'utils/formatFixed'
import { toAmount } from 'utils/toAmount'
import { useAccount, useSigner } from 'wagmi'

type UserListPositionCardProps = {
  nonFungibleTokenInfo: NonFungibleTokenInfo
}

const UserListPositionCard = (props: UserListPositionCardProps) => {
  const [{ data: account }] = useAccount()
  const [expirationDate, setExpirationDate] = useState('')
  const [listingDate, setListingDate] = useState('')
  const [{ data: signer }] = useSigner()
  const chainId = useCurrentSupportedNetworkId()
  const nonFungibleTokenInfo = props.nonFungibleTokenInfo
  const [price, setPrice] = useState(
    CurrencyAmount.fromRawAmount(
      CNV[chainId],
      nonFungibleTokenInfo.shares.div(100).mul(80).toString(),
    ),
  )
  const discount = nonFungibleTokenInfo.calculteDiscount(price.numerator)
  return (
    <Box
      h={220}
      w={320}
      rounded="2xl"
      background={'linear-gradient(265.73deg, #274C63 0%, #182F3E 100%)'}
      shadow="up"
    >
      <Flex direction={'column'} h={200} mt={5} fontSize={14}>
        <Flex width={'full'} align="center" gap={3}>
          <Flex w={160} py={2} textAlign="end">
            <Text textColor={'text.low'} fontWeight={700} width={'full'}>
              Set Expiration Date:
            </Text>
          </Flex>
          <Flex justifyContent="center" alignItems={'center'}>
            <Input
              value={expirationDate}
              onChange={(result) => setExpirationDate(result.target.value)}
              width="110px"
              height="30px"
              borderRadius={'2xl'}
              pl="4"
            />
          </Flex>
        </Flex>

        <Flex width={'full'} align="center" gap={3}>
          <Flex w={160} py={2} textAlign="end">
            <Text textColor={'text.low'} fontWeight={700} width={'full'}>
              Set Listing Date:
            </Text>
          </Flex>
          <Flex justifyContent="center" alignItems={'center'}>
            <Input
              value={listingDate}
              onChange={(result) => setListingDate(result.target.value)}
              width="110px"
              height="30px"
              borderRadius={'2xl'}
              pl="4"
            />
          </Flex>
        </Flex>

        <Flex width={'full'} align="center" gap={3}>
          <Flex w={160} py={2} textAlign="end">
            <Text textColor={'text.low'} fontWeight={700} width={'full'}>
              Current Value:
            </Text>
          </Flex>
          <Flex justifyContent="center" alignItems={'center'}>
            <NumericInput
              as={Input}
              width="110px"
              height="30px"
              borderRadius={'2xl'}
              pl="4"
              value={+price?.toSignificant(8)}
              onValueChange={(values, sourceInfo) => {
                if (sourceInfo.source === 'prop') return
                if (values.value === '') {
                  return setPrice(toAmount('0', price.currency))
                }
                setPrice(toAmount(values.value, price.currency))
              }}
            />
          </Flex>
        </Flex>

        <Flex width={'full'} align="center" gap={3}>
          <Flex w={160} py={2} textAlign="end">
            <Text textColor={'text.low'} fontWeight={700} width={'full'}>
              Discount:
            </Text>
          </Flex>
          <Flex
            width={'110px'}
            height="30px"
            shadow={'Up Small'}
            rounded="2xl"
            align="center"
            fontWeight={'700'}
            pl={'4'}
          >
            {formatFixed(discount)}
          </Flex>
        </Flex>
        <Flex grow={1} justifyContent="center" alignItems={'end'} gap="2">
          <ChooseButton
            onClick={() => {
              const concaveNFTMarketPlace = new ConcaveNFTMarketplace(chainId)
              concaveNFTMarketPlace
                .createSale(
                  signer,
                  props.nonFungibleTokenInfo.contractAddress,
                  props.nonFungibleTokenInfo.tokenId,
                  price.currency.wrapped.address,
                  price.numerator.toString(),
                  account.address, // this field is mandatory :/
                  [account.address],
                  [10000],
                )
                .then(console.log)
                .catch(console.error)
            }}
            title="List For Sale"
            backgroundType="blue"
          />
        </Flex>
      </Flex>
    </Box>
  )
}

export default UserListPositionCard
