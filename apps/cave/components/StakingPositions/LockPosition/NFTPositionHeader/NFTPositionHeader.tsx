import { CNV_REDEEM_ADDRESS, Percent, STAKING_CONTRACT } from '@concave/core'
import { StakingPosition, StakingV1Abi, StakingV1Contract } from '@concave/marketplace'
import { Button, Flex, FlexProps, Image, Spinner, Text, useInterval } from '@concave/ui'
import { ProgressBar } from 'components/ProgressBar'
import { differenceInDays } from 'date-fns'
import { BigNumber, Transaction } from 'ethers'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { FC, useState } from 'react'
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { NFTPositionHeaderProps, useNFTLockedPositionState } from './hooks/useNFTPositionViewer'
import { compactFormat } from 'utils/bigNumberMask'
import { RedeemABI } from '@concave/core/src/contracts/RedeemAbi'
import { useApproveForAll } from 'hooks/useApprove'
import { useTransaction } from 'hooks/useTransaction'

export const NFTPositionHeader = (props: NFTPositionHeaderProps) => {
  const { period, redeemInDays, imgNameByPeriod, redeemDate, active, toogleActive, tokenId } =
    useNFTLockedPositionState(props)
  const { stakingPosition } = props

  const [status, setStatus] = useState<RedeemedStatus>('default')
  const readyForRedeem = true
  const positionDate = new Date(stakingPosition.maturity * 1000)
  const days = stakingPosition.pool.days
  const difference = (differenceInDays(positionDate, Date.now()) - days) * -1
  const loadBarPercent = new Percent(difference, days)
  const chainId = useCurrentSupportedNetworkId()
  const { address } = useAccount()

  const approveContractInfo = useApproveForAll({
    erc721: stakingPosition.address,
    operator: CNV_REDEEM_ADDRESS[chainId],
    approved: true,
  })

  const owner = useContractRead({
    abi: StakingV1Abi,
    address: STAKING_CONTRACT[chainId],
    functionName: `ownerOf`,
    args: [BigNumber.from(stakingPosition.tokenId)],
  })

  const prepareRedeem = usePrepareContractWrite({
    chainId,
    address: CNV_REDEEM_ADDRESS[chainId],
    abi: RedeemABI,
    functionName: 'redeemStaked',
    args: [BigNumber.from(stakingPosition.tokenId), address],
  })

  const writeRedeem = useContractWrite(prepareRedeem.config)
  const redeemtx = useTransaction(writeRedeem.writeAsync, {
    onError: console.error,
    meta: {
      type: 'redeem',
      amount: `Redeeming lsdCNV #` + stakingPosition.tokenId,
    },
  })

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
            onClick={redeemtx.sendTx}
            {...getRedeemButtonProps(readyForRedeem, status)}
            isDisabled={
              !readyForRedeem ||
              status === 'redeemed' ||
              !approveContractInfo.approved ||
              writeRedeem.status === `success` ||
              owner.data?.toLowerCase() !== address.toLowerCase()
            }
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
          onClick={redeemtx.sendTx}
          {...getRedeemButtonProps(readyForRedeem, status)}
          isDisabled={
            !readyForRedeem ||
            status === 'redeemed' ||
            !approveContractInfo.approved ||
            writeRedeem.status === `success` ||
            owner.data?.toLowerCase() !== address.toLowerCase()
          }
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
