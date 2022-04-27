import { Box, Flex, HStack, Image, Text, VStack } from '@concave/ui'
import { Dispatch, SetStateAction, useState } from 'react'

interface NftPositionCardProps {
  stakePeriod: number
  redeemIn: number
  price: number
  discount: number
  active?: boolean
  onClick?: (any: Dispatch<SetStateAction<boolean>>) => void
}

const NftPositionCard = (props: NftPositionCardProps) => {
  const { stakePeriod, discount, price, redeemIn } = props
  const [active, setActive] = useState(false)
  return (
    <Box
      pos="relative"
      overflowY={'auto'}
      maxHeight={'500px'}
      borderRadius="16px"
      mt={1}
      cursor="pointer"
      css={{
        background:
          'url(Rectangle 110 (00000).jpg), linear-gradient(265.73deg, #274C63 0%, #182F3E 100%)',
        boxShadow: !active
          ? `0px 5px 14px rgba(0, 0, 0, 0.47),
            4px -7px 15px rgba(174, 177, 255, 0.13),
            inset -1px 1px 2px rgba(128, 186, 255, 0.24)`
          : 'only-test',
      }}
    >
      <Flex direction="row" gap={4} alignItems="center" justify="center" m={2}>
        <Flex
          pos="relative"
          w="177px"
          h="68px"
          left={1}
          overflowY={'hidden'}
          borderRadius="16px"
          css={{
            background: 'rgba(113, 113, 113, 0.01)',
          }}
          __css={{
            boxShadow:
              'inset 0px -5px 10px rgba(134, 175, 255, 0.05), inset -9px 12px 24px rgba(13, 17, 23, 0.4)',
          }}
          px={2}
        >
          <HStack>
            <Flex w={'55%'} pl={2} direction="column">
              <Text fontSize="xs" color="text.low" fontWeight="medium">
                Stake Period
              </Text>
              <Text fontSize="s" color="white" fontWeight="bold">
                {stakePeriod} Month
              </Text>
            </Flex>
            <Box w={'45%'}>
              <Image sizes="100%" src={'/assets/marketplace/6mposition.png'} alt="position" />
            </Box>
          </HStack>
        </Flex>

        <Flex flex={1} direction={'column'} textAlign={'start'} ml="2">
          <Text color="text.low" fontSize="sm">
            Redeem In:
          </Text>
          <Text fontSize="md" fontWeight="bold">
            {redeemIn} Days
          </Text>
        </Flex>
        <Flex flex={1} direction={'column'} textAlign={'start'} ml="2">
          <Text color="text.low" fontSize="sm">
            Price:
          </Text>
          <Text fontSize="md" fontWeight="bold">
            {price} CNV
          </Text>
        </Flex>
        <Flex flex={1} direction={'column'} textAlign={'start'} ml="2">
          <Text color="text.low" fontSize="sm">
            Discount:
          </Text>
          <Text fontSize="md" fontWeight="bold">
            {discount}%
          </Text>
        </Flex>
        <Image mx="auto" src={`/assets/liquidstaking/modal-arrow-logo.svg`} alt="arrow down logo" />
      </Flex>
    </Box>
  )
}
export default NftPositionCard
