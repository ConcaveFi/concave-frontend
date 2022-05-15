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
import { ethers } from 'ethers'
import { useGet_Last_Poolid_VaprQuery } from 'graphql/generated/graphql'
import { StakingV1Contract } from 'lib/StakingV1Proxy/StakingV1Contract'
import { useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import Emissions from './StakeModal/Emissions'
import StakeInfo from './StakeModal/StakeInfo'
import StakeInput from './StakeModal/StakeInput'
const periodToPoolParameter = {
  '360 days': 0,
  '180 days': 1,
  '90 days': 2,
  '45 days': 3,
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

function StakeCard(props: StackCardProps) {
  const netWorkdId = 3
  const vaprText = props.icon === '12m' ? 'Non-Dilutive vAPR' : 'vAPR'
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isLargerThan600] = useMediaQuery('(min-width: 600px)')
  const { status, data, error, isFetching } = useGet_Last_Poolid_VaprQuery({
    poolID: props.poolId,
  })
  const [modalDirection, setModalDirection] = useState<'column' | 'row'>('row')
  const index = periodToPoolParameter[`${props.period}`]
  const { data: pools } = usePools(netWorkdId, index)
  const { data: stakingCap } = useViewStakingCap(netWorkdId, index)
  const capPercentage = useMemo(() => {
    if (!pools || !stakingCap) return '0'
    return ethers.utils.formatEther(pools?.balance.div(stakingCap).mul(100))
  }, [pools, stakingCap])
  console.log(capPercentage)
  return (
    <div>
      <Card variant="primary" px={4} py={6} shadow="up" gap={1}>
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
                {pools
                  ? `${Number(ethers.utils.formatEther(pools?.balance)).toFixed(0)}`
                  : 'Fetching...'}
              </Text>
            </Box>
            <Text position="absolute" right="2" top="2" fontSize="sm">
              {pools && stakingCap
                ? `${Number(
                    +ethers.utils.formatEther(pools?.balance) +
                      +ethers.utils.formatEther(stakingCap),
                  ).toFixed(0)}`
                : 'Fetching...'}
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
                  pools ? Number(ethers.utils.formatEther(pools?.balance)).toFixed(0) : '0'
                }
                CNVCap={
                  pools && stakingCap
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
