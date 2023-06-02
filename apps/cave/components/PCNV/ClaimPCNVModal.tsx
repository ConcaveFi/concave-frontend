import { AIRDROP_CLAIM_ABI, ChainId, PCNV, PCNV_ADDRESS } from '@concave/core'
import { WithdrawIcon } from '@concave/icons'
import { Button, Flex, Heading, Image, Modal, Text, useToast } from '@concave/ui'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import {
  mainnet,
  useAccount,
  useBalance,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { getPCNVClaimProof, getPCNVClaimableAmount, isWhitelistedPCNV } from './pcnv_merkle'
import { parseUnits } from 'ethers/lib/utils.js'
import { useAddRecentTransaction } from 'contexts/Transactions'

export function ClaimPCNVModal(props: { isOpen: boolean; onClose: VoidFunction }) {
  const chainId = useCurrentSupportedNetworkId()
  const { address } = useAccount()
  const balance = useBalance({ address, token: PCNV_ADDRESS[ChainId.ETHEREUM] })
  const isWhitelisted = isWhitelistedPCNV(address)
  const toReceive = getPCNVClaimableAmount(address)
  const proof = getPCNVClaimProof(address)

  const claimPCNVContract = '0x6d0D53672E458D7904e67784fb26550Ca8412554'
  const { data: claimedPCNV } = useContractRead({
    address: claimPCNVContract,
    functionName: 'claimed',
    abi: AIRDROP_CLAIM_ABI,
    args: [address],
  })

  // console.log(claimedPCNV)

  const config = usePrepareContractWrite({
    address: claimPCNVContract,
    abi: AIRDROP_CLAIM_ABI, // pcnv claim shares same abi with airdrop contracts abi.
    args: [proof, parseUnits(toReceive?.toString() ?? '0', 18)],
    functionName: 'claim',
  })

  const registerTransaction = useAddRecentTransaction()
  const claimPCNV = useContractWrite({ ...config.data })

  async function onClaimPCNV() {
    const { hash } = await claimPCNV.writeAsync()
    registerTransaction({
      meta: { type: 'claim', amount: toReceive.toFixed(2), token: 'pCNV' },
      hash,
    })
  }

  return (
    <Modal
      {...props}
      hideClose
      title=""
      bluryOverlay
      isCentered
      bodyProps={{
        height: 'fit',
        align: 'center',
        variant: 'primary',
        borderGradient: '',
        boxShadow: 'up',
        width: '360px',
        gap: 4,
      }}
    >
      <Image width={'190px'} h={'200px'} alt="cube image" src="/assets/airdrop/cube.png" />
      <Heading
        textShadow={'0px 0px 27px rgba(129, 179, 255, 0.31)'}
        fontWeight={'bold'}
        fontSize={'3xl'}
      >
        Got pCNV tokens?
      </Heading>
      <Text textAlign={'center'} fontSize={'sm'} fontWeight={'medium'}>
        {`Press "Claim" below to redeem them for CNV! See the exact conversion using the
        calculations below. Remember, it's a one-time deal and your pCNV won't be redeemable
        afterwards.`}
      </Text>
      <Text color={'text.low'}>Read the doc for more info</Text>
      {claimedPCNV && (
        <Flex p={4} shadow={'down'} rounded={'2xl'} flexDirection={'column'} align={'center'}>
          <Text fontWeight={'medium'} fontSize={'sm'}>
            You have already claimed with your pCNV
          </Text>
          <Text fontSize={'sm'} color={'text.low'}>
            CNV claimed:
            <strong style={{ color: 'white' }}> {toReceive}</strong>
          </Text>
        </Flex>
      )}
      {!claimedPCNV && (
        <>
          <Flex w={'full'} p={4} gap={2} flexDirection={'column'} rounded={'xl'} shadow={'down'}>
            <Flex gap="2">
              <Text color={'text.bright'} fontSize={'sm'}>
                You have:
              </Text>
              <Text fontSize={'sm'} fontWeight={'bold'}>
                {balance?.data?.formatted} pCNV
              </Text>
            </Flex>
            <Flex gap="2">
              <Text color={'text.bright'} fontSize={'sm'}>
                You receive:
              </Text>
              <Text fontSize={'sm'} fontWeight={'bold'}>
                {toReceive ?? '0.0'} CNV
              </Text>
            </Flex>
          </Flex>
          <Button
            disabled={!isWhitelisted || !proof}
            onClick={onClaimPCNV}
            variant="primary"
            isLoading={false}
            loadingText="Claiming CNV"
            h="42px"
            w="full"
          >
            {!isWhitelisted && 'Not whitelisted'}
            {isWhitelisted && (
              <>
                <WithdrawIcon boxSize={'30px'} />
                Claim pCNV
              </>
            )}
          </Button>
        </>
      )}
    </Modal>
  )
}
