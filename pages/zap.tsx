import { Container, Flex } from '@chakra-ui/react'
import React from 'react'
import { Page } from '../components/Page'
import { NavBar } from 'components/Gcnv'
import GcnvTitle from 'components/GcnvTitle'
import ZapCard from 'components/ZapCard'
import ZapInfoCard from 'components/ZapInfoCard'

function Zap() {
  return (
    <Page>
      <Container maxW="container.lg">
        <Flex direction="column" gap={12}>
          <GcnvTitle
            title="Zap gCNV"
            description="Get your gCNV that will grow internal CNV number your gCNV that will grow number or
                        smth idk lol Get your gCNV that will grow internal CNV number or smth idk lol"
          />

          <NavBar active="zap" />

          <Flex gap={6} flexWrap="wrap" justify="center">
            <ZapCard />
            <ZapInfoCard />
          </Flex>
        </Flex>
      </Container>
    </Page>
  )
}

export default Zap
