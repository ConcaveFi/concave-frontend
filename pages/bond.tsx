import { Container, Flex } from '@chakra-ui/react'
import React from 'react'
import { Page } from '../components/Page'
import GcnvTitle from 'components/GcnvTitle'
import BondCard from 'components/Bond/bondcard'

function bondcardf() {
  return (
    <Page>
      <Container maxW="container.lg">
        <Flex direction="column" gap={12}>
          <GcnvTitle title="bonding" description="placeholder" />
          <Flex gap={6} flexWrap="wrap" justify="left">
            <BondCard buttonLabel={0} />

            <Flex gap={6} flexWrap="wrap" justify="right">
              <BondCard buttonLabel={0} />
            </Flex>
          </Flex>
        </Flex>
      </Container>
      <Container maxW="container.lg">
        <Flex direction="column" gap={12}>
          <GcnvTitle title="bond title" description="bonds" />
        </Flex>
      </Container>
    </Page>
  )
}

export default bondcardf
