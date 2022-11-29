import { Currency, Token } from '@concave/core'
import { Fetcher } from '@concave/gemswap-sdk'
import { Flex, Input, ListItem, Spinner, Stack, Text, UnorderedList } from '@concave/ui'
import { CurrencyIcon } from 'components/CurrencyIcon'
import { isAddress } from 'ethers/lib/utils'
import { useLiquidityTokenList } from 'hooks/useTokenList'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useProvider } from 'wagmi'
import { commonTokens } from './SelectAMMCurrency'

const TokenListItem = ({ currency, onClick }: { currency: Currency; onClick: () => void }) => (
  <ListItem
    cursor="pointer"
    _hover={{ opacity: 0.7 }}
    borderRadius="2xl"
    listStyleType="none"
    onClick={onClick}
    title={currency.wrapped.address}
  >
    <Stack direction="row" spacing={3} align="center">
      <CurrencyIcon h="35px" w="35px" currency={currency} />
      <Stack spacing={0} justify="center">
        <Text fontWeight="bold" fontSize="md">
          {currency.symbol}
        </Text>
        <Text color="text.low" fontSize="sm">
          {currency.name}
        </Text>
      </Stack>
    </Stack>
  </ListItem>
)

const searchTokenFilter =
  (search) =>
  ({ name, address, symbol }: Token) =>
    !search ||
    address.toLowerCase() === search.toLowerCase() ||
    name.toLowerCase().includes(search.toLowerCase()) ||
    symbol.toLowerCase().includes(search.toLowerCase())

export const SearchableTokenList = ({
  selected,
  onSelect,
}: {
  selected: Currency
  onSelect: (token: Currency) => void
}) => {
  const provider = useProvider()
  const tokenList = useLiquidityTokenList()
  const [search, setSearch] = useState('')
  const tokens = (tokenList.data || [])
    .filter((t) => !commonTokens.find((c) => c[t.chainId].wrapped.address == t.address))
    .filter(searchTokenFilter(search))

  const searchedToken = useQuery(
    ['token', search],
    () => Fetcher.fetchTokenData(search, provider),
    { retry: false, enabled: isAddress(search) && !tokens.length },
  )
  return (
    <>
      <Input
        placeholder="Search name or paste address"
        onChange={({ target }) => setSearch(target.value)}
      />
      <Flex
        bg="blackAlpha.300"
        borderRadius="xl"
        overflowX="hidden"
        overflowY="auto"
        h="100%"
        shadow="Down Big"
        p={3}
      >
        {tokenList.isLoading ||
        (!tokenList.data.length && tokenList.isFetching) ||
        searchedToken.isLoading ? (
          <Spinner />
        ) : !searchedToken.data && tokens.length === 0 ? (
          <Text w="full" align="center" fontSize="sm" fontWeight="bold" color="text.low">
            No token found
          </Text>
        ) : (
          <UnorderedList
            w="100%"
            h="33vh"
            apply="scrollbar.secondary"
            marginInline={0}
            overflowX="hidden"
            spacing={4}
          >
            {tokens.map((token, i) => (
              <TokenListItem key={i} currency={token} onClick={() => onSelect(token)} />
            ))}
            {searchedToken.isSuccess && (
              <TokenListItem
                currency={searchedToken.data}
                onClick={() => onSelect(searchedToken.data)}
              />
            )}
          </UnorderedList>
        )}
      </Flex>
    </>
  )
}
