import { Box, Flex, Heading, HStack, Image, VStack } from '@concave/ui'
import { AirdropClaimCard } from 'components/Airdrop/AirdropClaimCard'
import { ComingSoom } from 'components/ComingSoon'
import { ACNVChart } from 'components/Transparency/Charts/ACNVChart'
import { BbtCNVChart } from 'components/Transparency/Charts/BbtCNVChart'
import { RedemACNVCard } from 'components/Transparency/VestedTokensDialogs/ACNVRedemptionDialog'
import { RedemBBTCard } from 'components/Transparency/VestedTokensDialogs/BBTCNVRedemptionDialog'
import { RedeemPCNVCard } from 'components/Transparency/VestedTokensDialogs/PCNVRedemptionDialog'
import { StakeSettingsProvider } from 'contexts/PositionsFilterProvider'
import { useRouter } from 'next/router'
import { RedeemTokens } from './redeem/RedeemTokens'
import { RedeemTokensCard } from './redeem/RedeemTokensCard'
import { SnapshotOptions } from './SnapshotOptions'
import { BondingSnapshot } from './Summary/Bonding/BondingSnapshot'
import { MarketplaceSnapshot } from './Summary/Marketplace/MarketplaceSnapshot'
import { LiquiditySnapshot } from './Summary/Pools/LiquiditySnapshot'
import { LiquidStakingSnapshot } from './Summary/Staking/LiquidStakingSnapshot'
import { TxHistory } from './Summary/TxHistory/TxHistory'

export function UserDashboardContent() {
  const router = useRouter()
  const selectedView = getView(router.query.view as SnapshotOptions)
  console.log(router.query.view as string, SnapshotOptions.LiquidStaking)

  return (
    <Flex w={'100%'} h="full">
      {selectedView}
    </Flex>
  )
}

function getView(selectedSnapshot: SnapshotOptions) {
  switch (selectedSnapshot) {
    case SnapshotOptions.History:
      return <TxHistory />
    case SnapshotOptions.Liquidity:
      return <LiquiditySnapshot />
    case SnapshotOptions.DynamicBonds:
      return <BondingSnapshot />
    case SnapshotOptions.LiquidStaking:
      return (
        <StakeSettingsProvider>
          <LiquidStakingSnapshot />
        </StakeSettingsProvider>
      )
    case SnapshotOptions.Marketplace:
      return <MarketplaceSnapshot />
    case SnapshotOptions.Redeem:
      return (
        <VStack
          p={4}
          gap={2}
          borderRadius={'3xl'}
          justifyContent={'space-evenly'}
          w={'full'}
          h={'full'}
          shadow={'Down Big'}
          overflowY={'auto'}
        >
          <Flex w={'full'} h={'fit-content'} gap={4}>
            <RedeemTokensCard maxW={'unset'} w={'full'} />
          </Flex>
          <Flex w={'full'} h={'fit-content'} gap={4}>
            <ACNVChart fontSize="6xl" w={'full'} />
            <BbtCNVChart w={'full'} />
          </Flex>
        </VStack>
      )
    case SnapshotOptions.RedeemBBT:
      return (
        <VStack
          p={4}
          gap={2}
          borderRadius={'3xl'}
          w={'full'}
          shadow={'Down Big'}
          overflowY={'auto'}
          align="center"
          justifyContent={'space-evenly'}
        >
          <Flex w={'full'} maxW={'500px'} h={'fit-content'} gap={4}>
            <BbtCNVChart w={'full'} flex={1} />
          </Flex>
          <Flex w={'full'} maxW={'500px'} h={'fit-content'} gap={4}>
            <RedemBBTCard w={'full'} fontSize="6xl" />
          </Flex>
        </VStack>
      )
    case SnapshotOptions.RedeemPCNV:
      return (
        <VStack
          p={4}
          gap={2}
          borderRadius={'3xl'}
          w={'full'}
          h={'full'}
          shadow={'Down Big'}
          justifyContent={'space-evenly'}
          overflowY={'auto'}
        >
          <Flex w={'full'} justifyContent={'space-evenly'} h={'fit-content'} gap={4}>
            <RedeemPCNVCard maxW={'500px'} w={'full'} flex={1} />
          </Flex>
        </VStack>
      )
    case SnapshotOptions.RedeemACNV:
      return (
        <VStack
          p={4}
          gap={2}
          borderRadius={'3xl'}
          w={'full'}
          h={'full'}
          shadow={'Down Big'}
          overflowY={'auto'}
        >
          <Flex w={'full'} h={'fit-content'} gap={4}>
            <RedemACNVCard w={'full'} flex={1} />
            <ACNVChart fontSize="6xl" />
          </Flex>
        </VStack>
      )
    case SnapshotOptions.Redeem2:
      return (
        <VStack
          p={4}
          gap={2}
          borderRadius={'3xl'}
          w={'full'}
          h={'full'}
          shadow={'Down Big'}
          overflowY={'auto'}
        >
          <Flex w={'full'} justifyContent={'space-evenly'} h={'fit-content'} gap={4}>
            <RedeemPCNVCard maxW={'500px'} w={'full'} flex={1} />
          </Flex>
          <Flex w={'full'} h={'fit-content'} gap={4}>
            <RedemACNVCard w={'full'} flex={1} />
            <RedemBBTCard w={'full'} flex={1} />
          </Flex>
          <Flex w={'full'} h={'fit-content'} gap={4}>
            <ACNVChart fontSize="6xl" w={'full'} />
            <BbtCNVChart w={'full'} />
          </Flex>
        </VStack>
      )

    case SnapshotOptions.Airdrop:
      return (
        <Flex flex={1} align={'center'} direction={'column'}>
          <Image src="./assets/airdrop/airdrops.png" alt="airdrop rain" objectFit={'contain'} />
          <AirdropClaimCard />
        </Flex>
      )

    default:
      return (
        <Flex flex={1} justify={'center'} align="center">
          <Heading>Coming soon</Heading>
        </Flex>
      )
  }
}
