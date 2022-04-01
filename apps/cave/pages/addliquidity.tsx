import { Container } from '@concave/ui'
import React from 'react'
import GcnvTitle from 'components/GcnvTitle'
import Placeholder from 'components/Placeholder'

function marketplace() {
  return (
    <Container maxW="container.lg">
      <GcnvTitle title="Add Liquidity" description="" />
      <Placeholder text="Liquidity Pools" />
    </Container>
  )
}

export default marketplace
