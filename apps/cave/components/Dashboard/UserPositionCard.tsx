import { Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Text,
  useDisclosure,
} from '@concave/ui'
import UserListPositionCard from './UserListPositionCard'

export type nftContract = {
  maturity: number
  poolID: number
  shares: { _hex: string; _isBigNumber: boolean }
  rewardDebt: { _hex: string; _isBigNumber: boolean }
}

interface NftPositionCardProps {
  contract: nftContract
}

const UserPositionCard = (props: NftPositionCardProps) => {
  const { contract } = props
  const { poolID, shares, rewardDebt, maturity } = contract

  const sharesDecimals = parseInt(shares._hex, 16) / 1000000000000000000
  const gained = parseInt(rewardDebt._hex, 16) / 1000000000000000000

  const dateToRedeem = epochConverter(maturity)
  const currentData = new Date()
  const redeemIn = dateToRedeem.getTime() - currentData.getTime()

  // console.log(d)

  return (
    <Box
      pos={'relative'}
      maxHeight="320px"
      borderRadius={'2xl'}
      width="690px"
      height={'320px'}
      shadow="up"
      maxWidth={'690px'}
      mx={4}
      my={8}
    >
      <Flex
        position={'absolute'}
        height="full"
        width={'full'}
        bg="linear-gradient(239.18deg, #19394C 27.18%, #0A161F 96.11%)"
        rounded={'2xl'}
        shadow="down"
        justifyContent={'end'}
      >
        <Flex width={'228px'} height={'320px'} rounded={'2xl'} textAlign="start">
          <Flex
            grow={1}
            direction="column"
            height={'320px'}
            alignItems="center"
            textAlign={'start'}
            ml={'70px'}
            fontSize={'15px'}
            fontWeight={'700'}
          >
            <Flex direction={'column'} width={'full'} justify="center" height={'90px'}>
              <Text width={'full'}>Your Staking</Text>
              <Text width={'full'}>Rewards</Text>
            </Flex>
            <Flex direction={'column'} width={'full'} justify="center" pt={6}>
              <Text w={'full'} color="text.low" fontSize="sm">
                Just Now:
              </Text>
              <Text w={'full'} color="#65a6f0" fontSize="md" fontWeight={'700'}>
                +0.0011 CNV
              </Text>
            </Flex>
            <Flex direction={'column'} width={'full'} justify="center" pt={6}>
              <Text w={'full'} color="text.low" fontSize="sm">
                6 hours ago:
              </Text>
              <Text w={'full'} color="#5788be" fontSize="md" fontWeight={'700'}>
                +0.0092 CNV
              </Text>
            </Flex>
            <Flex direction={'column'} width={'full'} justify="center" pt={6}>
              <Text w={'full'} color="text.low" fontSize="sm">
                24 hours ago:
              </Text>
              <Text w={'full'} color="#3d6a9e" fontSize="md" fontWeight={'700'}>
                +0.0042 CNV
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <Box
        pos={'relative'}
        height={'full'}
        rounded="2xl"
        maxWidth={'500'}
        background="linear-gradient(265.73deg, #274C63 0%, #182F3E 100%)"
      >
        <NftPositionViewer stakeType={poolID} redeemIn={redeemIn} />
        <RedeemCardViewer gained={gained} redeemIn={redeemIn} initial={sharesDecimals} />
        <ListCardViewer />
      </Box>
    </Box>
  )
}
export default UserPositionCard

interface RedeemCardViewerProps {
  initial: number
  gained: number
  redeemIn: number
}
const RedeemCardViewer = (props: RedeemCardViewerProps) => {
  const { initial, gained, redeemIn } = props

  return (
    <Flex height={90} direction="row" gap={4} alignItems="center" justify="center" m={2}>
      <Flex grow={1} direction={'column'} textAlign={'start'} ml="2">
        <Text color="text.low" fontSize="sm">
          Current Value:
        </Text>
        <Text fontSize="md" fontWeight="bold">
          {initial + gained} CNV
        </Text>
      </Flex>
      <Flex grow={1} direction={'column'} textAlign={'start'} ml="1">
        <Text color="text.low" fontSize="sm">
          Gained:
        </Text>
        <Text fontSize="md" fontWeight="bold">
          {gained.toFixed()} CNV
        </Text>
      </Flex>
      <Flex grow={1} direction={'column'} textAlign={'start'} ml="1">
        <Text color="text.low" fontSize="sm">
          Initial:
        </Text>
        <Text fontSize="md" fontWeight="bold">
          {initial} CNV
        </Text>
      </Flex>
      <Flex grow={1} direction={'column'} textAlign={'start'} ml="1">
        <Button
          mt={5}
          fontWeight="bold"
          fontSize="md"
          w="160px"
          h="40px"
          size="large"
          mx="auto"
          variant={redeemIn > 0 ? '' : 'primary'}
          shadow={redeemIn > 0 ? 'down' : 'up'}
        >
          <Text color={redeemIn > 0 ? 'text.low' : 'white'} fontSize="sm">
            {redeemIn > 0 ? 'Not redeemable' : 'Redeem'}
          </Text>
        </Button>
      </Flex>
    </Flex>
  )
}
interface ListCardViewerProps {}

