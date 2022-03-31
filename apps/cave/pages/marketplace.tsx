import { Card, Container } from '@concave/ui'
import React from 'react'
import { BigNumber, utils } from 'ethers'
import { useCallback, useEffect, useState } from 'react'
import { Box, Button, Flex, Grid, Heading } from '@concave/ui'
import GcnvTitle from 'components/GcnvTitle'
import Placeholder from 'components/Placeholder'

function marketplace() {
  return (
    <Container maxW="container.lg">
      <GcnvTitle title="Marketplace" description="" />
      <Placeholder />
    </Container>
  )
}

export default marketplace
