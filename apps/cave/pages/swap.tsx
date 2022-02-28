import { Container, Flex } from '@concave/ui'
import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { Page } from 'components/Page'
import GcnvTitle from 'components/GcnvTitle'
import { QUERY_TEST } from 'graphql/test'
import { CandleStickCard } from 'components/CandleStickCard'
import { SwapCard } from 'components/GetCNV/SwapCard'
import { SwapContext, useSwap } from 'hooks/useSwap'

function Swap() {
  const { loading, error, data } = useQuery(QUERY_TEST)
  console.log('loading', loading)
  console.log('error', error)
  console.log('data', data)

  return (
    <Page>
      <Container maxW="container.lg">
        <SwapContext.Provider value={useSwap()}>
          <Flex direction="column" gap={12}>
            <GcnvTitle title="Swap gCNV" description="Swap gCNV here" />
            <Flex gap={6} flexWrap="wrap" justify="center">
              <CandleStickCard />
              <SwapCard buttonLabel="Swap" active="swap" />
            </Flex>
          </Flex>
        </SwapContext.Provider>
      </Container>
    </Page>
  )
}

export default Swap
