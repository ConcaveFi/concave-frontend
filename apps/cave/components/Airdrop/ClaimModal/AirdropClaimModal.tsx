import { AirdropClaimContract } from '@concave/core'
import { Button, CloseButton, Flex, Heading, Image, Modal, Text } from '@concave/ui'
import { useAirdrop } from 'contexts/AirdropContext'
import { parseEther } from 'ethers/lib/utils'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { concaveProvider } from 'lib/providers'
import { useQuery } from 'react-query'
import { useAccount, useSigner } from 'wagmi'
import { getAirdropClaimableAmount, getProof, isWhitelisted } from '../airdrop'

export function AirdropClaimModal() {
  const { isOpen, onClose } = useAirdrop()
  const { address } = useAccount()
  const networkId = useCurrentSupportedNetworkId()
  const { data: signer } = useSigner()

  const proof = getProof(address)
  const isOnWhiteList = isWhitelisted(address)
  const amount = getAirdropClaimableAmount(address)

  const { data: claimed } = useQuery([''], async () => {
    const airdrop = new AirdropClaimContract(concaveProvider(networkId))
    return await airdrop.claimed(address)
  })

  function claimAirdrop() {
    const airdrop = new AirdropClaimContract(concaveProvider(networkId))
    airdrop.claim(signer, proof, parseEther(String(amount)))
  }

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
      <Text pb="6" textAlign={'center'} px={24} mt={2} color="text.bright">
        lorem ipsum dolor sit amet sed lectus. lorem ipsum dolor sit amet sed lectus.{' '}
      </Text>
      <ItemInfo info={`${amount} USDC`} title="Redeemable amount" />
      <Button
        disabled={claimed || !isOnWhiteList}
        shadow="0px 0px 20px #0006"
        bg="stroke.brightGreen"
        onClick={claimAirdrop}
        position="relative"
        w="fit-content"
        h="50px"
        mt={7}
        px="8"
      >
        <Text id="btn-text" color="white">
          {claimed && 'Already claimed'}
          {!isOnWhiteList && 'You are not on white list'}
          {!claimed && isOnWhiteList && 'Claim'}
        </Text>
      </Button>
      <CloseButton
        onClick={onClose}
        color="text.low"
        pos="absolute"
        left="93.5%"
        zIndex={10}
        size={'md'}
        top="1%"
      ></CloseButton>
    </Modal>
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
