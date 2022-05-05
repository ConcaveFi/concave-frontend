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
import { ethers } from 'ethers'

const periodToPoolParameter = {
  '360 days': 0,
  '180 days': 1,
  '90 days': 2,
  '45 days': 3,
}

function StakeCard(props) {
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
  const [pool, getPool] = useContractRead(
    {
      addressOrName: '0x2B7Ea66d564399246Da8e3D6265dB8F89af834C8',
      contractInterface: StakingV1Abi,
    },
    'pools',
    {
      args: [periodToPoolParameter[`${props.period}`]],
    },
  )

  const [stakingCap, getStakingCap] = useContractRead(
    {
      addressOrName: '0x2B7Ea66d564399246Da8e3D6265dB8F89af834C8',
      contractInterface: StakingV1Abi,
    },
    'viewStakingCap',
    {
      args: [periodToPoolParameter[`${props.period}`]],
    },
  )

  useEffect(() => {
    if (!pool.loading && !stakingCap.loading && pool.data && stakingCap.data) {
      setFetchingData(false)
      setCapPercentage(
        String(
          (Number(ethers.utils.formatEther(pool.data?.balance)) /
            Number(
              +ethers.utils.formatEther(pool.data?.balance) +
                +ethers.utils.formatEther(stakingCap.data),
            )) *
            100,
        ),
      )
    } else {
      setFetchingData(true)
    }
  }, [pool, stakingCap])

  useEffect(() => {
    setStakeWidth(isLargerThan600 ? '' : '200px')
  }, [isLargerThan600])

  return (
    <div>
      <Card width={stakeWidth} variant="primary" px={4} py={6} shadow="up" gap={1}>
        <Box mx="auto" py={5} w="full" h="333px" shadow="down" borderRadius="100px/90px">
          <Text color="text.low" fontSize="sm">
            Stake period
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
                {pool.data
                  ? `${Number(ethers.utils.formatEther(pool.data?.balance)).toFixed(1)}`
                  : 'Fetching...'}
              </Text>
            </Box>
            <Text position="absolute" right="2" top="2" fontSize="sm">
              {pool.data && stakingCap.data
                ? `${Number(
                    +ethers.utils.formatEther(pool.data?.balance) +
                      +ethers.utils.formatEther(stakingCap.data),
                  ).toFixed(1)}`
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
                stakedCNV={pool.data ? ethers.utils.formatEther(pool.data?.balance) : '0'}
                CNVCap={
                  pool.data && stakingCap.data
                    ? `${Number(
                        +ethers.utils.formatEther(pool.data?.balance) +
                          +ethers.utils.formatEther(stakingCap?.data),
                      ).toFixed(1)}`
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

export default StakeCard
