import { NATIVE } from '@concave/core'
import { TransactionIcon } from '@concave/icons'
import { LogStakingV1, Marketplace, StakingPool } from '@concave/marketplace'
import { Flex, gradientBorder, Image, Link, Text, useMediaQuery, VStack } from '@concave/ui'
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
  const cardListing = data.type === 'sale' ? 'sold for' : 'listed at'
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
  const formatedDate = formatDistanceToNowStrict(new Date(data.date), { addSuffix: true })

  return (
    <Flex
      width={'full'}
      rounded="2xl"
      pb={2}
      shadow="Up Small"
      sx={{ ...gradientBorder({ variant: 'secondary', borderWidth: 2 }) }}
      justify={'space-between'}
      bg="#33333309"
    >
      <Flex direction={'column'} justify="start" width={130}>
        <VStack
          borderRadius={'16px 4px 16px 0px'}
          sx={{ ...gradientBorder({ variant: 'secondary', borderWidth: 2 }) }}
          justify="center"
        >
          <Text style={{ textTransform: 'capitalize' }} fontWeight={700} textColor={labelColor}>
            {data.type}
          </Text>
        </VStack>
        <Image
          justifySelf={'center'}
          h={'60px'}
          pt={2}
          objectFit={`cover`}
          src={`/assets/marketplace/${imgNameByPeriod}`}
          alt="position"
        />
      </Flex>
      <Flex
        width={'full'}
        height="full"
        direction={'column'}
        textColor={'text.low'}
        ml={2}
        align="start"
        fontSize={14}
      >
        <Text pt={1} fontSize={12}>
          {formatedDate}
        </Text>
        <Flex direction={'column'}>
          <Flex alignItems={'end'} width={'full'}>
            <Text fontSize={14} textColor={'white'} fontWeight="700">
              {data.days / 30} month
            </Text>
            <Text pl={1}> position</Text>
          </Flex>
          <Flex alignItems={'end'} width={'full'}>
            <Text> {cardListing}</Text>
            <Text pl={1} fontSize={14} textColor={'white'} fontWeight="700">
              {compactFormat(data.amount, { decimals: curreny?.decimals })} {curreny?.symbol}
            </Text>
          </Flex>
        </Flex>
        {data.transactionHash ? (
          <Flex width={'full'} justify={'start'}>
            <Link
              href={data.transactionHash ? etherscanLink : ''}
              target={data.transactionHash ? '_blank' : ''}
              rel="noreferrer"
              textColor={'blue.300'}
              textDecoration="underline"
            >
              Transaction
            </Link>
            <TransactionIcon ml={2} mt={'6px'} width={`18px`} h={`9px`} />
          </Flex>
        ) : (
          <Text>
            Expiration{' '}
            {formatDistanceToNowStrict(new Date(data.deadline * 1000), { addSuffix: true })}{' '}
          </Text>
        )}
      </Flex>
    </Flex>
  )
}
