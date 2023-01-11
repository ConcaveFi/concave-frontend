import { CloseButton, Flex, Heading, Image, Link, Modal, Text } from '@concave/ui'
import { useAirdrop } from 'contexts/AirdropContext'
import { AirdropClaimButton } from '../AirdropClaimButton'

export function AirdropClaimModal() {
  const { isOpen, onClose, redeemable } = useAirdrop()
  return (
    <AirdropModal onClose={onClose} isOpen={isOpen}>
      <Image
        src="./assets/airdrop/airdrops.png"
        position={'absolute'}
        alt="airdrop rain"
        zIndex={10}
        mt="-92%"
      />
      <Heading mt={10} fontWeight={'bold'} fontSize="3xl">
        Claim your airdrop now!
      </Heading>
      <Text pb="6" textAlign={'center'} px={24} mt={2} color="text.low">
        Happy One Year Concaversary! <br />{' '}
        <Link color={'text.bright'} href="https://spoon.fyi/proofOfGemInfo" isExternal>
          Click here
        </Link>{' '}
        to find out more about this airdrop!
      </Text>
      <ItemInfo info={`${redeemable || 0} USDC`} title="Redeemable amount" />
      <Flex gap={5}>
        <AirdropClaimButton />
        <AirdropClaimButton edition="second" />
      </Flex>
      <CloseButton
        onClick={onClose}
        color="text.low"
        pos="absolute"
        left="93.5%"
        size={'md'}
        top="1%"
      />
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
        h: '350px',
        w: '540px',
        p: 0,
      }}
      motionPreset="slideInBottom"
      bluryOverlay
      isCentered
      hideClose
      title=""
      {...props}
    ></Modal>
  )
}
