import { Container } from '@concave/ui'
import React from 'react'
import GcnvTitle from 'components/GcnvTitle'
import Placeholder from 'components/Placeholder'

function bond() {
  return (
    <Container maxW="container.lg">
      <GcnvTitle title="Dynamic Bond Market" description="" />
      <Placeholder text="Bonds" />
    </Container>
  )
}

export default bond
