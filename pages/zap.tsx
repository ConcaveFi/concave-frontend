import { Container, Flex } from '@chakra-ui/react'
import React from 'react'
import { Page } from 'components/Page'
import GcnvTitle from 'components/GcnvTitle'
import ZapInfoCard from 'components/GetCNV/ZapInfoCard'
import BuyCard from 'components/GetCNV/BuyCard'

function Zap() {
  return (
    <Page>
      <Container maxW="container.lg">
        <Flex direction="column" gap={12}>
          <GcnvTitle title="Zap gCNV" description="Zap that ass for me, Zap dat ass for me!" />
          <Flex gap={6} flexWrap="wrap" justify="center">
            <BuyCard buttonLabel="Zap" active="zap" />
            <ZapInfoCard />
          </Flex>
        </Flex>
      </Container>
    </Page>
  )
}

export default Zap
