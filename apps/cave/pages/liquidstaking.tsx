import { Container, Flex, Heading, HStack, Text } from '@concave/ui'
import StakeCard from 'components/LiquidStaking/StakeCard'
import GraphicGuide from 'components/LiquidStaking/GraphicGuide'
import { useEffect, useState } from 'react'
import {
  CNVMintAbi,
  StakingV1Abi,
  testABI,
  testCNVABI,
  wagmigotchiABI,
} from 'contracts/LiquidStaking/LiquidStakingAbi'
import { Provider, useAccount, useContractRead, useProvider } from 'wagmi'
import { providers } from 'ethers'

interface StakingGroupProps {
  icon: string
  period: string
  vapr: string
  stakedCNV: string
  CNVCap: string
  stakingLink: string
}

const StakingGroup: Array<StakingGroupProps> = [
  {
    icon: '360d',
    period: '360 days',
    vapr: '6,342',
    stakedCNV: '89999',
    CNVCap: '90000',
    stakingLink: '',
  },
  // {
  //   icon: '180d',
  //   period: '180 days',
  //   vapr: '1,002',
  //   stakedCNV: '42690',
  //   CNVCap: '60000',
  //   stakingLink: '',
  // },
  // {
  //   icon: '90d',
  //   period: '90 days',
  //   vapr: '266',
  //   stakedCNV: '13333',
  //   CNVCap: '80000',
  //   stakingLink: '',
  // },
  // {
  //   icon: '45d',
  //   period: '45 days',
  //   vapr: '17',
  //   stakedCNV: '69420',
  //   CNVCap: '90000',
  //   stakingLink: '',
  // },
]

function LiquidStaking() {
  // const [stakingCap, read] = useContractRead(
  //   {
  //     addressOrName: '0x2B8E79CBD58418CE9aeB720BAf6B93825B93eF1F',
  //     contractInterface: CNVMintAbi,
  //   },
  //   'totalSupply',
  // )
  // useEffect(() => {
  //   console.log(stakingCap.error)
  // }, [stakingCap])
  // const [{ data: account }] = useAccount()

  const [result, read] = useContractRead(
    {
      addressOrName: '0x2B7Ea66d564399246Da8e3D6265dB8F89af834C8',
      contractInterface: StakingV1Abi,
    },
    'totalSupply',
    // {
    //   args: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
    // },
  )
  console.log(result.error)
  useEffect(() => {
    console.log(result.loading)
    console.log(result.error)
    console.log(result.data)
  }, [result])
  console.log(result.data)

  return (
    <Container maxW="container.lg" borderRadius={0} border="" textAlign="center">
      <Heading as="h1" mt={16} mb={3} fontSize="5xl">
        Liquid Staking
      </Heading>
      <HStack mt={8} spacing={14}>
        <Text maxW={520} textAlign="right">
          Liquid Staking allows you to access your funds even when you&apos;re staking them. The
          funds remain in escrow, but aren&apos;t totally inaccessible. In this scenario, you are
          able to trade the locked-staking positions in the form of NFTs in the secondary
          marketplace.
        </Text>
        <GraphicGuide />
      </HStack>

      <Flex direction="row" gap={8} position="relative" mt={16}>
        {StakingGroup.map((s) => (
          <StakeCard
            icon={s.icon}
            period={s.period}
            vapr={s.vapr}
            stakedCNV={s.stakedCNV}
            CNVCap={s.CNVCap}
            stakingLink={s.stakingLink}
            key={s.period}
          />
        ))}
      </Flex>
    </Container>
  )
}

export default LiquidStaking
