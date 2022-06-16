import { TransactionIcon } from '@concave/icons'
import { Flex, Image, Link, Text, useMediaQuery, VStack } from '@concave/ui'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'

interface MarketplaceTransactionCardProps {
  type: 'sale' | 'listing'
  filter?: any
}

export const MarketplaceTransactionCard = (props: MarketplaceTransactionCardProps) => {
  const { filter, type } = props
  const cleanDate = format(new Date(filter.date), 'PPpp')
  const labelType = type === 'sale' ? 'sale' : 'listing'
  const labelColor = type === 'sale' ? '#7AF0CD' : '#2E97E2'

  const [isLargerThan770] = useMediaQuery('(min-width: 770px)')

  const [width, setWidth] = useState('0')

  useEffect(() => {
    setWidth(isLargerThan770 ? '' : '180px')
  })

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
      <Flex direction={'column'} width={'83px'} justify="end">
        <VStack height={'full'} mt={2}>
          <Text position={'absolute'} fontWeight={700} textColor={labelColor}>
            {labelType}
          </Text>
        </VStack>
        <Image sizes="100%" src={'/assets/marketplace/3mposition.png'} alt="position" />
      </Flex>
      <Flex
        width={width}
        height="full"
        direction={'column'}
        textAlign="center"
        textColor={'text.low'}
        ml={'1'}
        align="start"
        justify={'space-between'}
        alignItems="start"
        fontSize={14}
      >
        <Text pt={1}>Mar 4, 2022, 2:33:24 PM</Text>
        <Flex direction={'column'}>
          <Flex alignItems={'end'} width={'full'}>
            <Text fontSize={14} textColor={'white'} fontWeight="700">
              90 Days
            </Text>
            <Text pl={1}> positions is</Text>
          </Flex>
          <Flex alignItems={'end'} width={'full'}>
            <Text> listed at</Text>
            <Text pl={1} fontSize={14} textColor={'white'} fontWeight="700">
              700 CNV
            </Text>
          </Flex>
        </Flex>
        <Flex width={'full'} mt={1} justify={'start'}>
          <Link
            pb={1}
            href={`https://etherscan.io/tx/${filter.link}`}
            target="_blank"
            rel="noreferrer"
            textColor={'blue.300'}
            textDecoration="underline"
          >
            Transaction
          </Link>
          <TransactionIcon ml={2} mt={'6px'} viewBox="0 0 30 30" />
        </Flex>
      </Flex>
    </Flex>
  )
}
