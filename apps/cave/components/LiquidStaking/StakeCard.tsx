import { Box, Card, Image, Text } from '@concave/ui'
import { ButtonLink } from 'components/ButtonLink'

function StakeCard(props) {
  return (
    <div>
      <Card variant="primary.outline" w="" px={4} py={6} shadow="up" gap={1}>
        <Box mx="auto" py={5} w="full" h="333px" shadow="down" borderRadius="100px/90px">
          <Text color="text.low" fontSize="sm">
            Stake period
          </Text>
          <Text fontSize="lg" fontWeight="bold">
            {props.period}
          </Text>
          <Image src={`/assets/liquidstaking/${props.icon}-logo.svg`} alt="stake period logo" />
          <Text color="text.low" fontSize="sm">
            vAPR:
          </Text>
          <Text fontSize="lg" fontWeight="bold">
            {props.vapr} %
          </Text>
        </Box>

        {/* <Stack color="text.low" fontSize={11} isInline justify="space-between">
          <Text>Currently Staked</Text>
          <Text>Staking Cap</Text>
        </Stack> */}

        <Text color="text.low" fontSize={11} textAlign="center" mt={3}>
          Currently Staked
        </Text>
        <Text shadow="down" py={1} borderRadius="2xl">
          {props.stakedCNV} CNV
        </Text>

        <ButtonLink
          mt={5}
          href={`/${props.stakingLink}`}
          fontWeight="medium"
          variant="primary.outline"
          bgGradient="linear(90deg, #72639B 0%, #44B9DE 100%)"
          w="92.5%"
          h="40px"
          size="large"
          mx="auto"
        >
          Stake CNV
        </ButtonLink>
      </Card>
    </div>
  )
}

export default StakeCard
