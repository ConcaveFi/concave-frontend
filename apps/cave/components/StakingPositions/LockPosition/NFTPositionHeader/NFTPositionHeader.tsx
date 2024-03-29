import { Percent } from '@concave/core'
import { StakingPosition, StakingV1Contract } from '@concave/marketplace'
import { Button, Flex, FlexProps, Image, Spinner, Text } from '@concave/ui'
import { ProgressBar } from 'components/ProgressBar'
import { differenceInDays } from 'date-fns'
import { Transaction } from 'ethers'
import { useAddRecentTransaction } from 'contexts/Transactions'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { FC, useEffect, useState } from 'react'
import { Address, useAccount, useProvider, useSigner, useWaitForTransaction } from 'wagmi'
import { NFTPositionHeaderProps, useNFTLockedPositionState } from './hooks/useNFTPositionViewer'
import { compactFormat } from 'utils/bigNumberMask'

export const NFTPositionHeader = (props: NFTPositionHeaderProps) => {
  const { period, imgNameByPeriod, tokenId } = useNFTLockedPositionState(props)
  const { stakingPosition } = props

  const [status, setStatus] = useState<RedeemedStatus>('default')
  const readyForRedeem = stakingPosition.maturity <= Date.now() / 1000
  const positionDate = new Date(stakingPosition.maturity * 1000)
  const days = stakingPosition.pool.days
  const difference = (differenceInDays(positionDate, Date.now()) - days) * -1
  const loadBarPercent = new Percent(difference, days)
  const recentRedeemed = getRecentRedeemedTransactions()[tokenId.toString()]
  const chainId = useCurrentSupportedNetworkId()
  const { data: signer } = useSigner()
  const { address } = useAccount()
  const registerTransaction = useAddRecentTransaction()

  const { status: txStatus } = useWaitForTransaction({
    chainId: stakingPosition.chainId,
    hash: recentRedeemed?.tx?.hash as `0x${string}`,
  })

  useEffect(() => {
    if (recentRedeemed) {
      if (txStatus === 'loading') setStatus('waitingTx')
      else if (txStatus === 'error' || txStatus === 'success') {
        const { [+tokenId.toString()]: finishedTransaction, ...transactions } =
          getRecentRedeemedTransactions()
        localStorage.setItem('positionsRedeemed', JSON.stringify(transactions))
        if (txStatus === 'success') setStatus('redeemed')
        else if (txStatus === 'error') setStatus('default')
      }
    }
  }, [txStatus])

  const provider = useProvider()

  const redeem = () => {
    const stakingContract = new StakingV1Contract(provider)
    setStatus('approve')
    stakingContract
      .unlock(signer, address, stakingPosition.tokenId)
      .then((tx) => {
        setStatus('waitingTx')
        registerTransaction({
          hash: tx.hash as Address,
          meta: {
            type: 'redeem',
            amount: compactFormat(stakingPosition.currentValue) + ' from token id: ' + tokenId,
          },
        })
        localStorage.setItem(
          'positionsRedeemed',
          JSON.stringify({
            ...recentRedeemed,
            [tokenId.toString()]: { tx, position: stakingPosition },
          }),
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

  return (
    <Flex shadow="up" width={'full'} rounded="2xl" p={3} direction="column">
      <Flex
        width={'full'}
        justify="space-between"
        mb={2}
        align="center"
        direction={{ base: 'column', md: 'row' }}
      >
        <ImageContainer src={`/assets/marketplace/${imgNameByPeriod}`} period={period}>
          <Button
            display={{ base: 'flex', md: 'none' }}
            w={'90px'}
            py={!readyForRedeem ? 3 : 4}
            px={4}
            onClick={redeem}
            {...getRedeemButtonProps(readyForRedeem, status)}
            isDisabled={!readyForRedeem || status === 'redeemed'}
          />
        </ImageContainer>
        <Flex w="full" justify="space-around">
          <Info title="Initial" info={`${compactFormat(stakingPosition.initialValue)} CNV`} />
          <Info title="Gained" info={`${compactFormat(stakingPosition.totalRewards)} CNV`} />
          <Info title="Current value" info={`${compactFormat(stakingPosition.currentValue)} CNV`} />
        </Flex>

        <Button
          display={{ base: 'none', md: 'flex' }}
          minW={'110px'}
          py={4}
          onClick={redeem}
          {...getRedeemButtonProps(readyForRedeem, status)}
          isDisabled={!readyForRedeem || status === 'redeemed'}
        />
      </Flex>
      <ProgressBar percent={loadBarPercent} />
    </Flex>
  )
}

type InfoProps = { title: string; info: string; variant?: 'header' }
const Info: FC<InfoProps & FlexProps> = ({ info, variant, title, ...props }) => (
  <Flex direction={'column'} align={{ base: 'center', md: 'start' }} {...props}>
    <Text fontSize="xs" color={'text.low'}>
      {title}
    </Text>
    <Text fontSize={{ base: variant ? 16 : 'xs', lg: 'sm' }} fontWeight={'bold'}>
      {info}
    </Text>
  </Flex>
)

type ImageContainerProps = { period: string; src: string; children?: JSX.Element }
const ImageContainer: FC<ImageContainerProps> = ({ period, src, children }) => (
  <Flex
    minW={'150px'}
    width={{ base: 'full', md: '150px' }}
    justify={{ base: 'space-between', md: 'center' }}
    shadow={'Down Medium'}
    align="center"
    gap={2}
    p={2}
    rounded={'2xl'}
  >
    <Image w={'60px'} src={src} alt={period} />
    <Info title="Stake period" info={period} variant={'header'} />
    {children}
  </Flex>
)
type RecentRedeemedTransaction = {
  [key: number]: {
    tx: Transaction
    position: StakingPosition
  }
}
type RedeemedStatus = 'default' | 'approve' | 'waitingTx' | 'rejected' | 'redeemed' | 'error'
function getRecentRedeemedTransactions() {
  return JSON.parse(localStorage.getItem('positionsRedeemed') || '{}') as RecentRedeemedTransaction
}
const getRedeemButtonProps = (readyForRedeem: boolean, status: RedeemedStatus) => {
  const defaultState = status === 'default'
  const buttonLabels = {
    default: !readyForRedeem ? (
      <Text fontSize={'xs'}>
        Not <br /> redeemable
      </Text>
    ) : (
      'Redeem'
    ),
    approve: (
      <Flex gap={1} align="center">
        <Text fontSize={'xs'}>
          Pending <br /> approval
        </Text>
        <Spinner size={'sm'} />
      </Flex>
    ),
    waitingTx: (
      <Flex gap={2} align="center">
        <Text fontSize={'xs'}>
          Waiting for <br /> transaction
        </Text>
        <Spinner size={'sm'} />
      </Flex>
    ),
    rejected: (
      <Text fontSize={'xs'}>
        Transaction <br /> rejected
      </Text>
    ),
    error: (
      <Text fontSize={'xs'}>
        Ocurred an <br /> error
      </Text>
    ),
    redeemed: (
      <Text fontSize={'xs'}>
        Position <br /> redeemed
      </Text>
    ),
  }

  return {
    children: buttonLabels[status],
    disabled: defaultState ? !readyForRedeem : true,

    variant: 'primary',
  }
}