const ListCardViewer = (props: ListCardViewerProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box
      pos="relative"
      boxSizing="border-box"
      mx={2}
      height={'120px'}
      borderRadius="16px"
      mt={1}
      css={{
        background: 'rgba(113, 113, 113, 0.01)',
        boxShadow:
          'inset 0px -5px 10px rgba(134, 175, 255, 0.05), inset -9px 12px 24px rgba(13, 17, 23, 0.4)',
      }}
    >
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg={'none'} backdropBlur="4px" />
        <ModalContent>
          <Flex>
            <UserListPositionCard />
          </Flex>
        </ModalContent>
      </Modal>

      <Flex justify="left">
        <Text pl="6" mt={2} pt="3" color="text.low" fontSize="lg" as="b">
          Your Marketplace Listing
        </Text>
      </Flex>
      <Flex direction="row" alignItems="center" justify="center">
        <Flex flex={1} direction={'column'} textAlign={'start'} ml="2">
          <Text color="text.low" fontSize="sm">
            List Price:
          </Text>
          <Text fontSize="md" fontWeight="bold">
            -------
          </Text>
        </Flex>
        <Flex flex={1} direction={'column'} textAlign={'start'} ml="2">
          <Text color="text.low" fontSize="sm">
            Discount:
          </Text>
          <Text fontSize="md" fontWeight="bold">
            ----
          </Text>
        </Flex>
        <Flex flex={1} direction={'column'} textAlign={'start'} ml="2">
          <Text color="text.low" fontSize="sm">
            Expiration Date:
          </Text>
          <Text fontSize="md" fontWeight="bold">
            --.--.--
          </Text>
        </Flex>
        {/* commit */}
                {/* commit */}
        <Flex flex={1} direction={'column'} textAlign={'start'} ml="2">
          <Button
            mt={5}
            onClick={onOpen}
            fontWeight="bold"
            fontSize="md"
            variant={'primary'}
            w="160px"
            h="40px"
            size="large"
            mx="auto"
          >
            List for sale
          </Button>
        </Flex>
      </Flex>
    </Box>
  )
}
interface NftPositionViewerProps {
  stakeType: number
  redeemIn: number
}

const NftPositionViewer = (props: NftPositionViewerProps) => {
  const { stakeType, redeemIn } = props
  const redeemInDays = (redeemIn / (1000 * 3600 * 24)).toFixed()
  const periodToPoolParameter = {
    0: '360 Days',
    1: '180 Days',
    2: '90 Days',
    3: '45 Days',
  }
  const period = periodToPoolParameter[stakeType]
  return (
    <Box
      pos="relative"
      overflowY={'auto'}
      maxHeight={'100px'}
      borderRadius="16px"
      cursor="pointer"
      boxShadow={'up'}
    >
      <Flex direction="row" gap={4} alignItems="center" justify="center" m={2}>
        <Flex
          pos="relative"
          w="177px"
          h="68px"
          left={1}
          overflowY={'hidden'}
          borderRadius="16px"
          boxShadow={'Down Medium'}
          px={2}
        >
          <HStack>
            <Flex w={'55%'} pl={2} direction="column">
              <Text fontSize="xs" color="text.low" fontWeight="medium">
                Stake Period
              </Text>
              <Text fontSize="s" color="white" fontWeight="bold">
                {period}
              </Text>
            </Flex>
            <Box w={'45%'}>
              <Image sizes="100%" src={'/assets/marketplace/6mposition.png'} alt="position" />
            </Box>
          </HStack>
        </Flex>

        <Flex flex={1} direction={'column'} textAlign={'start'} ml="2">
          <Text color="text.low" fontSize="sm">
            Redeem In:
          </Text>
          <Text fontSize="md" fontWeight="bold">
            {redeemInDays} Days
          </Text>
        </Flex>
        {/* <Flex flex={1} direction={'column'} textAlign={'start'} ml="2">
          <Text color="text.low" fontSize="sm">
            Price:
          </Text>
          <Text fontSize="md" fontWeight="bold">
            605 CNV
          </Text>
        </Flex>
        <Flex flex={1} direction={'column'} textAlign={'start'} ml="2">
          <Text color="text.low" fontSize="sm">
            Discount:
          </Text>
          <Text fontSize="md" fontWeight="bold">
            2.3%
          </Text>
        </Flex> */}
      </Flex>
    </Box>
  )
}

const epochConverter = (epoch: number) => {
  const timeInMillis = epoch * 1000
  const dateFromEpoch = new Date(timeInMillis)
  return dateFromEpoch
}
