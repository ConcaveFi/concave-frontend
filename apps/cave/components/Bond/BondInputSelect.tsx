import { Input, Spinner, UnorderedList, useDisclosure } from '@chakra-ui/react'
import { CnvQuestionIcon, DownIcon } from '@concave/icons'
import { Button, Flex, Heading, ListItem, Modal, Stack, Text } from '@concave/ui'
import { CurrencyIcon } from 'components/CurrencyIcon'
import { ROPSTEN_CNV, ROPSTEN_DAI } from 'constants/ropstenTokens'
import { CNV, DAI } from 'constants/tokens'
import { Currency } from 'gemswap-sdk'
import React, { useCallback, useState } from 'react'
import { chain, useNetwork } from 'wagmi'
import { useTokenList } from '../Swap/hooks/useTokenList'

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
      <CurrencyIcon h="35px" w="35px" currency={token} />
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
  const currentChain = network?.chain
  const { data: tokens, isLoading, isSuccess } = useTokenList()
  const selectAndClose = useCallback(
    (token: Currency) => (onSelect(token), onClose()),
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
    leftIcon={selected?.symbol && <CurrencyIcon size="sm" currency={selected} />}
    onClick={onClick}
  >
    {selected?.symbol || `Select a token`}
  </Button>
)

export const BondInputSelect = ({ selected }: { selected?: Currency }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <SelectTokenButton selected={selected} onClick={onOpen} />
    </>
  )
}
