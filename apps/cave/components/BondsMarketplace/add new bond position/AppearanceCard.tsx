import { Box, Button, Card, Flex, Heading, HStack, Text } from '@concave/ui'
import { ButtonLink } from 'components/ButtonLink'
import React from 'react'
import { MdOutlineDashboard } from 'react-icons/md'
import { BondMarketplacePosition } from '../BondMarketplacePosition'

export function AppearancedCard() {
  return (
    <Flex flexDir={'row'} gap={10} mb={10}>
      <Card
        p={5}
        gap={4}
        variant="primary"
        shadow="Block Up"
        w="100%"
        maxW="302px"
        height="312px"
        align={'center'}
      >
        <Flex
          shadow="down"
          justify={'center'}
          width="277px"
          height="55px"
          alignContent={'left'}
          rounded={'2xl'}
          flexDirection="column"
        >
          <Text px={3} textAlign={'left'} fontSize="24px" fontWeight="600" textColor="text.high">
            Appearance
          </Text>
        </Flex>
        <Flex
          shadow="down"
          justify={'center'}
          width="277px"
          height="223px"
          alignContent={'center'}
          rounded={'2xl'}
          flexDirection="column"
        >
          <HStack mt={4} mb={4} align="center" px={3}>
            <Text
              textAlign={'center'}
              fontSize="12px"
              width="50%"
              fontWeight="700"
              textColor="text.low"
            >
              Add Token Logo:
            </Text>
            <Flex height="50px" width="50px" shadow="up" rounded={'2xl'}></Flex>
          </HStack>
          <HStack align="center" mb={4} px={3}>
            <Text
              textAlign={'center'}
              fontSize="12px"
              fontWeight="700"
              width="50%"
              textColor="text.low"
              mb={4}
            >
              Protocol Name:
            </Text>
            <Flex height="32px" width="156px" shadow="down" rounded={'xl'}></Flex>
          </HStack>
          <HStack justify="center" mb={4} px={3}>
            <Text
              textAlign={'center'}
              width="50%"
              fontSize="12px"
              fontWeight="700"
              textColor="text.low"
            >
              Ticker:
            </Text>
            <Flex height="32px" width="156px" shadow="down" rounded={'xl'}></Flex>
          </HStack>
          <HStack justify="center" mb={4} px={3}>
            <Text
              textAlign={'center'}
              fontSize="12px"
              fontWeight="700"
              width="50%"
              textColor="text.low"
            >
              Brand Color:
            </Text>
            <Flex height="32px" width="156px" shadow="down" rounded={'xl'}></Flex>
          </HStack>
        </Flex>
      </Card>
      <BondMarketplacePosition variant={'primary'}></BondMarketplacePosition>
    </Flex>
  )
}
