import { AirdropClaimContract, AIRDROP_CLAIM, AIRDROP_CLAIM_ABI } from '@concave/core'
import { Button, CloseButton, Flex, Heading, Image, Link, Modal, Text } from '@concave/ui'
import { useAirdrop } from 'contexts/AirdropContext'
import { parseUnits } from 'ethers/lib/utils'
import { useTransactionRegistry } from 'hooks/TransactionsRegistry'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useIsMounted } from 'hooks/useIsMounted'
import { concaveProvider } from 'lib/providers'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useAccount, useContractWrite, useWaitForTransaction } from 'wagmi'
import { airdropToken, getAirdropClaimableAmount, getProof, isWhitelisted } from '../airdrop'

export function AirdropClaimModal() {
  const { isOpen, onClose } = useAirdrop()
  const { address, isConnected } = useAccount()
  const { registerTransaction } = useTransactionRegistry()
  const networkId = useCurrentSupportedNetworkId()

  const isMounted = useIsMounted()

  const proof = isMounted ? getProof(address) : []
  const isOnWhitelist = isMounted ? isWhitelisted(address) : false
  const amount = isMounted ? getAirdropClaimableAmount(address) : 0

  const { data: claimed } = useQuery(['AirdropClaimContract', networkId], async () => {
    const airdrop = new AirdropClaimContract(concaveProvider(networkId))
    return await airdrop.claimed(address)
  })

  const { write: claimAirdrop, data: tx } = useContractWrite({
    addressOrName: AIRDROP_CLAIM[networkId],
    contractInterface: AIRDROP_CLAIM_ABI,
    args: [proof, parseUnits(amount?.toString() || '0', airdropToken.decimals)],
    functionName: 'claim',
  })
  const { status } = useWaitForTransaction({ hash: tx?.hash })

  useEffect(() => {
    if (!tx?.hash) return
    registerTransaction(tx, { type: 'airdrop', amount })
  }, [tx])

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
      <ItemInfo info={`${amount || 0} USDC`} title="Redeemable amount" />
      <Button
        disabled={claimed || !isOnWhitelist || status === 'loading' || !amount}
        isLoading={status === 'loading'}
        onClick={() => claimAirdrop()}
        shadow="0px 0px 20px #0006"
        loadingText="Claiming..."
        bg="stroke.brightGreen"
        position="relative"
        w="fit-content"
        h="50px"
        mt={7}
        px="8"
      >
        <Text id="btn-text" color="white">
          {getButtonLabel({ status, isConnected, claimed, isOnWhitelist })}
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
type StatusProps = {
  status: 'error' | 'success' | 'idle' | 'loading'
  isConnected: boolean
  claimed: boolean
  isOnWhitelist: boolean
}
function getButtonLabel({ claimed, isConnected, isOnWhitelist, status }: StatusProps) {
  if (!isConnected) return 'You are not connected'
  if (status === 'idle') {
    if (claimed) return 'Already claimed'
    if (!isOnWhitelist) return 'Nothing to claim'
    return 'Claim'
  }
  if (status === 'error') return 'Ocurred an error'
  if (status === 'success') return 'Airdrop claimed'
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
