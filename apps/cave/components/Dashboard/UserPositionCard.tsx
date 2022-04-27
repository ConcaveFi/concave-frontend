import { Box, Button, Flex, HStack, Image, Text, VStack } from '@concave/ui'
import { Dispatch, SetStateAction, useState } from 'react'

// interface NftPositionCardProps {
//   active?: boolean
//   onClick?: (any: Dispatch<SetStateAction<boolean>>) => void
// }

const UserPositionCard = (props) => {
  const [active, setActive] = useState(false)
  return (
    <Box
      pos="relative"
      overflowY={'auto'}
      maxHeight={'300px'}
      borderRadius="16px"
      w="720px"
      h="300px"
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
        <Box pos="relative" w="570px" h="280px">

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
                6 Month
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
            143 Days
          </Text>
        </Flex>
        <Flex flex={1} direction={'column'} textAlign={'start'} ml="2">
          <Text color="text.low" fontSize="sm">
            Price:
          </Text>
          <Text fontSize="md" fontWeight="bold">
            605 CNV
          </Text>
        </Flex>
        <Flex flex={1} direction={'column'} textAlign={'start'} ml="2">
          <Text color="text.low" fontSize="sm">
            Discount:
          </Text>
          <Text fontSize="md" fontWeight="bold">
            2.3%
          </Text>
        </Flex>
      </Flex>
    </Box>
    <Flex direction="row" gap={4} alignItems="center" justify="center" m={2}>
        <Flex flex={1} direction={'column'} textAlign={'start'} ml="2">
            <Text color="text.low" fontSize="sm">
                Current Value:
            </Text>
            <Text fontSize="md" fontWeight="bold">
                612.42 CNV
            </Text>
        </Flex>
        <Flex flex={1} direction={'column'} textAlign={'start'} ml="2">
            <Text color="text.low" fontSize="sm">
                Gained:
            </Text>
            <Text fontSize="md" fontWeight="bold">
                12.42 CNV
            </Text>
        </Flex>
        <Flex flex={1} direction={'column'} textAlign={'start'} ml="2">
            <Text color="text.low" fontSize="sm">
                Initial:
            </Text>
            <Text fontSize="md" fontWeight="bold">
                600 CNV
            </Text>
        </Flex>
        <Flex flex={1} direction={'column'} textAlign={'start'} ml="2">
        <Button
          mt={5}
        //   onClick={'s'}
          fontWeight="bold"
          fontSize="md"
          variant="primary"
        //   bgGradient="linear(90deg, #72639B 0%, #44B9DE 100%)"
          w="160px"
          h="40px"
          size="large"
          mx="auto"
        >
          Redeem
        </Button>
        </Flex>
        </Flex>
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
            Your Marketplace Listing
        </Text>
    </Flex>
        <Flex direction="row" gap={4} alignItems="center" justify="center" m={2}>
        <Flex flex={1} direction={'column'} textAlign={'start'} ml="2">
            <Text color="text.low" fontSize="sm">
                List Price:
            </Text>
            <Text fontSize="md" fontWeight="bold">
                600 CNV
            </Text>
        </Flex>
        <Flex flex={1} direction={'column'} textAlign={'start'} ml="2">
            <Text color="text.low" fontSize="sm">
                Discount:
            </Text>
            <Text fontSize="md" fontWeight="bold">
                2.4%
            </Text>
        </Flex>
        <Flex flex={1} direction={'column'} textAlign={'start'} ml="2">
            <Text color="text.low" fontSize="sm">
                Expiration Date:
            </Text>
            <Text fontSize="md" fontWeight="bold">
                14.11.22
            </Text>
        </Flex>
        <Flex flex={1} direction={'column'} textAlign={'start'} ml="2">
        <Button
          mt={5}
        //   onClick={'s'}
          fontWeight="bold"
          fontSize="md"
          variant="primary.outline"
        //   bgGradient="linear(90deg, #72639B 0%, #44B9DE 100%)"
          w="160px"
          h="40px"
          size="large"
          mx="auto"
        >
          Unlist
        </Button>
        </Flex>
        </Flex>
    </Box>
    </Box>


    </Box>
  )
}
export default UserPositionCard