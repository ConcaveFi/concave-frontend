import {
  Box,
  Button,
  Card,
  Flex,
  Image,
  Modal,
  Stack,
  Text,
  useDisclosure,
  useMediaQuery,
  VStack,
} from '@concave/ui'
import { BigNumber, ethers } from 'ethers'
import { useGet_Last_Poolid_VaprQuery } from 'graphql/generated/graphql'
import { StakingV1Contract } from 'lib/StakingV1Proxy/StakingV1Contract'
import { useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import Emissions from './StakeModal/Emissions'
import StakeInfo from './StakeModal/StakeInfo'
import StakeInput from './StakeModal/StakeInput'
export const PERIOD_TO_POOL_PARAMETER = {
  '360 days': 0,
  '180 days': 1,
  '90 days': 2,
  '45 days': 3,
}
export const PARAMETER_TO_POOL_PERIOD = {
  0: '360 days',
  1: '180 days',
  2: '90 days',
  3: '45 days',
}

type StackCardProps = {
  icon: string
  period: string
  poolId: number
  stakingLink: string
}

export const usePools = (chainID: number | string, index: string) => {
  return useQuery(
    ['fetchPools', chainID, index],
    () => {
      const stakingV1Contract = new StakingV1Contract(+chainID)
      return stakingV1Contract.pools(index)
    },
    {
      enabled: !!chainID && Number.isInteger(index),
    },
  )
}
export const useViewStakingCap = (chainID: number | string, index: string) => {
  return useQuery(
    ['useViewStakingCap', chainID, index],
    () => {
      const stakingV1Contract = new StakingV1Contract(+chainID)
      return stakingV1Contract.viewStakingCap(index)
    },
    {
      enabled: !!chainID && Number.isInteger(index),
    },
  )
}

const FloatingDescriptions: React.FC = () => (
  <VStack position="absolute" top="10" left="-80" spacing={5}>
    <Card variant="secondary" py="6" px="4" w={300}>
      <Text fontWeight="bold">Total vAPR</Text>
      <Text fontSize="sm">
        Total vAPR aggregates rewards associated with each staking position including rewards from
        bonding activity, base emissions and the quarterly dividend.
      </Text>
    </Card>
    <Card variant="secondary" py="6" px="4" w={300}>
      <Text fontWeight="bold">Bonding Emissions</Text>
      <Text fontSize="sm">
        Anti-Dilutive bond emissions ensure staking positions are rewarded with a share of any new
        supply minted from bonds that are purchased. Staking positions recieve a share of this
        growth compounded at 8hr intervals.
      </Text>
    </Card>
    <Card variant="secondary" py="6" px="4" w={300}>
      <Text fontWeight="bold">Base Emissions</Text>
      <Text fontSize="sm">
        Base emissions ensure that staking positions receive continuous CNV rewards throughout the
        term. Staking positions receive a boost in base emissions as a function of term length.
      </Text>
    </Card>
    <Card variant="secondary" py="6" px="4" w={300}>
      <Text fontWeight="bold">Quarterly Dividend</Text>
      <Text fontSize="sm">
        Quarterly dividends ensure that stakers receive a share of profits in non CNV assets from
        all yield bearing products and services. Staking positions receive a boost in dividend as a
        function of term length.
      </Text>
    </Card>
  </VStack>
)

function StakeCard(props: StackCardProps) {
  const netWorkdId = 3
  const vaprText = props.icon === '12m' ? 'Non-Dilutive vAPR' : 'vAPR'
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isLargerThan600] = useMediaQuery('(min-width: 600px)')
  const { status, data, error, isFetching } = useGet_Last_Poolid_VaprQuery({
    poolID: props.poolId,
  })
  const [modalDirection, setModalDirection] = useState<'column' | 'row'>('row')
  const index = PERIOD_TO_POOL_PARAMETER[`${props.period}`]
  const { data: pools, error: poolsError, isLoading: isLoadingPools } = usePools(netWorkdId, index)
  const { data: stakingCap, isLoading: isLoadingStakings } = useViewStakingCap(netWorkdId, index)
  const capPercentage = useMemo(() => {
    if (!pools?.balance || !stakingCap) return '0'
    return BigNumber.from(pools.balance).div(stakingCap).mul(100)
  }, [pools, stakingCap])

  return (
    <div>
      <Card variant="primary" px={4} py={6} shadow="up" gap={1} textAlign={'center'}>
        <Box mx="auto" py={5} w="full" h="333px" shadow="down" borderRadius="100px/90px">
          <Text color="text.low" fontSize="sm">
            Stake Period
          </Text>
          <Text fontSize="lg" fontWeight="bold">
            {props.period}
          </Text>
          <Image src={`/assets/liquidstaking/${props.icon}-logo.svg`} alt="stake period logo" />
          <Text color="text.low" fontSize="sm">
            {vaprText}
          </Text>
          <Text fontSize="lg" fontWeight="bold">
            Calculating
          </Text>
        </Box>

        <Stack>
          <Stack color="text.low" fontSize={12} isInline justify="space-between" mt={3}>
            <Text>Currently Staked</Text>
            <Text>Staking Cap</Text>
          </Stack>
          <Box shadow="down" borderRadius="2xl" p={1} position="relative">
            <Box
              shadow="up"
              px={1}
              py={1}
              borderRadius="2xl"
              textAlign="left"
              bg="secondary.50"
              w={`${capPercentage}%`}
              fontSize="sm"
            >
              <Text w="150px">
                {isLoadingPools || !pools?.balance
                  ? 'Fetching...'
                  : (+ethers.utils.formatEther(pools?.balance)).toFixed(0)}
              </Text>
            </Box>
            <Text position="absolute" right="2" top="2" fontSize="sm">
              {isLoadingPools || isLoadingStakings || !pools?.balance
                ? 'Fetching...'
                : (+ethers.utils.formatEther(pools.balance.add(stakingCap))).toFixed(0)}
            </Text>
          </Box>
        </Stack>

        <Button
          mt={5}
          onClick={onOpen}
          fontWeight="bold"
          fontSize="md"
          variant="primary"
          bgGradient="linear(90deg, #72639B 0%, #44B9DE 100%)"
          w="92.5%"
          h="40px"
          size="large"
          mx="auto"
          disabled={false}
        >
          Stake CNV
        </Button>

        <Modal
          bluryOverlay={true}
          childrenLeftNeighbor={<FloatingDescriptions />}
          showchildrenLeftNeighbor={true}
          title="Stake CNV"
          isOpen={isOpen}
          onClose={onClose}
          bodyProps={{
            roundedLeft: '100px',
            roundedRight: '20px',
            shadow: 'Up for Blocks',
          }}
          titleAlign="center"
          size="2xl"
        >
          <Flex direction={modalDirection}>
            <Emissions
              period={props.period}
              vaprText={vaprText}
              icon={props.icon}
              vapr={data?.logStakingV1_PoolRewarded[0].base_vAPR}
              // vapr={props.vAPR}
            />
            <VStack mt={8} spacing={8}>
              <StakeInfo
                period={props.period}
                stakedCNV={
                  pools?.balance ? Number(ethers.utils.formatEther(pools?.balance)).toFixed(0) : '0'
                }
                CNVCap={
                  pools?.balance && stakingCap
                    ? `${Number(
                        +ethers.utils.formatEther(pools?.balance) +
                          +ethers.utils.formatEther(stakingCap),
                      ).toFixed(0)}`
                    : '0'
                }
                capPercentage={capPercentage}
              />
              <StakeInput period={props.period} poolId={props.poolId} onClose={onClose} />
            </VStack>
          </Flex>
        </Modal>
      </Card>
    </div>
  )
}

export default StakeCard
