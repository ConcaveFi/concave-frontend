import { Input, Spinner, UnorderedList, useDisclosure } from '@chakra-ui/react'
import { CnvQuestionIcon, DownIcon } from '@concave/icons'
import { Button, Flex, Heading, ListItem, Modal, Stack, Text, TokenIcon } from '@concave/ui'
import { ROPSTEN_CNV, ROPSTEN_DAI } from 'constants/ropstenTokens'
import { Token } from 'constants/routing'
import { CNV, DAI } from 'constants/tokens'
import { Currency as UniswapCurrency } from 'gemswap-sdk'
import React, { useCallback, useState } from 'react'
import { chain, useNetwork } from 'wagmi'
import { useTokenList } from './hooks/useTokenList'
import { useNativeCurrency } from './useSwap2'

type Currency = UniswapCurrency & Pick<Token, 'logoURI'>

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
            {currency.name.toUpperCase()}
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
  const [{ data: network, loading }] = useNetwork()
  const [search, setSearch] = useState('')
  const nativeCurrency = useNativeCurrency()
  const currentChain = network?.chain
  const { data: tokens, isLoading, isSuccess } = useTokenList(currentChain?.name)
  const selectAndClose = useCallback(
    (token: Token) => (onSelect(token), onClose()),
    [onSelect, onClose],
  )
  return (
    <Modal
      bluryOverlay
      title="Select a Token"
      size={'sm'}
      isOpen={isOpen}
      onClose={onClose}
      bodyProps={{ gap: 4, w: '350px' }}
    >
      <CommonTokens
        currencies={currentChain?.id === chain.ropsten.id ? [ROPSTEN_DAI, ROPSTEN_CNV] : [DAI, CNV]} //[nativeCurrency, ...BASES_TO_CHECK_TRADES_AGAINST[chainId]]}
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
        {!isSuccess ? (
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
            {tokens.map((token) => (
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

const SelectTokenButton = ({ selected, onClick }: { selected: Currency; onClick: () => void }) => (
  <Button
    shadow="Up Small"
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
    leftIcon={
      selected?.symbol && (
        <TokenIcon
          size="sm"
          symbol={selected.symbol}
          address={selected.isToken ? selected.address : selected.symbol}
        />
      )
    }
    onClick={onClick}
  >
    {selected?.symbol || `Select a token`}
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
      <SelectTokenButton selected={selected} onClick={onOpen} />
      <SelectTokenModal isOpen={isOpen} onClose={onClose} selected={selected} onSelect={onSelect} />
    </>
  )
}
