import { Container, Flex } from '@chakra-ui/react'
import { Card } from 'components/Card'
import React from 'react'
import { Page } from '../components/Page'
import { NavBar } from 'components/Gcnv'
import GcnvTitle from 'components/GcnvTitle'
import SwapCard from 'components/SwapCard'
import SwapInfoCard from 'components/SwapInfoCard'

function Swap() {
  return (
    <Page>
      <Container maxW="container.lg">
        <Flex direction="column" gap={12}>
          <GcnvTitle
            title="Swap gCNV"
            description="Get your gCNV that will grow internal CNV number your gCNV that will grow number or
                        smth idk lol Get your gCNV that will grow internal CNV number or smth idk lol"
          />

          <NavBar active="swap" />

          <Flex gap={6} flexWrap="wrap" justify="center">
            <SwapCard />
            <SwapInfoCard />
          </Flex>
        </Flex>
      </Container>
    </Page>
  )
}

export default Swap
