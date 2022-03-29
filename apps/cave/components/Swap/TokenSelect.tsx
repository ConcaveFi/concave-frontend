import { MenuButton, useDisclosure } from '@chakra-ui/react'
import { CnvQuestionIcon, DownIcon } from '@concave/icons'
import {
  Heading,
  Spinner,
  UnorderedList,
  ListItem,
  Stack,
  Box,
  Button,
  Menu,
  Modal,
  Text,
  Flex,
  FlexProps,
  Input,
  TokenIcon,
} from '@concave/ui'
import { BASES_TO_CHECK_TRADES_AGAINST } from 'constants/routing'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { chain } from 'wagmi'

export type Token = {
  address: string
  name: string
  symbol: string
  decimals: number
  logoURI: string
}

const CommonPairs = ({
  selected,
  onSelect,
}: {
  selected: Token
  onSelect: (token: Partial<Token>) => void
}) => {
  const tokens = BASES_TO_CHECK_TRADES_AGAINST[chain.mainnet.id]
  return (
    <>
      <Heading size="sm">
        Common pairs <CnvQuestionIcon w="22px" h="22px" ml={2} />
      </Heading>
      <Flex gap={2} wrap="wrap">
        {tokens.map((token) => (
          <Button
            key={token.address}
            onClick={() => onSelect(token)}
            rounded="full"
            leftIcon={<TokenIcon {...token} />}
            shadow="Up Small"
            _hover={{ shadow: 'Up Small' }}
            _focus={{ shadow: 'Up Small' }}
            _active={{ shadow: 'down' }}
            _selected={{ shadow: 'Down Big', color: 'text.low' }}
            aria-selected={selected.address === token.address}
            p={1}
            pr={3}
            fontSize="sm"
          >
            {token.symbol.toUpperCase()}
          </Button>
        ))}
      </Flex>
    </>
  )
}

const TokenListItem = ({ symbol, logoURI, address, name, onClick }) => (
  <ListItem
    cursor="pointer"
    _hover={{ opacity: 0.7 }}
    borderRadius="2xl"
    listStyleType="none"
    onClick={onClick}
  >
    <Stack direction="row" spacing={3} align="center">
      <TokenIcon h="35px" w="35px" symbol={symbol} logoURI={logoURI} address={address} />
      <Stack spacing={0} justify="center">
        <Text fontWeight="bold" fontSize="md">
          {symbol.toUpperCase()}
        </Text>
        <Text color="text.low" fontSize="sm">
          {name}
        </Text>
      </Stack>
    </Stack>
  </ListItem>
)

const useTokenList = () =>
  useQuery('token-list', () =>
    fetch('https://gateway.ipfs.io/ipns/tokens.uniswap.org')
      .then((d) => d.json())
      .then((l) => l.tokens),
  )

export const SelectTokenModal = ({
  selected,
  onSelect,
  isOpen,
  onClose,
}: {
  selected: Token
  onSelect: (token: Token) => void
  isOpen: boolean
  onClose: () => void
}) => {
  const [search, setSearch] = useState('')
  const tokens = useTokenList()

  return (
    <Modal
      bluryOverlay
      title="Select a Token"
      isOpen={isOpen}
      onClose={onClose}
      bodyProps={{ gap: 4 }}
    >
      <CommonPairs selected={selected} onSelect={onSelect} />
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
              <TokenListItem key={token.address} {...token} />
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
    py={0}
    px={3}
    h={8}
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
  selected?: Token
  onSelect: (token: Token) => void
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Menu placement="bottom-end">
      {!selected?.symbol ? (
        <SelectTokenButton onClick={onOpen} />
      ) : (
        <MenuButton
          as={Button}
          shadow="Up Small"
          _focus={{ shadow: 'Up Small' }}
          bgColor="blackAlpha.100"
          rounded="full"
          py={1}
          px={2}
          h={8}
          height="auto"
          fontWeight="semibold"
          onClick={onOpen}
          leftIcon={<TokenIcon size="xs" symbol={selected.symbol} logoURI={selected.logoURI} />}
          rightIcon={<DownIcon />}
        >
          {selected?.symbol}
        </MenuButton>
      )}
      <SelectTokenModal isOpen={isOpen} onClose={onClose} selected={selected} onSelect={onSelect} />
    </Menu>
  )
}
