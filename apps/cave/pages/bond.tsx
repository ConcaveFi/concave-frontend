import { Container, Flex } from '@concave/ui'
import React from 'react'
import { Page } from '../components/Page'
import GcnvTitle from 'components/GcnvTitle'
import TokenSelector from 'components/TokenSelector'

function Bond() {
  return (
    <Page>
      <Container maxW="container.lg">
        <Flex direction="column" gap={12}>
          <GcnvTitle
            title="Dynamic Bond Market"
            description="Get your gCNV that will grow internal CNV number  your gCNV that will grow number or smth idk lol Get your gCNV that will grow internal CNV number or smth idk lol"
          />
          <Flex gap={6} flexWrap="wrap" justify="left">
            <TokenSelector />
          </Flex>
        </Flex>
      </Container>
    </Page>
  )
}

export default Bond
