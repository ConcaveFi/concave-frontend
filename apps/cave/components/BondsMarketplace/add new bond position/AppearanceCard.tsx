import { Button, Card, Flex, Heading, Text } from '@concave/ui'
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
        h="fit-content"
        shadow="Block Up"
        w="100%"
        maxW="302px"
        height="312px"
      ></Card>
      <BondMarketplacePosition variant={'primary'}></BondMarketplacePosition>
    </Flex>
  )
}
