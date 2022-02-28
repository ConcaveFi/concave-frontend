import { Container, Flex } from '@concave/ui'
import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { Page } from 'components/Page'
import GcnvTitle from 'components/GcnvTitle'
import { QUERY_TEST } from 'graphql/test'
import { CandleStickCard } from 'components/CandleStickCard'
import { SwapCard } from 'components/GetCNV/SwapCard'
import { useSwap } from 'hooks/useSwap'

function Swap() {
  const { loading, error, data } = useQuery(QUERY_TEST)
  const swap = useSwap()
  console.log('loading', loading)
  console.log('error', error)
  console.log('data', data)
  return (
    <Page>
      <Container maxW="container.lg">
        <Flex direction="column" gap={12}>
          <GcnvTitle title="Swap gCNV" description="Swap gCNV here" />
          <Flex gap={6} flexWrap="wrap" justify="center">
            <CandleStickCard swap={swap} />
            <SwapCard swap={swap} buttonLabel="Swap" active="swap" />
          </Flex>
        </Flex>
      </Container>
    </Page>
  )
}

export default Swap
