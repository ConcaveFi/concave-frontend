import { Box, Flex, HStack, Image, Text, VStack } from '@concave/ui'
import { Dispatch, SetStateAction, useState } from 'react'

// interface NftPositionCardProps {
//   active?: boolean
//   onClick?: (any: Dispatch<SetStateAction<boolean>>) => void
// }

const UserDividendCard = (props) => {
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
            background: 'rgba(113, 113, 113, 0.01)',
        boxShadow:
        'inset 0px -5px 10px rgba(134, 175, 255, 0.05), inset -9px 12px 24px rgba(13, 17, 23, 0.4)',
      }}
    >
    <Flex justify="left">
        <Text color="text.low" fontSize="lg" as='b'>
            Your Dividends Share
        </Text>
    </Flex>
    <Flex direction="row" gap={4} alignItems="center" justify="center" m={2}>


        <Flex flex={1} direction={'column'} textAlign={'start'} ml="2">
          <Text color="text.low" fontSize="sm">
            Total Locked:
          </Text>
          <Text fontSize="md" fontWeight="bold">
            6132.42 CNV
          </Text>
        </Flex>
        <Flex flex={1} direction={'column'} textAlign={'start'} ml="2">
          <Text color="text.low" fontSize="sm">
            Your Dividends Share:
          </Text>
          <Text fontSize="md" fontWeight="bold">
            0.00323%
          </Text>
        </Flex>
        <Flex flex={1} direction={'column'} textAlign={'start'} ml="2">
          <Text color="text.low" fontSize="sm">
            Next Dividend Date:
          </Text>
          <Text fontSize="md" fontWeight="bold">
            04.06.2022
          </Text>
        </Flex>
        <Flex flex={1} direction={'column'} textAlign={'start'} ml="2">
          <Text color="text.low" fontSize="sm">
            Available Dividends:
          </Text>
          <Text fontSize="md" fontWeight="bold">
            0.0
          </Text>
        </Flex>
        <Flex flex={1} direction={'column'} textAlign={'start'} ml="2">
          <Text color="text.low" fontSize="sm">
            Redeem
          </Text>
        </Flex>
      </Flex>
    </Box>
  )
}
export default UserDividendCard