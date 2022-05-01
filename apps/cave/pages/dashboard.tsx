import React, { useEffect, useState } from 'react'
import { Container, Flex, Heading, HStack, Stack, Text } from '@concave/ui'

import MarketplaceSearchCard from 'components/Marketplace/MarketplaceSearchCard'
import UserDashboardCard from 'components/Dashboard/UserDashboardCard'
import { Contract, ethers } from 'ethers'
import { LIQUID_STAKING_ADDRESS } from 'contracts/LiquidStaking/LiquidStakingAddress'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { StakingV1Abi, TransparentUpgradeableProxy } from 'contracts/LiquidStaking/LiquidStakingAbi'
import { useAccount, useContractRead } from 'wagmi'
import { useDashBoardState } from 'contracts/DashBoard/DashBoardState'
let providers = new ethers.providers.InfuraProvider('ropsten', '5ad069733a1a48a897180e66a5fb8846')

const dashboard = () => {
  const { owner } = useDashBoardState()
  console.log(owner)

  // console.log(owner)

  return (
    <Container maxW="container.lg" borderRadius={0} border="" textAlign="center">
      <Heading as="h1" mt={16} mb={3} fontSize="5xl"></Heading>
      <HStack mt={8} spacing={14}>
        <Text maxW={520} textAlign="center">
          This is the user dashboard to claim divdends and manage your liquid NFT positions.
        </Text>
      </HStack>

      <Flex mr="6" gap={8} position="relative" mt={16}>
        <UserDashboardCard />
      </Flex>
    </Container>
  )
}

export default dashboard
