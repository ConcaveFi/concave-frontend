import { Percent } from '@concave/core'
import { LockedIcon, UnlockedIcon } from '@concave/icons'
import { StakingPosition, StakingV1Contract } from '@concave/marketplace'
import { Box, Button, Flex, FlexProps, HStack, Image, Spinner, Text } from '@concave/ui'
import { differenceInDays } from 'date-fns'
import { BigNumber, Transaction } from 'ethers'
import { formatEther } from 'ethers/lib/utils'
import { useTransactionRegistry } from 'hooks/TransactionsRegistry'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { concaveProvider } from 'lib/providers'
import { FC, useEffect, useState } from 'react'
import { formatFixed } from 'utils/formatFixed'
import { useAccount, useSigner, useWaitForTransaction } from 'wagmi'
import { NFTPositionHeaderProps, useNFTLockedPositionState } from './useNFTPositionViewer'
const bigNumberMask = (number: BigNumber) => {
  if (number.eq(0)) {
    return `0`
  }
  if (+formatEther(number) < 0.01) {
    return `<.01`
  }
  return formatFixed(number)
}
export const NFTPositionHeader = (props: NFTPositionHeaderProps) => {
  const { period, redeemInDays, imgNameByPeriod, redeemDate, active, toogleActive, tokenId } =
    useNFTLockedPositionState(props)
  const { stakingPosition } = props

  const [status, setStatus] = useState<RedeemedStatus>('default')
  const readyForReedem = stakingPosition.maturity <= Date.now() / 1000
  const positionDate = new Date(stakingPosition.maturity * 1000)
  const days = stakingPosition.pool.days
  const difference = (differenceInDays(positionDate, Date.now()) - days) * -1
  const loadBarPercent = new Percent(difference, days)
  const recentRedeemed = getRecentRedeemedTransactions()[tokenId.toString()]
  const chainId = useCurrentSupportedNetworkId()
  const { data: signer } = useSigner()
  const { address } = useAccount()
  const { registerTransaction } = useTransactionRegistry()

  const { status: txStatus } = useWaitForTransaction({
    chainId: stakingPosition.chainId,
    hash: recentRedeemed?.tx?.hash,
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

  const redeem = () => {
    const stakingContract = new StakingV1Contract(concaveProvider(chainId))
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
    <Flex
      shadow="up"
      bg="url(assets/textures/metal.png), linear-gradient(180deg, #16222E 0.07%, #28394D 80.07%)"
      bgSize={'120px auto'}
      width={'full'}
      rounded="2xl"
      p={3}
      direction="column"
    >
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
            py={!readyForReedem ? 3 : 4}
            px={4}
            onClick={redeem}
            {...getRedeemButtonProps(readyForReedem, status)}
          />
        </ImageContainer>
        <Flex w="full" justify="space-around">
          <Info title="Initial" info={`${bigNumberMask(stakingPosition.initialValue)} CNV`} />
          <Info title="Gained" info={`${bigNumberMask(stakingPosition.totalRewards)} CNV`} />
          <Info title="Current value" info={`${bigNumberMask(stakingPosition.currentValue)} CNV`} />
        </Flex>

        <Button
          display={{ base: 'none', md: 'flex' }}
          minW={'110px'}
          py={4}
          onClick={redeem}
          {...getRedeemButtonProps(readyForReedem, status)}
        />
      </Flex>
      <LoadBard percent={loadBarPercent} />
    </Flex>
  )
}

type InfoProps = { title: string; info: string }
const Info: FC<InfoProps & FlexProps> = ({ info, title, ...props }) => (
  <Flex direction={'column'} align="start" {...props}>
    <Text fontSize="xs" color={'text.low'}>
      {title}
    </Text>
    <Text fontSize={{ base: 'xs', lg: 'sm' }} fontWeight={'bold'}>
      {info}
    </Text>
  </Flex>
)

type ImageContainerProps = { period: string; src: string; children?: JSX.Element }
const ImageContainer: FC<ImageContainerProps> = ({ period, src, children }) => (
  <Flex
    minW={'150px'}
    width={{ base: 'full', md: '150px' }}
    px={4}
    justify={{ base: 'space-around', md: 'center' }}
    shadow={'Down Medium'}
    align="center"
    rounded={'2xl'}
  >
    <Image ml={-5} boxSize={'70px'} src={src} alt={period} />
    <Info title="Stake period" info={period} />
    {children}
  </Flex>
)
type LoadBarProps = { percent: Percent }
const LoadBard = ({ percent }: LoadBarProps) => {
  return (
    <HStack mx={2}>
      <LockedIcon h={`18px`} w={'18px'} />
      <Flex w={'full'} mx="auto" rounded={'2xl'} shadow="down" h={3} p={0.5}>
        <Box
          width={`100%`}
          height="full"
          backgroundImage={'/assets/liquidstaking/progress.svg'}
          backgroundRepeat={'repeat-x'}
          rounded="full"
          backgroundPosition={'center'}
        >
          <Box
            width={`${percent.toFixed()}%`}
            maxW={`full`}
            height="full"
            bg={'stroke.accent'}
            rounded="full"
          />
        </Box>
      </Flex>
      <UnlockedIcon />
    </HStack>
  )
}
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
        Transaction <br /> redeemed
      </Text>
    ),
  }

  return {
    children: buttonLabels[status],
    disabled: defaultState ? !readyForRedeem : true,

    variant: 'primary',
  }
}
