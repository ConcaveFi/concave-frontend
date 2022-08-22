import { StakingPosition, StakingV1Contract } from '@concave/marketplace'
import { Box, Button, Flex, FlexProps, HStack, Spinner, Text, TextProps } from '@concave/ui'
import { BigNumber, Transaction } from 'ethers'
import { formatEther } from 'ethers/lib/utils'
import { useTransactionRegistry } from 'hooks/TransactionsRegistry'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { concaveProvider } from 'lib/providers'
import { useEffect, useState } from 'react'
import { formatFixed } from 'utils/bigNumberMasks'
import { useAccount, useSigner, useWaitForTransaction } from 'wagmi'

const bigNumberMask = (number: BigNumber) => {
  if (number.eq(0)) {
    return `0`
  }
  if (+formatEther(number) < 0.01) {
    return `<.01`
  }
  return formatFixed(number)
}

interface RedeemCardViewerProps {
  stakingPosition: StakingPosition
}

type RecentRedeemedTransaction = {
  [key: number]: {
    tx: Transaction
    position: StakingPosition
  }
}
type RedeemedStatus = 'default' | 'approve' | 'waitingTx' | 'rejected' | 'redeemed' | 'error'
export const RedeemCardViewer = ({ stakingPosition }: RedeemCardViewerProps) => {
  const [status, setStatus] = useState<RedeemedStatus>('default')

  const readyForReedem = stakingPosition.maturity <= Date.now() / 1000
  const chaindID = useCurrentSupportedNetworkId()
  const { data: signer } = useSigner()
  const { address } = useAccount()
  const tokenId = +stakingPosition?.tokenId.toString()
  const recentRedeemed = getRecentRedeemedTransactions()[tokenId]

  const { registerTransaction } = useTransactionRegistry()

  const { status: txStatus } = useWaitForTransaction({
    chainId: stakingPosition.chainId,
    hash: recentRedeemed?.tx?.hash,
  })

  const redeem = () => {
    const stakingContract = new StakingV1Contract(concaveProvider(chaindID))
    setStatus('approve')
    stakingContract
      .unlock(signer, address, stakingPosition.tokenId)
      .then((tx) => {
        setStatus('waitingTx')
        registerTransaction(tx, {
          type: 'redeem',
          amount: bigNumberMask(stakingPosition.currentValue) + ' from token id: ' + tokenId,
        })
        localStorage.setItem(
          'positionsRedeemed',
          JSON.stringify({ ...recentRedeemed, [tokenId]: { tx, position: stakingPosition } }),
        )
      })
      .catch((error) => {
        if (error.code === 4001) setStatus('rejected')
        else setStatus('error')

        const interval = setInterval(() => {
          setStatus('default')
          clearInterval(interval)
        }, 3000)
      })
  }

  useEffect(() => {
    if (recentRedeemed) {
      if (txStatus === 'loading') setStatus('waitingTx')
      if (txStatus === 'error' || txStatus === 'success') {
        const { [tokenId]: finishedTransaction, ...transactions } = getRecentRedeemedTransactions()
        localStorage.setItem('positionsRedeemed', JSON.stringify(transactions))
        if (txStatus === 'success') setStatus('redeemed')
        if (txStatus === 'error') setStatus('default')
      }
    }
  }, [txStatus])

  return (
    <Box borderRadius="2xl" maxW={{ base: '353px', md: '500px', lg: '720px' }}>
      <Flex gap={3} flex={1} direction={{ base: 'column', md: 'row' }}>
        <Flex ml={{ lg: 7 }} mx="auto">
          <Info
            label="Current value"
            fontSize={{ base: 'sm', md: 'lg' }}
            value={bigNumberMask(stakingPosition.currentValue) + ' CNV'}
          />
          <Info
            label="Gained"
            fontSize={{ base: 'sm', md: 'lg' }}
            value={bigNumberMask(stakingPosition.totalRewards) + ' CNV'}
          />
          <Info
            label="Initial"
            fontSize={{ base: 'sm', md: 'lg' }}
            value={bigNumberMask(stakingPosition.initialValue) + ' CNV'}
          />
        </Flex>
        <Button onClick={redeem} {...getRedeemButtonProps(readyForReedem, status)} />
      </Flex>
    </Box>
  )
}

interface Info extends FlexProps {
  label: string
  value: string
  isLoading?: boolean
  fontSize?: TextProps['fontSize']
}
export const Info: React.FC<Info> = ({ ...props }) => {
  return (
    <Flex width={'110px'} direction={'column'} textAlign={{ lg: 'start', md: 'center' }} {...props}>
      <Text color="text.low" fontSize="sm" lineHeight={'12px'} noOfLines={1}>
        {props.label}
      </Text>
      <HStack>
        {props.isLoading && <Spinner size="xs" />}
        <Text fontSize={props.fontSize || 'md'} fontWeight="bold" noOfLines={1}>
          {props.value}
        </Text>
      </HStack>
    </Flex>
  )
}

function getRecentRedeemedTransactions() {
  return JSON.parse(localStorage.getItem('positionsRedeemed') || '{}') as RecentRedeemedTransaction
}
const getRedeemButtonProps = (readyForRedeem: boolean, status: RedeemedStatus) => {
  const defaultState = status === 'default'
  const buttonLabels = {
    default: !readyForRedeem ? 'Not redeemable' : 'Redeem',
    approve: (
      <Flex gap={2}>
        <Spinner />
        <Text>{'Approve in your wallet...'}</Text>
      </Flex>
    ),
    waitingTx: (
      <Flex gap={2}>
        <Spinner />
        <Text>{'Waiting for transaction...'}</Text>
      </Flex>
    ),
    rejected: 'Transaction rejected',
    error: 'Ocurred an error',
    redeemed: 'Transaction redeemed',
  }

  return {
    children: buttonLabels[status],
    disabled: defaultState ? !readyForRedeem : true,

    variant: 'primary',
    size: 'md',
    minW: { base: '280px', md: '160px' },
    m: 'auto',
    mt: '2px',
  }
}
