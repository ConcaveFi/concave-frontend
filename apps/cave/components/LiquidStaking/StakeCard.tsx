import {
  Box,
  Button,
  Card,
  Flex,
  Image,
  Modal,
  Spinner,
  Stack,
  Text,
  useBreakpointValue,
  useDisclosure,
  VStack,
} from '@concave/ui'
import { ethers } from 'ethers'
import {
  useGet_All_Total_Pools_VaprQuery,
  useGet_Bonds_VaprQuery,
  useGet_Last_Poolid_VaprQuery,
} from 'graphql/generated/graphql'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { StakingV1Contract } from 'lib/StakingV1Proxy/StakingV1Contract'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useAccount } from 'wagmi'
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
  <VStack
    position={{ base: 'relative', xl: 'absolute' }}
    top="10"
    left={{ base: '', xl: '-80' }}
    spacing={{ base: 2, xl: 5 }}
  >
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
  const chainId = useCurrentSupportedNetworkId()
  const vaprText = props.icon === '12m' ? 'Non-Dilutive vAPR' : 'Total vAPR'
  const { isOpen, onOpen, onClose } = useDisclosure()
  const poolId = PERIOD_TO_POOL_PARAMETER[`${props.period}`]
  const { data: pools, error: poolsError, isLoading: isLoadingPools } = usePools(chainId, poolId)
  const { data: stakingCap, isLoading: isLoadingStakings } = useViewStakingCap(chainId, poolId)
  const [showFloatingCards, setShowFloatingCards] = useState(false)

  const currentlyStaked =
    isLoadingPools || !pools?.balance ? 0 : (+ethers.utils.formatEther(pools?.balance)).toFixed(0)

  const currentlyStakingCap =
    isLoadingStakings || !pools?.balance
      ? ''
      : (+ethers.utils.formatEther(pools.balance.add(stakingCap))).toFixed(0)

  const percent = (+currentlyStaked / +currentlyStakingCap) * 100

  const [{ data: account }] = useAccount()
  const userAddress = account?.address

  const {
    data: logStakingPoolRewards,
    isLoading: isLoadingVAPR,
    isSuccess: isSuccessVAPR,
  } = useGet_All_Total_Pools_VaprQuery()
  const bondVaprPool = `bondVaprPool${props.poolId}`

  const baseEmissions = logStakingPoolRewards?.rebaseStakingV1[0][bondVaprPool] * 100
  const bondEmissions =
    logStakingPoolRewards?.logStakingV1_PoolRewarded.find((o) => o.poolID === poolId).base_vAPR *
    100
  const totalVAPR = baseEmissions + bondEmissions

  const bondEmissionsFormatted = bondEmissions?.toFixed(2) + '%'
  const baseEmissionsFormatted = baseEmissions?.toFixed(2) + '%'
  const totalVAPRFormatted = totalVAPR?.toFixed(2) + '%'

  const mobileUI = useBreakpointValue({ base: true, xl: false })

  return (
    <div>
      <Card
        variant="primary"
        px={4}
        py={6}
        shadow="up"
        gap={1}
        textAlign={'center'}
        maxW={{ base: '160px', md: '200px' }}
      >
        <Box
          py={5}
          w="full"
          h={{ base: '290px', md: '333px' }}
          shadow="down"
          borderRadius="100px/90px"
        >
          <Text color="text.low" fontSize="sm">
            Stake Pool
          </Text>
          <Text fontSize="lg" fontWeight="bold">
            {props.period}
          </Text>
          <Image
            userSelect={'none'}
            src={`/assets/liquidstaking/${props.icon}-logo.svg`}
            alt="stake period logo"
          />
          <Text color="text.low" fontSize="sm">
            {vaprText}
          </Text>
          <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight="bold">
            {isLoadingVAPR ? 'Calculating...' : totalVAPRFormatted}
          </Text>
        </Box>

        <Stack>
          <Stack color="text.low" fontSize={12} isInline justify="space-between" mt={3}>
            <Text>Currently Staked</Text>
            <Text>Staking Cap</Text>
          </Stack>

          <Box
            height={'30px'}
            width={{ base: '130px', md: '170px' }}
            shadow="down"
            borderRadius="2xl"
            position="relative"
          >
            <Box
              position={'absolute'}
              width="100%"
              height={'78%'}
              rounded={'2xl'}
              my={'4px'}
              ml="5px"
              zIndex={-1}
            >
              <Flex
                transition={'all 1.3s'}
                height={'full'}
                maxW={!percent ? 'full' : `${percent}%`}
                overflow={'hidden'}
                position="relative"
              >
                <Box
                  position={'absolute'}
                  bg={'secondary.50'}
                  width={{ base: '120px', md: '160px' }}
                  height={'full'}
                  rounded="2xl"
                />
              </Flex>
            </Box>
            <Flex height="full" mx="3" justify={'space-between'} align="center" fontSize="14px">
              {isLoadingPools || isLoadingStakings ? (
                <Flex justify={'center'} width="full" align={'center'} gap={2} color="text.low">
                  <Text fontWeight={700}>Fetching</Text>
                  <Spinner transition={'all 2s'} size="sm" />
                </Flex>
              ) : (
                <>
                  <Text>{currentlyStaked}</Text>
                  <Text>{currentlyStakingCap}</Text>
                </>
              )}
            </Flex>
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
          disabled={!userAddress}
        >
          Stake
        </Button>

        <Modal
          bluryOverlay={true}
          childrenLeftNeighbor={<FloatingDescriptions />}
          showchildrenLeftNeighbor={showFloatingCards && !mobileUI}
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
          <Flex
            direction={{ base: 'column', md: 'row' }}
            maxW={{ base: '310px', sm: '340px', md: 'full' }}
          >
            <Emissions
              period={props.period}
              vaprText={vaprText}
              totalVAPR={isLoadingVAPR ? 'Calculating...' : totalVAPRFormatted}
              icon={props.icon}
              baseVAPR={isLoadingVAPR ? 'Calculating...' : baseEmissionsFormatted}
              vapr={isLoadingVAPR ? 'Calculating...' : bondEmissionsFormatted}
              setShowFloatingCards={setShowFloatingCards}
            />
            <Modal
              preserveScrollBarGap
              isOpen={showFloatingCards && mobileUI}
              title=""
              onClose={() => setShowFloatingCards(false)}
              motionPreset="slideInBottom"
              hideClose
              isCentered
              bluryOverlay
            >
              <Flex maxHeight={'800px'} mt="-10" mb={10}>
                <FloatingDescriptions />
              </Flex>
            </Modal>
            <VStack mt={{ base: 0, sm: 8 }} spacing={8}>
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
                capPercentage={
                  pools?.balance &&
                  stakingCap &&
                  (+ethers.utils.formatEther(pools?.balance) /
                    (+ethers.utils.formatEther(stakingCap) +
                      +ethers.utils.formatEther(pools?.balance))) *
                    100
                }
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

//  <Box
//     shadow="up"
//     px={1}
//     py={1}
//     borderRadius="2xl"
//     textAlign="left"
//     bg="secondary.50"
//     w={`${capPercentage}%`}
//     fontSize="sm"
//   >
//     <Text w="150px">
//       {isLoadingPools || !pools?.balance
//         ? 'Fetching...'
//         : (+ethers.utils.formatEther(pools?.balance)).toFixed(0)}
//     </Text>
//     <Text position="absolute" right="2" top="2" fontSize="sm">
//       {isLoadingPools || isLoadingStakings || !pools?.balance
//         ? 'Fetching...'
//         : (+ethers.utils.formatEther(pools.balance.add(stakingCap))).toFixed(0)}
//     </Text>
//   </Box>
