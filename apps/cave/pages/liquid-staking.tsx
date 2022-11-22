import { Flex, Heading, keyframes, Text } from '@concave/ui'
import { GraphicGuide } from 'components/LiquidStaking/GraphicGuide'
import { useLiquidStakeData } from 'components/LiquidStaking/hooks/useLiquidStakeData'
import { LiquidLocksCards } from 'components/LiquidStaking/LiquidLocksCards'
import { StakeCard } from 'components/LiquidStaking/StakeCard'
import { withPageTransition } from 'components/PageTransition'
function LiquidStaking() {
  const { stakeData, status } = useLiquidStakeData()
  return (
    <Flex w="full" direction={'column'} justify={'center'} align="center" mx={'auto'} p="0px">
      <Heading
        fontSize={{ base: '4xl', sm: '5xl' }}
        apply={'background.text-brightBlue'}
        mt={{ base: 12, md: 8 }}
        fontWeight={'semibold'}
        as="h1"
      >
        Liquid Staking
      </Heading>
      <Flex
        direction={{ xl: 'row', base: 'column' }}
        gap={{ xl: 24, base: 2 }}
        mt={{ xl: 8, base: 0 }}
        textColor="white"
        align={'center'}
        justify="center"
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

      <Flex
        maxW={['380px', '450px', '500px', '500px', 'none', '1100px']}
        justify={['center', 'space-between']}
        gap={[2, 2, 4, 0]}
        wrap={'wrap'}
        w="full"
        my={6}
      >
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
