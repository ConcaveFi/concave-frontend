import { Flex, Heading, keyframes, Text } from '@concave/ui'
import { GraphicGuide } from 'components/LiquidStaking/GraphicGuide'
import { useLiquidStakeData } from 'components/LiquidStaking/hooks/useLiquidStakeData'
import { LiquidLocksCards } from 'components/LiquidStaking/LiquidLocksCards'
import { StakeCard } from 'components/LiquidStaking/StakeCard'
import { withPageTransition } from 'components/PageTransition'
function LiquidStaking() {
  const { stakeData, status } = useLiquidStakeData()
  return (
    <Flex
      width={{ base: '340px', md: '420px', xl: '1100px' }}
      justify={'start'}
      align="center"
      mx={'auto'}
      direction={'column'}
      p="0px"
    >
      <Heading
        as="h1"
        apply={'background.text-brightBlue'}
        fontWeight={'semibold'}
        mt={{ base: 12, md: 8 }}
        fontSize={{ base: '4xl', sm: '5xl' }}
      >
        Liquid Staking
      </Heading>
      <Flex
        align={'center'}
        justify="center"
        direction={{ xl: 'row', base: 'column' }}
        mt={{ xl: 8, base: 0 }}
        gap={{ xl: 24, base: 2 }}
        textColor="white"
      >
        <Text
          maxW={520}
          apply={'background.text-brightBlue'}
          textAlign={{ xl: 'justify', base: 'center' }}
          fontSize={{ base: 'sm', sm: 'md' }}
        >
          Stakers are incentivized with daily rewards and <br /> quarterly dividends to grow their
          CNV holdings
          <br />
          with profit from the protocol. Staked positions
          <br />
          are represented by NFTs that are tradable
          <br />
          in Concave&apos;s native Marketplace.
        </Text>
        <GraphicGuide />
      </Flex>

      <Flex my={6} justify={'space-between'} gap={{ base: 2, md: 4 }} w="full" wrap={'wrap'}>
        {[0, 1, 2, 3]?.map((id, index) => (
          <StakeCard
            status={status}
            stakeData={stakeData && stakeData[id]}
            key={index}
            poolId={id}
          />
        ))}
      </Flex>
      <LiquidLocksCards />
    </Flex>
  )
}

LiquidStaking.Meta = {
  title: `Concave | Liquid Staking`,
  description: `With Liquid Staking, positions receive boosted rewards based on term length. Investors in the longest-term positions will receive the highest returns.`,
}

export default withPageTransition(LiquidStaking)

const spinAnimation = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})
