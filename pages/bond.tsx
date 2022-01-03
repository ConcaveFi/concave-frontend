import { Container, Flex } from '@chakra-ui/react'
import { Card } from 'components/Card'
import React from 'react'
import { Page } from '../components/Page'
import { NavBar } from 'components/Gcnv'
import GcnvTitle from 'components/GcnvTitle'
import BondCard from 'components/BondCard'
import BondInfoCard from 'components/BondInfoCard'

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

          <NavBar active="bond" />

          <Flex gap={6} flexWrap="wrap" justify="center">
            <BondCard />
            <BondInfoCard />
          </Flex>
        </Flex>
      </Container>
    </Page>
  )
}

export default Bond
