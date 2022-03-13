import { Card, Container } from '@concave/ui'
import React from 'react'
import { BigNumber, utils } from 'ethers'
import { useCallback, useEffect, useState } from 'react'
import { Box, Button, Flex, Grid, Heading } from '@concave/ui'
import GcnvTitle from 'components/GcnvTitle'

function marketplace() {
  return (
    <Container maxW="container.lg">
      <GcnvTitle
        title="Marketplace"
        description="Buy or Sell liquid staked positions or something something."
      />

      <Card
        w="620px"
        h="903px"
        borderWidth={0}
        borderRadius={16}
        px={6}
        py={10}
        shadow="up"
        bgGradient="linear(to-tr, secondary.150, secondary.100)"
        gap={1}
      >
        <Card
          w="570px"
          h="80px"
          borderWidth={0}
          borderRadius={16}
          px={6}
          py={10}
          shadow="up"
          bgGradient="linear(to-tr, secondary.150, secondary.100)"
          gap={1}
        ></Card>
      </Card>
    </Container>
  )
}

export default marketplace
