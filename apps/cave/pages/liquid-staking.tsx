import { SpinIcon } from '@concave/icons'
import { Card, Flex, Heading, keyframes, Text } from '@concave/ui'
import { GraphicGuide } from 'components/LiquidStaking/GraphicGuide'
import { useLiquidStakeData } from 'components/LiquidStaking/hooks/useLiquidStakeData'
import { LiquidLocksCards } from 'components/LiquidStaking/LiquidLocksCards'
import { StakeCard } from 'components/LiquidStaking/StakeCard'
import { withPageTransition } from 'components/PageTransition'
function LiquidStaking() {
  const { stakeData, status } = useLiquidStakeData()
  return (
    <Flex
      width={{ base: '340px', md: '420px', xl: '900px' }}
      justify={'start'}
      align="center"
      mx={'auto'}
      direction={'column'}
      p="0px"
    >
      <Heading as="h1" mt={{ base: 12, md: 8 }} fontSize={{ base: '4xl', sm: '5xl' }}>
        Liquid staking
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
      {
        {
          loading: <LoadingState />,
          success: (
            <Flex my={6} justify={'space-between'} gap={{ base: 2, md: 4 }} w="full" wrap={'wrap'}>
              {stakeData?.map((stake, index) => (
                <StakeCard key={index} stakeData={stake} />
              ))}
            </Flex>
          ),
          error: <ErrorState />,
        }[status]
      }
      <LiquidLocksCards />
    </Flex>
  )
}

LiquidStaking.Meta = {
  title: `Concave | Liquid Staking`,
  description: `With Liquid Staking, positions receive boosted rewards based on term length. Investors in the longest-term positions will receive the highest returns.`,
}

export default withPageTransition(LiquidStaking)

const ErrorState = () => (
  <Card my={6} width={'full'} height="283px" align={'center'} justify="center" variant="secondary">
    <Text fontSize={'5xl'} color="text.low" fontWeight="bold" mx="auto">
      Error fetching data
    </Text>
  </Card>
)
const LoadingState = () => (
  <Card my={6} width={'full'} height="483px" align={'center'} justify="center" variant="secondary">
    <Text fontSize={'5xl'} color="text.low" fontWeight="bold" mx="auto">
      Loading
    </Text>
    <SpinIcon animation={`2s linear infinite ${spinAnimation}`} boxSize={'60px'} />
  </Card>
)
const spinAnimation = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})
