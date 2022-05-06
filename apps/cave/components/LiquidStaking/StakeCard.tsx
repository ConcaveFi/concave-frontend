import {
  Box,
  Button,
  Card,
  Flex,
  HStack,
  Image,
  Modal,
  Stack,
  Text,
  useDisclosure,
  useMediaQuery,
  VStack,
} from '@concave/ui'
import { StakingV1Abi } from 'contracts/LiquidStaking/LiquidStakingAbi'
import { useEffect, useState } from 'react'
import { useContractRead } from 'wagmi'
import Emissions from './StakeModal/Emissions'
import StakeInfo from './StakeModal/StakeInfo'
import StakeInput from './StakeModal/StakeInput'
import { Contract, ethers } from 'ethers'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { LIQUID_STAKING_ADDRESS } from 'contracts/LiquidStaking/LiquidStakingAddress'
const providers = new ethers.providers.InfuraProvider('ropsten', '545e522b4c0e45078a25b86f3b646a9b')

const periodToPoolParameter = {
  '360 days': 0,
  '180 days': 1,
  '90 days': 2,
  '45 days': 3,
}

function StakeCard(props) {
  const netWorkdId = 3
  const vaprText = props.icon === '12m' ? 'Non-Dilutive vAPR' : 'vAPR'
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [fetchingData, setFetchingData] = useState(true)
  const [capPercentage, setCapPercentage] = useState('100')
  const [isLargerThan600] = useMediaQuery('(min-width: 600px)')
  const [isLargerThan700] = useMediaQuery('(min-width: 700px)')

  const [modalDirection, setModalDirection] = useState<'column' | 'row'>('row')

  useEffect(() => {
    setModalDirection(isLargerThan700 ? 'row' : 'column')
  }, [isLargerThan700])
  const [stakeWidth, setStakeWidth] = useState<'' | '200px'>('')

  const [pools, setPools] = useState(null)
  const [stakingCap, setStakingCap] = useState(null)

  useEffect(() => {
    if (pools === null)
      getPools(netWorkdId, periodToPoolParameter[`${props.period}`])
        .then(setPools)
        .catch((error) => {})
    if (stakingCap === null)
      getViewStakingCap(netWorkdId, periodToPoolParameter[`${props.period}`])
        .then(setStakingCap)
        .catch((error) => {})
  })

  const isPoolsLoading = pools === null
  const isStakingLoading = stakingCap === null

  useEffect(() => {
    if (!isPoolsLoading && !isStakingLoading && pools && stakingCap) {
      setFetchingData(false)
      setCapPercentage(
        String(
          (Number(ethers.utils.formatEther(pools?.balance)) /
            Number(
              +ethers.utils.formatEther(pools?.balance) + +ethers.utils.formatEther(stakingCap),
            )) *
            100,
        ),
      )
    } else {
      setFetchingData(true)
    }
  })

  useEffect(() => {
    setStakeWidth(isLargerThan600 ? '' : '200px')
  }, [isLargerThan600])
  return (
    <div>
      <Card width={stakeWidth} variant="primary" px={4} py={6} shadow="up" gap={1}>
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
            {/* {props.vapr} % */}
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
          variant="primary.outline"
          bgGradient="linear(90deg, #72639B 0%, #44B9DE 100%)"
          w="92.5%"
          h="40px"
          size="large"
          mx="auto"
          disabled={fetchingData}
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
              vapr={props.vapr}
            />
            <VStack spacing={8}>
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
              <StakeInput period={props.period} />
            </VStack>
          </Flex>
        </Modal>
      </Card>
    </div>
  )
}

async function getPools(netWorkdId: number, index: string) {
  const stakingContract = new Contract(LIQUID_STAKING_ADDRESS[netWorkdId], StakingV1Abi, providers)
  const pools = await stakingContract.pools(index).catch((error) => {})
  return pools
}

async function getViewStakingCap(netWorkdId: number, index: string) {
  const stakingContract = new Contract(LIQUID_STAKING_ADDRESS[netWorkdId], StakingV1Abi, providers)
  const stakingCap = await stakingContract.viewStakingCap(1).catch((error) => {})

  return stakingCap
}
export default StakeCard
