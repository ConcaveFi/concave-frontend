import { useDisclosure } from '@chakra-ui/react'
import { CnvQuestionIcon, DownIcon } from '@concave/icons'
import {
  Heading,
  Spinner,
  UnorderedList,
  ListItem,
  Stack,
  Button,
  Modal,
  Text,
  Flex,
  Input,
  TokenIcon,
} from '@concave/ui'
import { Currency } from '@uniswap/sdk-core'
import { BASES_TO_CHECK_TRADES_AGAINST } from 'constants/routing'
import React, { useCallback, useState } from 'react'
import { chain } from 'wagmi'
import { Token, useTokenList } from './hooks/useTokenList'
import { useNativeCurrency } from './useSwap2'

const CommonTokens = ({
  selected,
  onSelect,
  currencies,
}: {
  selected: Currency
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
            leftIcon={
              <TokenIcon
                symbol={currency.symbol}
                address={currency.isToken ? currency.address : currency.symbol}
              />
            }
            shadow="Up Small"
            _hover={{ shadow: 'Up Small' }}
            _focus={{ shadow: 'Up Small' }}
            _active={{ shadow: 'down' }}
            _selected={{ shadow: 'Down Big', color: 'text.low' }}
            aria-selected={
              selected?.isToken && currency?.isToken
                ? currency.address === selected?.address
                : currency.symbol === selected?.symbol
            }
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

const TokenListItem = ({ token, onClick }) => (
  <ListItem
    cursor="pointer"
    _hover={{ opacity: 0.7 }}
    borderRadius="2xl"
    listStyleType="none"
    onClick={onClick}
  >
    <Stack direction="row" spacing={3} align="center">
      <TokenIcon h="35px" w="35px" symbol={token.symbol} address={token.address} />
      <Stack spacing={0} justify="center">
        <Text fontWeight="bold" fontSize="md">
          {token.symbol.toUpperCase()}
        </Text>
        <Text color="text.low" fontSize="sm">
          {token.name}
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
  const [search, setSearch] = useState('')
  const nativeCurrency = useNativeCurrency()
  const tokens = useTokenList()
  const selectAndClose = useCallback(
    (token: Token) => (onSelect(token), onClose()),
    [onSelect, onClose],
  )
  return (
    <Modal
      bluryOverlay
      title="Select a Token"
      isOpen={isOpen}
      onClose={onClose}
      bodyProps={{ gap: 4 }}
    >
      <CommonTokens
        currencies={[nativeCurrency, ...BASES_TO_CHECK_TRADES_AGAINST[chain.mainnet.id]]}
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
        {!tokens.isSuccess ? (
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
            {tokens.data.map((token) => (
              <TokenListItem
                key={token.address}
                token={token}
                onClick={() => selectAndClose(token)}
              />
            ))}
          </UnorderedList>
        )}
      </Flex>
    </Modal>
  )
}

const SelectTokenButton = ({ onClick }: { onClick: () => void }) => (
  <Button
    shadow="Up Small"
    bgGradient="linear(to-r, primary.1, primary.2)"
    py={1.5}
    px={3}
    h="auto"
    w="min"
    rounded="full"
    fontSize="lg"
    rightIcon={<DownIcon />}
    onClick={onClick}
  >
    Select a token
  </Button>
)

export const TokenSelect = ({
  selected,
  onSelect,
}: {
  selected?: Currency
  onSelect: (token: Currency) => void
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      {!selected?.symbol ? (
        <SelectTokenButton onClick={onOpen} />
      ) : (
        <Button
          shadow="Up Small"
          bgColor="blackAlpha.100"
          rounded="full"
          py={1.5}
          px={3}
          h="auto"
          alignSelf="end"
          w="min"
          fontWeight="bold"
          onClick={onOpen}
          leftIcon={
            <TokenIcon
              size="xs"
              symbol={selected.symbol}
              address={selected.isToken ? selected.address : selected.symbol}
            />
          }
          rightIcon={<DownIcon />}
        >
          {selected?.symbol}
        </Button>
      )}
      <SelectTokenModal isOpen={isOpen} onClose={onClose} selected={selected} onSelect={onSelect} />
    </>
  )
}
