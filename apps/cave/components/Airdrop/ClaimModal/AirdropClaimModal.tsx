import { AirdropIcon, CloseIcon } from '@concave/icons'
import { Box, Button, Card, Flex, Heading, Image, Modal, Text } from '@concave/ui'

interface AirdropClaimModalProps {
  onClose?: VoidFunction
  isOpen?: boolean
}

export function AirdropClaimModal(props: AirdropClaimModalProps) {
  const { onClose, isOpen } = props
  return (
    <Modal
      bodyProps={{ p: 0, variant: 'secondary' }}
      motionPreset="slideInBottom"
      onClose={onClose}
      isOpen={isOpen}
      bluryOverlay
      isCentered
      hideClose
      title=""
    >
      <Flex w="350px" direction={'column'}>
        <ModalHeader onClose={onClose} />
        <Flex py="7" position={'relative'} justify="space-between" px="5">
          <ItemInfo info="234.00 USDC" title="Total amount" />
          <Box h="48px" w="2px" bg="gray.600" />
          <ItemInfo info="120.29 USDC" title="Redeemable" />
        </Flex>
        <ProgressBar />
        <Flex px="4" gap="4" py="7">
          <Button
            w="full"
            h="45px"
            bg="linear-gradient(-90deg, #f56666 0%, #de7c7c 0%, #8d3030 100%)"
          >
            Decline
          </Button>
          <Button w="full" h="45px" bg="stroke.brightGreen">
            Confirm
          </Button>
        </Flex>
      </Flex>
    </Modal>
  )
}

function ProgressBar() {
  return (
    <Flex w="90%" mx="auto" rounded={'xl'} h="22px" shadow={'down'} position="relative">
      <Box w="50%" h="full" bg="stroke.accent" rounded={'inherit'} />
      <Flex position={'absolute'} w="full" justify={'center'}>
        <Text fontWeight="semibold">65%</Text>
      </Flex>
    </Flex>
  )
}

interface ItemInfoProps {
  title: string
  info: string
}
function ItemInfo(props: ItemInfoProps) {
  const { info, title } = props
  return (
    <Flex direction={'column'} align="center">
      <Text textColor={'text.low'} fontWeight="500">
        {title}
      </Text>
      <Flex align={'center'} fontWeight="semibold" gap={1}>
        <Text>{info}</Text>
        <Image src="/assets/tokens/usdc-logo.webp" boxSize={'22px'} alt="usdc token icon" />
      </Flex>
    </Flex>
  )
}

interface ModalHeaderProps {
  onClose?: VoidFunction
}

function ModalHeader(props: ModalHeaderProps) {
  const { onClose } = props
  return (
    <Card
      shadow="0px 0px 30px #000"
      justify={'center'}
      direction={'row'}
      variant="primary"
      align="center"
      h="100px"
      w="full"
      gap={2}
    >
      <AirdropIcon fill={'text.bright'} h="60px" w="60px" filter={'blur(0px)'} />
      <Flex direction={'column'}>
        <Heading color="text.bright" fontWeight={'semibold'} fontSize="3xl">
          Airdrop
        </Heading>
        <Text color="text.low" fontWeight={'500'}>
          Rewards
        </Text>
      </Flex>
      <Button
        onClick={onClose}
        pos="absolute"
        left="90%"
        top="7%"
        p="10px"
        _hover={{ bg: '#0005' }}
        rounded={'full'}
      >
        <CloseIcon color={'text.low'} boxSize="10px"></CloseIcon>
      </Button>
    </Card>
  )
}
