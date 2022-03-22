import {
  Box,
  Button,
  Card,
  Image,
  Modal,
  ModalHeader,
  Stack,
  Text,
  useDisclosure,
} from '@concave/ui'
import { ButtonLink } from 'components/ButtonLink'
import { useState } from 'react'
import Emissions from './StakeModal/Emissions'

function StakeCard(props) {
  const vaprText = props.icon === '12m' ? 'Non-Dilutive vAPR' : 'vAPR'
  const [capPercentage, setCapPercentage] = useState('70')
  const { isOpen, onOpen, onClose } = useDisclosure()

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
            {props.vapr} %
          </Text>
        </Box>

        {props.icon === '12m' ? (
          <Stack>
            <Stack color="text.low" fontSize={12} isInline justify="space-between" mt={3}>
              <Text>Currently Staked</Text>
              <Text>Staking Cap</Text>
            </Stack>
            <Box shadow="down" borderRadius="2xl" p={1} position="relative">
              <Text
                shadow="up"
                px={1}
                py={1}
                borderRadius="2xl"
                textAlign="left"
                bg="secondary.50"
                w={`${capPercentage}%`}
                fontSize="sm"
              >
                {props.stakedCNV} CNV
              </Text>
              <Text position="absolute" right="2" top="2" fontSize="sm">
                90,000 CNV
              </Text>
            </Box>
          </Stack>
        ) : (
          <Stack>
            <Text color="text.low" fontSize={12} textAlign="center" mt={3}>
              Currently Staked
            </Text>
            <Text shadow="down" py={1} borderRadius="2xl">
              {props.stakedCNV} CNV
            </Text>
          </Stack>
        )}

        <Button
          mt={5}
          // href={`/${props.stakingLink}`}
          onClick={onOpen}
          fontWeight="medium"
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
          // sx={{
          //   alignItems: 'center',
          //   gap: 1,
          //   shadow: 'Up for Blocks',
          // }}
          size="2xl"
          isCentered
        >
          <Emissions
            period={props.period}
            vaprText={vaprText}
            icon={props.icon}
            vapr={props.vapr}
          />
          {/* <Box p={2}>
            <Box
              mx="auto"
              pt={5}
              pb={3}
              w="30%"
              h="full"
              shadow="down"
              borderRadius="full"
              textAlign="center"
              ml={-1}
            >
              <Text color="text.low" fontSize="sm">
                Stake period
              </Text>
              <Text fontSize="lg" fontWeight="bold">
                {props.period}
              </Text>
              <Image
                mx="auto"
                src={`/assets/liquidstaking/${props.icon}-logo.svg`}
                alt="stake period logo"
              />
              <Text color="text.low" fontSize="sm">
                {vaprText}
              </Text>
              <Text fontSize="lg" fontWeight="bold">
                {props.vapr} %
              </Text>
              <Image
                mx="auto"
                src={`/assets/liquidstaking/modal-arrow-logo.svg`}
                alt="arrow down logo"
              />
              <Box
                shadow="down"
                borderTopRadius="xl"
                borderBottomRadius="full"
                w="90%"
                h="150px"
                mx="auto"
                filter="drop-shadow(0px 0px 27px #81b3ff4f)"
              ></Box>
            </Box>
          </Box> */}
        </Modal>
      </Card>
    </div>
  )
}

export default StakeCard
