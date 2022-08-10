import { NATIVE } from '@concave/core'
import { TransactionIcon } from '@concave/icons'
import { LogStakingV1, Marketplace, StakingPool } from '@concave/marketplace'
import { Flex, Image, Link, Text, useMediaQuery, VStack } from '@concave/ui'
import { formatDistanceToNowStrict } from 'date-fns'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useFetchTokenData } from 'hooks/useTokenList'
import { useEffect, useState } from 'react'
import { compactFormat } from 'utils/formatFixed'
import { chain } from 'wagmi'
import { Data } from './MarketplaceActivityCard'
interface MarketplaceTransactionCardProps {
  data?: Data & StakingPool & Marketplace & LogStakingV1
}

export const MarketplaceTransactionCard = ({ data }: MarketplaceTransactionCardProps) => {
  const labelColor = data.type === 'sale' ? '#7AF0CD' : '#2E97E2'
  const chainId = useCurrentSupportedNetworkId()
  const etherscanBaseUrl =
    chainId === chain.mainnet.id ? `https://etherscan.io` : `https://rinkeby.etherscan.io`
  const etherscanLink = etherscanBaseUrl + `/tx/${data.transactionHash}`
  const [isLargerThan770] = useMediaQuery('(min-width: 770px)')
  const [width, setWidth] = useState('0')
  const imgNameByPeriod = {
    0: '12mposition.png',
    1: '6mposition.png',
    2: '3mposition.png',
    3: '1mposition.png',
  }[data.poolID]
  useEffect(() => {
    setWidth(isLargerThan770 ? '' : '180px')
  }, [isLargerThan770])

  const currencyInfo = useFetchTokenData(chainId, data.tokenOption)
  const curreny = currencyInfo.isError ? NATIVE[chainId] : currencyInfo.data

  return (
    <Flex
      width={'full'}
      height="100"
      rounded="2xl"
      mb={2}
      shadow="Up Small"
      justify={'space-between'}
      bg="#33333309"
    >
      <Flex direction={'column'} width={130} justify="end">
        <VStack height={'full'} mt={2}>
          <Text position={'absolute'} fontWeight={700} textColor={labelColor}>
            {data.type}
          </Text>
        </VStack>
        <Image sizes="100%" src={`/assets/marketplace/${imgNameByPeriod}`} alt="position" />
      </Flex>
      <Flex
        width={'full'}
        height="full"
        direction={'column'}
        textColor={'text.low'}
        ml={'1'}
        align="start"
        fontSize={14}
      >
        <Text pt={1}>{formatDistanceToNowStrict(data.date)}</Text>
        <Flex direction={'column'}>
          <Flex alignItems={'end'} width={'full'}>
            <Text fontSize={14} textColor={'white'} fontWeight="700">
              {data.days} Days,
            </Text>
            <Text pl={1}> positions is</Text>
          </Flex>
          <Flex alignItems={'end'} width={'full'}>
            <Text> listed at</Text>
            <Text pl={1} fontSize={14} textColor={'white'} fontWeight="700">
              {compactFormat(data.amount, { decimals: curreny?.decimals })} {curreny?.symbol}
            </Text>
          </Flex>
        </Flex>
        {data.transactionHash ? (
          <Flex width={'full'} mt={1} justify={'start'}>
            <Link
              pb={1}
              href={data.transactionHash ? etherscanLink : ''}
              target={data.transactionHash ? '_blank' : ''}
              rel="noreferrer"
              textColor={'blue.300'}
              textDecoration="underline"
            >
              Transaction
            </Link>
            <TransactionIcon ml={2} mt={'6px'} viewBox="0 0 30 30" />
          </Flex>
        ) : (
          <Text>#{`${data.tokenID} `}</Text>
        )}
      </Flex>
    </Flex>
  )
}
