import { Container, Flex } from '@chakra-ui/react'
import React from 'react'
import { Page } from 'components/Page'
import GcnvTitle from 'components/GcnvTitle'
import BondInfoCard from 'components/GetCNV/DiscountInfoCard'
import { BuyCard } from 'components/GetCNV/BuyCard'

function Bond() {
  return (
    <Page>
      <Container maxW="container.lg">
        <Flex direction="column" gap={12}>
          <GcnvTitle
            title="Discounted gCNV"
            description="Get your gCNV that will grow internal CNV number your gCNV that will grow number or
                        smth idk lol Get your gCNV that will grow internal CNV number or smth idk lol"
          />
          <Flex gap={6} flexWrap="wrap" justify="center">
            <BuyCard buttonLabel="Get with 5 day vesting" />
            <BondInfoCard />
          </Flex>
        </Flex>
      </Container>
    </Page>
  )
}

export default Bond
