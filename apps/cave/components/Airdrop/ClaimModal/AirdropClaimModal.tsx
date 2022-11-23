import { AirdropIcon, CloseIcon } from '@concave/icons'
import { Box, Button, Card, CloseButton, Flex, Heading, Image, Modal, Text } from '@concave/ui'
import { useAirdrop } from 'contexts/AirdropContext'

export function AirdropClaimModal() {
  const { isOpen, onClose } = useAirdrop()
  return (
    <Modal
      bodyProps={{
        overflow: 'visible',
        borderGradient: '',
        variant: 'primary',
        justify: 'center',
        align: 'center',
        shadow: 'up',
        h: '350px',
        w: '540px',
        p: 0,
      }}
      motionPreset="slideInBottom"
      onClose={onClose}
      isOpen={isOpen}
      bluryOverlay
      isCentered
      hideClose
      title=""
    >
      {/* <ModalHeader onClose={onClose} /> */}
      <Image
        src="./assets/airdrops_background.png"
        position={'absolute'}
        alt="airdrop rain"
        zIndex={10}
        mt="-92%"
      />
      <Heading mt={10} fontWeight={'bold'} fontSize="3xl">
        Claim your airdrop now!
      </Heading>
      <Text textAlign={'center'} px={24} mt={2} color="text.bright">
        lorem ipsum dolor sit amet sed lectus. lorem ipsum dolor sit amet sed lectus.{' '}
      </Text>
      <Flex py="4" position={'relative'} w="full" justify="center" gap={10} px="20">
        <ItemInfo info="234.00 USDC" title="Total amount" />
        <Box h="48px" w="2px" bg="gray.600" />
        <ItemInfo info="120.29 USDC" title="Redeemable" />
      </Flex>
      <ProgressBar />
      <Button mt={7} w="fit-content" px="7" h="45px" bg="stroke.brightGreen">
        Claim
      </Button>
      <CloseButton
        onClick={onClose}
        pos="absolute"
        left="93.5%"
        color="text.low"
        top="1%"
        size={'md'}
      ></CloseButton>
    </Modal>
  )
}

function ProgressBar() {
  return (
    <Flex p="5px" w="60%" mx="auto" rounded={'xl'} h="22px" shadow={'down'} position="relative">
      <Box w="50%" h="full" bg="stroke.accent" shadow={'up'} rounded={'inherit'} />
      <Flex m="-5px" position={'absolute'} w="full" justify={'center'}>
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
