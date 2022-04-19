import { Container } from '@concave/ui'
import React from 'react'
import GcnvTitle from 'components/GcnvTitle'
import Placeholder from 'components/Placeholder'

function marketplace() {
  return (
    <Container maxW="container.lg">
      <GcnvTitle title="Marketplace" description="" />
      <Placeholder text="NFT Marketplace" description="Coming Soon" />
    </Container>
  )
}

export default marketplace
