import { CloseButton, Flex, Heading, Image, Modal, Text } from '@concave/ui'
import { useAirdrop } from 'contexts/AirdropContext'
import { AirdropClaimCard } from '../AirdropClaimCard'

export function AirdropClaimDesktopModal() {
  const { isOpen, onClose } = useAirdrop()

  return (
    <AirdropModal onClose={onClose} isOpen={isOpen}>
      <AirdropClaimCard />
    </AirdropModal>
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
function AirdropModal(props) {
  return (
    <Modal
      bodyProps={{
        overflow: 'visible',
        borderGradient: '',
        variant: 'primary',
        justify: 'center',
        align: 'center',
        shadow: 'up',
        h: '390px',
        w: '540px',
        p: 0,
        gap: 6,
        pt: 4,
      }}
      motionPreset="slideInBottom"
      bluryOverlay
      isCentered
      hideClose
      title=""
      {...props}
    >
      <Image
        src="./assets/airdrop/airdrops.png"
        position={'absolute'}
        alt="airdrop rain"
        zIndex={10}
        mt="-92%"
      />
      <Heading mt={10} fontWeight={'bold'} fontSize="3xl">
        Claim your airdrops now!
      </Heading>
      <CloseButton
        onClick={props.onClose}
        color="text.low"
        pos="absolute"
        left="93.5%"
        size={'md'}
        top="1%"
      />
      {props.children}
    </Modal>
  )
}
