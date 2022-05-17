import { Box, Flex, Input, Text } from '@concave/ui'
import ChooseButton from 'components/Marketplace/ChooseButton'
import { ConcaveNFTMarketplace } from 'lib/ConcaveNFTMarketplaceProxy/ConcaveNFTMarketplace'
import { useState } from 'react'
import { chain, useSigner } from 'wagmi'

type UserListPositionCardProps = {
  address: string
  tokenId: string
}

const UserListPositionCard = (props: UserListPositionCardProps) => {
  const [expirationDate, setExpirationDate] = useState('')
  const [listingDate, setListingDate] = useState('')
  const [{ data: signer }] = useSigner()

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
          <Flex
            width={'110px'}
            height="30px"
            shadow={'Up Small'}
            rounded="2xl"
            align="center"
            fontWeight={'700'}
            pl={'4'}
          >
            604 CNV
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
            2.4%
          </Flex>
        </Flex>
        <Flex grow={1} justifyContent="center" alignItems={'end'} gap="2">
          <ChooseButton
            onClick={() => {
              const concaveNFTMarketPlace = new ConcaveNFTMarketplace(chain.ropsten.id, signer)

              concaveNFTMarketPlace
                .createDefaultNftAuction(
                  props.address,
                  props.tokenId,
                  '0xB9CED3eB5Ce9d40A735cA3345978aB62Eca0c4d0',
                  300,
                  800,
                  ['0x8522093305253EfB2685241dc0C587CDD9B10e4B'],
                  [100],
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
