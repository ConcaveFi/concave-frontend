import { CnvQuestionIcon, TokenIcon } from '@concave/icons'
import { Flex, FlexProps, HStack, Input, ListItem, Text, UnorderedList, VStack } from '@concave/ui'
import { coingecko } from 'lib/coingecko.adapter'
import React, { useState } from 'react'
import { useQuery } from 'react-query'

export type TokenButton = {
  active?: boolean
  symbol: string
} & FlexProps

const TOKEN_INFO = 'TOKEN_INFO'

const TokenButton = ({ symbol, active, ...flexProps }: TokenButton) => {
  const { data: tokenInfo } = useQuery([TOKEN_INFO, symbol], () => coingecko.getTokenInfo(symbol))
  const shadow = active ? 'low' : 'outsideDown'
  return (
    <Flex p={2} cursor={'pointer'} borderRadius={'3xl'} boxShadow={shadow} {...flexProps}>
      <TokenIcon size="30px" mr={2} tokenName={symbol} />
      <Text lineHeight={'30px'} mr={2} fontSize={12} fontWeight={700}>
        {tokenInfo?.symbol.toUpperCase()}
      </Text>
    </Flex>
  )
}

export const SelectToken = ({
  commonBases,
  selected,
  onChange,
}: {
  commonBases: string[]
  selected: string
  onChange: (token: string) => void
}) => {
  const [search, setSearch] = useState('')
  const { data } = useQuery(['LIST_TOKEN', '50'], () => coingecko.listCoins({ top: 50 }))
  const tokens = data
    ?.filter((d) => ~d.name.indexOf(search) || ~d.symbol.indexOf(search) || ~d.id.indexOf(search))
    .filter((d) => !~d.id.indexOf('wormhole'))
    .sort()
  return (
    <>
      <Flex>
        <Text fontWeight={600}>Common bases</Text>
        <CnvQuestionIcon
          filter="drop-shadow(-1px 1px 2px rgba(255, 255, 255, 0.25))"
          height={'25px'}
          width={'22px'}
          viewBox="0 0 16 16"
          ml={2}
        />
      </Flex>
      <Flex gap={2} wrap={'wrap'}>
        {commonBases.sort().map((symbol, key) => {
          return (
            <TokenButton
              onClick={() => {
                onChange(symbol)
              }}
              key={key}
              active={symbol === selected}
              symbol={symbol}
            />
          )
        })}
      </Flex>
      <Input
        placeholder="Search name or past address"
        onChange={({ target }) => {
          setSearch(target.value)
        }}
      />
      <Flex
        borderRadius={'2xl'}
        overflowX={'hidden'}
        overflowY={'auto'}
        h={'150px'}
        gap={2}
        wrap={'wrap'}
        height={'100%'}
        boxShadow={'low'}
      >
        <UnorderedList>
          {tokens?.map((t, key) => (
            <ListItem
              cursor={'pointer'}
              py={2}
              opacity={0.7}
              _hover={{
                opacity: 1,
              }}
              borderRadius={'2xl'}
              listStyleType={'none'}
              key={key}
              onClick={() => {
                onChange(t.symbol)
              }}
            >
              <HStack m={2}>
                <TokenIcon size="40px" mr={1} tokenName={t.symbol} />
                <VStack align={'baseline'}>
                  <Text fontWeight={700} lineHeight={'17px'} fontSize={'14px'}>
                    {t.symbol.toUpperCase()}
                  </Text>
                  <Text fontWeight={400} lineHeight={'12px'} fontSize={'14px'}>
                    {t.name}
                  </Text>
                </VStack>
              </HStack>
            </ListItem>
          ))}
        </UnorderedList>
      </Flex>
    </>
  )
}
