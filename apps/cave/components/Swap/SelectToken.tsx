import { CnvQuestionIcon, TokenIcon } from '@concave/icons'
import {
  Box,
  Flex,
  FlexProps,
  HStack,
  Input,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from '@concave/ui'
import { tokenService } from 'lib/token.service'
import { TokenType } from 'lib/tokens'
import React, { useState } from 'react'
import { useQuery } from 'react-query'

export type TokenButton = {
  active?: boolean
  token: TokenType
} & FlexProps

const TokenButton = ({ token, active, ...flexProps }: TokenButton) => {
  const shadow = active ? 'Down Big' : 'Up Small'
  return (
    <Flex p={2} cursor={'pointer'} borderRadius={'3xl'} boxShadow={shadow} {...flexProps}>
      <TokenIcon size="sm" mr={2} symbol={token.symbol} logoURI={token.logoURI} />
      <Text lineHeight={'30px'} mr={2} fontSize={12} fontWeight={700}>
        {token.symbol.toUpperCase()}
      </Text>
    </Flex>
  )
}

const CommonBases = ({
  options = [],
  selected,
  onChange,
}: {
  options: TokenType[]
  selected: TokenType
  onChange: (token: string) => void
}) => {
  if (!options?.length) {
    return <></>
  }
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
        {options.map((token, key, i) => {
          return (
            <TokenButton
              title={token.name}
              onClick={() => {
                onChange(token.symbol)
              }}
              key={key}
              active={token.symbol === selected.symbol}
              token={token}
            />
          )
        })}
      </Flex>
    </>
  )
}

export const SelectToken = ({
  commonBases = [],
  selected,
  onChange,
}: {
  commonBases: TokenType[]
  selected: TokenType
  onChange: (token: string) => void
}) => {
  const [search, setSearch] = useState('')
  const { data: tokens } = useQuery(['LIST_TOKEN', search], () =>
    tokenService.listTokens({
      label: search,
    }),
  )
  return (
    <>
      <CommonBases options={commonBases} selected={selected} onChange={onChange}></CommonBases>
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
        gap={2}
        wrap={'wrap'}
        height={'100%'}
        boxShadow={'Down Big'}
      >
        <Box
          mx={2}
          my={4}
          w={380}
          h={280}
          overflowX={'hidden'}
          sx={{
            '&::-webkit-scrollbar': {
              width: '12px',
              boxShadow: 'Down Big',
              borderRadius: '8px',
              backgroundColor: `rgba(0, 0, 0, 0.05)`,
            },
            '&::-webkit-scrollbar-thumb': {
              borderRadius: '8px',
              backgroundColor: `#5F7A99`,
            },
          }}
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
                  <TokenIcon size="md" mr={1} symbol={t.symbol} logoURI={t.logoURI} />
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
        </Box>
      </Flex>
    </>
  )
}
