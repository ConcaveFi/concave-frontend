import { Box, CloseButton, Flex, Heading, Image, Link, Modal, Text } from '@concave/ui'
import { useAirdrop } from 'contexts/AirdropContext'
import { AirdropClaimButton } from '../AirdropClaimButton'

export function AirdropClaimModal() {
  const { isOpen, onClose, Q4, special } = useAirdrop()

  return (
    <AirdropModal onClose={onClose} isOpen={isOpen}>
      <Flex w={'full'} gap={4} px={4}>
        <Flex direction={'column'} flex={1} align={'center'}>
          <Text pb="6" textAlign={'center'} mt={2} color="text.low">
            Special airdrop <br />
            <Link color={'text.bright'} href="https://spoon.fyi/proofOfGemInfo" isExternal>
              Click here
            </Link>{' '}
            for more info
          </Text>
          <ItemInfo info={`${special.redeemable || 0} USDC`} title="Redeemable amount" />
          <AirdropClaimButton season="special" />
        </Flex>
        <Box w="px" height={'full'} border={'1px dashed'} borderColor="text.low" />
        <Flex flex={1}>
          <Flex direction={'column'} flex={1} align={'center'}>
            <Text pb="6" textAlign={'center'} mt={2} color="text.low">
              Q4 airdrop is up! <br />{' '}
              <Link
                color={'text.bright'}
                href="https://concave.lol/blog/concave-q4-airdrop-is-here/"
                isExternal
              >
                Click here{' '}
              </Link>
              for more info
            </Text>
            <ItemInfo info={`${Q4.redeemable || 0} USDC`} title="Redeemable amount" />
            <AirdropClaimButton season="Q4" />
          </Flex>
        </Flex>
      </Flex>
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
