import {
  Box,
  Card,
  Collapse,
  Flex,
  HStack,
  Image,
  ScaleFade,
  Slide,
  SlideFade,
  Text,
  VStack,
} from '@concave/ui'
import { Dispatch, SetStateAction, useState } from 'react'

interface NftPositionCardProps {
  active?: boolean
  onClick?: (any: Dispatch<SetStateAction<boolean>>) => void
}

const NftPositionCard = (props: NftPositionCardProps) => {
  console.log('ok')
  const [active, setActive] = useState(false)
  return (
    <Box
      transition={'all'}
      transitionDuration={'0.3s'}
      my={active ? 8 : 0}
      borderRadius={16}
      shadow={'up'}
      css={{
        background: 'linear-gradient(265.73deg, #274C63 0%, #182F3E 100%)',
      }}
    >
      <Box
        pos="relative"
        onClick={(e) => {
          setActive(!active)
        }}
        overflowY={'auto'}
        maxHeight={'500px'}
        borderRadius="16px"
        mt={1}
        css={{
          background: 'linear-gradient(265.73deg, #274C63 0%, #182F3E 100%)',
        }}
        cursor="pointer"
        shadow={'up'}
      >
        <Flex direction="row" gap={4} alignItems="center" justify="center" m={2}>
          <Flex
            pos="relative"
            //   border={'1px solid green'}
            w="177px"
            h="68px"
            left={1}
            overflowY={'hidden'}
            // maxHeight={'500px'}
            borderRadius="16px"
            css={{
              background: 'rgba(204, 95, 95, 0.01)',
              boxShadow:
                'inset 0px -5px 10px rgba(134, 175, 255, 0.05), inset -9px 12px 24px rgba(13, 17, 23, 0.4)',
            }}
            /* 1/Up (Small) */
            // boxShadow="down"
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
                <Image sizes="100%" src={'/assets/marketplace/6mposition.png'} alt="Dan Abramov" />
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
          <Image
            mx="auto"
            src={`/assets/liquidstaking/modal-arrow-logo.svg`}
            alt="arrow down logo"
          />
        </Flex>
      </Box>
      <Collapse in={active} endingHeight={100}>
        <Box background={'cyan.50'}></Box>
      </Collapse>
    </Box>
  )
}
export default NftPositionCard
