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
  VStack,
} from '@concave/ui'
import { useState } from 'react'
import UserListPositionCard from './UserListPositionCard'

interface NftPositionCardProps {
  unlisted?: boolean
  popup?: boolean
}

const UserPositionCard = (props: NftPositionCardProps) => {
  const [active, setActive] = useState(false)
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
        <NftPositionViewer active={false} />
        <RedeemCardViewer />
        <ListCardViewer popup={props.popup} unlisted={props.unlisted} />
      </Box>
    </Box>
  )
}
export default UserPositionCard

const RedeemCardViewer = () => {
  return (
    <Flex height={90} direction="row" gap={4} alignItems="center" justify="center" m={2}>
      <Flex grow={1} direction={'column'} textAlign={'start'} ml="2">
        <Text color="text.low" fontSize="sm">
          Current Value:
        </Text>
        <Text fontSize="md" fontWeight="bold">
          612.42 CNV
        </Text>
      </Flex>
      <Flex grow={1} direction={'column'} textAlign={'start'} ml="1">
        <Text color="text.low" fontSize="sm">
          Gained:
        </Text>
        <Text fontSize="md" fontWeight="bold">
          12.42 CNV
        </Text>
      </Flex>
      <Flex grow={1} direction={'column'} textAlign={'start'} ml="1">
        <Text color="text.low" fontSize="sm">
          Initial:
        </Text>
        <Text fontSize="md" fontWeight="bold">
          600 CNV
        </Text>
      </Flex>
      <Flex grow={1} direction={'column'} textAlign={'start'} ml="1">
        <Button
          mt={5}
          //   onClick={'s'}
          fontWeight="bold"
          fontSize="md"
          variant="primary"
          //   bgGradient="linear(90deg, #72639B 0%, #44B9DE 100%)"
          w="160px"
          h="40px"
          size="large"
          mx="auto"
        >
          Redeem
        </Button>
      </Flex>
    </Flex>
  )
}
interface ListCardViewerProps {
  unlisted?: boolean
  popup?: boolean
}

const ListCardViewer = (props: ListCardViewerProps) => {
  const { unlisted } = props
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box
      pos="relative"
      boxSizing="border-box"
      mx={2}
      height={'120px'}
      borderRadius="16px"
      mt={1}
      cursor="pointer"
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
            {unlisted ? '--------' : '600 CNV'}
          </Text>
        </Flex>
        <Flex flex={1} direction={'column'} textAlign={'start'} ml="2">
          <Text color="text.low" fontSize="sm">
            Discount:
          </Text>
          <Text fontSize="md" fontWeight="bold">
            {unlisted ? '--------' : '2.4%'}
          </Text>
        </Flex>
        <Flex flex={1} direction={'column'} textAlign={'start'} ml="2">
          <Text color="text.low" fontSize="sm">
            Expiration Date:
          </Text>
          <Text fontSize="md" fontWeight="bold">
            {unlisted ? '---.---.--' : '14.11.22'}
          </Text>
        </Flex>
        <Flex flex={1} direction={'column'} textAlign={'start'} ml="2">
          {!props.popup ? (
            <Button
              mt={5}
              onClick={() => {
                if (unlisted) onOpen()
              }}
              fontWeight="bold"
              fontSize="md"
              variant={unlisted ? 'primary' : 'primary.outline'}
              //   bgGradient="linear(90deg, #72639B 0%, #44B9DE 100%)"
              w="160px"
              h="40px"
              size="large"
              mx="auto"
            >
              {!!unlisted ? 'List for sale' : 'Unlist'}
            </Button>
          ) : (
            <Popover>
              {/*@ts-ignore */}
              <PopoverTrigger>
                <Button
                  mt={5}
                  // onClick={}
                  fontWeight="bold"
                  fontSize="md"
                  variant={unlisted ? 'primary' : 'primary.outline'}
                  //   bgGradient="linear(90deg, #72639B 0%, #44B9DE 100%)"
                  w="160px"
                  h="40px"
                  size="large"
                  mx="auto"
                >
                  {!!unlisted ? 'List for sale' : 'Unlist'}
                </Button>
              </PopoverTrigger>
              <Portal>
                <PopoverContent border={'none'}>
                  <UserListPositionCard />
                </PopoverContent>
              </Portal>
            </Popover>
          )}
        </Flex>
      </Flex>
    </Box>
  )
}
interface NftPositionViewerProps {
  active: boolean
  unlisted?: boolean
}

const NftPositionViewer = (props: NftPositionViewerProps) => {
  const { active, unlisted } = props
  return (
    <Box
      pos="relative"
      overflowY={'auto'}
      maxHeight={'100px'}
      borderRadius="16px"
      cursor="pointer"
      css={{
        background:
          'url(Rectangle 110 (00000).jpg), linear-gradient(265.73deg, #274C63 0%, #182F3E 100%)',
        boxShadow: !active
          ? `0px 5px 14px rgba(0, 0, 0, 0.47),
            4px -7px 15px rgba(174, 177, 255, 0.13),
            inset -1px 1px 2px rgba(128, 186, 255, 0.24)`
          : 'only-test',
      }}
    >
      <Flex direction="row" gap={4} alignItems="center" justify="center" m={2}>
        <Flex
          pos="relative"
          w="177px"
          h="68px"
          left={1}
          overflowY={'hidden'}
          borderRadius="16px"
          css={{
            background: 'rgba(113, 113, 113, 0.01)',
          }}
          __css={{
            boxShadow:
              'inset 0px -5px 10px rgba(134, 175, 255, 0.05), inset -9px 12px 24px rgba(13, 17, 23, 0.4)',
          }}
          px={2}
        >
          <HStack>
            <Flex w={'55%'} pl={2} direction="column">
              <Text fontSize="xs" color="text.low" fontWeight="medium">
                Stake Period
              </Text>
              <Text fontSize="s" color="white" fontWeight="bold">
                180 Days
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
            143 Days
          </Text>
        </Flex>
        <Flex flex={1} direction={'column'} textAlign={'start'} ml="2">
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
        </Flex>
      </Flex>
    </Box>
  )
}
