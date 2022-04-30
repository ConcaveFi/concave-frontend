import { CnvQuestionIcon, DownIcon } from '@concave/icons'
import {
  Button,
  Flex,
  Heading,
  Input,
  ListItem,
  Modal,
  Spinner,
  Stack,
  Text,
  UnorderedList,
  useDisclosure,
} from '@concave/ui'
import { CurrencyIcon } from 'components/CurrencyIcon'
import { CNV, Currency, DAI, Fetcher, NATIVE } from 'gemswap-sdk'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { concaveProvider } from 'lib/providers'
import React, { useCallback, useState } from 'react'
import { useQuery } from 'react-query'
import { useTokenList } from './hooks/useTokenList'

const CommonTokens = ({
  selected,
  onSelect,
  currencies,
}: {
  selected?: Currency
  onSelect: (currency: Currency) => void
  currencies: Currency[]
}) => {
  return (
    <>
      <Heading size="sm">
        Common pairs <CnvQuestionIcon w="22px" h="22px" ml={2} />
      </Heading>
      <Flex gap={2} wrap="wrap">
        {currencies.map((currency) => (
          <Button
            key={currency.isToken ? currency.address : currency.symbol}
            onClick={() => onSelect(currency)}
            rounded="full"
            leftIcon={<CurrencyIcon currency={currency} />}
            shadow="Up Small"
            _hover={{ shadow: 'Up Small' }}
            _focus={{ shadow: 'Up Small' }}
            _active={{ shadow: 'down' }}
            _selected={{ shadow: 'Down Big', color: 'text.low' }}
            aria-selected={!!selected?.equals(currency)}
            p={1}
            pr={3}
            fontSize="sm"
          >
            {currency.symbol.toUpperCase()}
          </Button>
        ))}
      </Flex>
    </>
  )
}

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
          {currency.symbol.toUpperCase()}
        </Text>
        <Text color="text.low" fontSize="sm">
          {currency.name}
        </Text>
      </Stack>
    </Stack>
  </ListItem>
)

export const SelectTokenModal = ({
  selected,
  onSelect,
  isOpen,
  onClose,
}: {
  selected: Currency
  onSelect: (token: Currency) => void
  isOpen: boolean
  onClose: () => void
}) => {
  const networkId = useCurrentSupportedNetworkId()
  const [search, setSearch] = useState('')
  const { data, ...tokensInfo } = useTokenList()
  const provider = concaveProvider(networkId)
  const { data: token, ...tokenInfo } = useQuery(['token', search], () =>
    Fetcher.fetchTokenData(search, provider),
  )
  const tokens = (data || []).filter((t) => {
    return (
      !search ||
      t.address.toLowerCase() === search.toLowerCase() ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.symbol.toLowerCase().includes(search.toLowerCase())
    )
  })
  const selectAndClose = useCallback(
    (token: Currency) => {
      onSelect(token), onClose()
    },
    [onSelect, onClose],
  )
  return (
    <Modal
      bluryOverlay
      title="Select a Token"
      size="md"
      isOpen={isOpen}
      onClose={onClose}
      bodyProps={{ gap: 4 }}
    >
      <CommonTokens
        currencies={[DAI[networkId], CNV[networkId], NATIVE[networkId]]} //[nativeCurrency, ...BASES_TO_CHECK_TRADES_AGAINST[chainId]]}
        selected={selected}
        onSelect={selectAndClose}
      />
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
        {tokensInfo.isLoading || (!tokens.length && tokenInfo.isLoading) ? (
          <Spinner />
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
              <TokenListItem key={i} currency={token} onClick={() => selectAndClose(token)} />
            ))}
            {tokenInfo.isSuccess && (
              <TokenListItem currency={token} onClick={() => selectAndClose(token)} />
            )}
          </UnorderedList>
        )}
      </Flex>
    </Modal>
  )
}

const SelectTokenButton = ({ selected, onClick }: { selected: Currency; onClick: () => void }) => (
  <Button
    shadow="Up Small"
    _focus={{ shadow: 'Up Big' }}
    _hover={{ shadow: 'Up Big' }}
    _active={{ shadow: 'down' }}
    sx={{ ...(!selected?.symbol && { bgGradient: 'linear(to-r, primary.1, primary.2)' }) }}
    bgColor="blackAlpha.100"
    py={1.5}
    px={3}
    h="auto"
    w="min"
    rounded="full"
    fontWeight="bold"
    alignSelf="end"
    fontSize="lg"
    rightIcon={<DownIcon />}
    leftIcon={selected?.symbol && <CurrencyIcon size="xs" currency={selected} />}
    onClick={onClick}
  >
    {selected?.symbol || `Select a token`}
  </Button>
)

export const SelectCurrency = ({
  selected,
  onSelect,
}: {
  selected?: Currency
  onSelect: (token: Currency) => void
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <SelectTokenButton selected={selected} onClick={onOpen} />
      <SelectTokenModal isOpen={isOpen} onClose={onClose} selected={selected} onSelect={onSelect} />
    </>
  )
}
