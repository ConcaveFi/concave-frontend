import {
  Box,
  Button,
  Card,
  HStack,
  Image,
  Modal,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from '@concave/ui'
import { CNVMintAbi, StakingV1Abi } from 'contracts/LiquidStaking/LiquidStakingAbi'
import { useEffect, useState } from 'react'
import { useContractRead } from 'wagmi'
import Emissions from './StakeModal/Emissions'
import StakeButtons from './StakeModal/StakeButtons'
import StakeInfo from './StakeModal/StakeInfo'
import StakeInput from './StakeModal/StakeInput'

const periodToPoolParameter = {
  '360 days': 0,
  '180 days': 1,
  '90 days': 2,
  '45 days': 3,
}

function StakeCard(props) {
  const vaprText = props.icon === '12m' ? 'Non-Dilutive vAPR' : 'vAPR'
  const [capPercentage, setCapPercentage] = useState(
    String((+props.stakedCNV / +props.CNVCap) * 100),
  )
  const { isOpen, onOpen, onClose } = useDisclosure()
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
  // console.log(read())

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

  console.log(stakingCap.data)

  return (
    <div>
      <Card variant="primary" px={4} py={6} shadow="up" gap={1}>
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
              <Text w="150px">{props.stakedCNV} CNV</Text>
            </Box>
            <Text position="absolute" right="2" top="2" fontSize="sm">
              {props.CNVCap} CNV
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
          <HStack>
            <Emissions
              period={props.period}
              vaprText={vaprText}
              icon={props.icon}
              vapr={props.vapr}
            />
            <VStack spacing={8}>
              <StakeInfo
                period={props.period}
                stakedCNV={props.stakedCNV}
                CNVCap={props.CNVCap}
                capPercentage={capPercentage}
              />
              <StakeInput />
              {/* <StakeButtons period={props.period} vaprText={vaprText} vapr={props.vapr} /> */}
            </VStack>
          </HStack>
        </Modal>
      </Card>
    </div>
  )
}

export default StakeCard
