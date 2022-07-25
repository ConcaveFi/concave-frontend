import { CNV, Currency, DAI, NATIVE, USDC, WETH9 } from '@concave/core'
import { QuestionIcon } from '@concave/icons'
import { Button, Flex, Heading, Modal } from '@concave/ui'
import { CurrencyIcon } from 'components/CurrencyIcon'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { defaultChains } from 'wagmi'
import { CurrencySelector } from './CurrencySelector'
import { SearchableTokenList } from './SearchableTokenList'

const CommonTokens = ({
  selected,
  onSelect,
}: {
  selected?: Currency
  onSelect: (currency: Currency) => void
}) => {
  const networkId = useCurrentSupportedNetworkId()
  const currencies = [DAI, CNV, NATIVE, WETH9].map((c) => c[networkId])
  return GenericTokens({
    selected,
    currencies,
    label: 'Common pairs',
    onSelect,
  })
}

const GenericTokens = ({
  currencies,
  label,
  selected,
  onSelect,
}: {
  label: string
  selected?: Currency
  currencies: Currency[]
  onSelect: (currency: Currency) => void
}) => {
  return (
    <>
      <Heading size="sm">
        {label} <QuestionIcon w="22px" h="22px" ml={2} />
      </Heading>
      <Flex gap={2} wrap="wrap">
        {currencies.map((currency) => (
          <Button
            key={currency.isToken ? currency.address : currency.symbol}
            onClick={() => onSelect(currency)}
            leftIcon={<CurrencyIcon currency={currency} />}
            pr={3}
            aria-selected={!!selected?.equals(currency)}
            variant="select"
          >
            {defaultChains.findIndex((c) => c.id === currency.chainId) ? 't' : ''}
            {currency.symbol}
          </Button>
        ))}
      </Flex>
    </>
  )
}

const AMMCurrencySelectorModal = ({
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
  const selectAndClose = (token) => (onSelect(token), onClose())

  return (
    <Modal
      bluryOverlay
      title="Select a Token"
      size="md"
      isOpen={isOpen}
      onClose={onClose}
      bodyProps={{ gap: 4, w: ['350px', '420px'] }}
    >
      <CommonTokens selected={selected} onSelect={selectAndClose} />
      <SearchableTokenList selected={selected} onSelect={selectAndClose} />
    </Modal>
  )
}

const MarketTokens = ({
  selected,
  onSelect,
}: {
  selected?: Currency
  onSelect: (currency: Currency) => void
}) => {
  const networkId = useCurrentSupportedNetworkId()
  const currencies = [DAI, CNV, NATIVE, USDC].map((c) => c[networkId]).filter((c) => c)
  return GenericTokens({
    selected,
    currencies,
    label: 'Common pairs',
    onSelect,
  })
}

const MarketCurrencySelectorModal = ({
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
  const selectAndClose = (token) => (onSelect(token), onClose())

  return (
    <Modal
      bluryOverlay
      title="Select a Token"
      size="md"
      isOpen={isOpen}
      onClose={onClose}
      bodyProps={{ gap: 4, w: ['350px', '420px'] }}
    >
      <MarketTokens selected={selected} onSelect={selectAndClose} />
    </Modal>
  )
}

export const SelectAMMCurrency = ({
  selected,
  onSelect,
}: {
  selected?: Currency
  onSelect: (token: Currency) => void
}) => {
  return (
    <CurrencySelector
      selected={selected}
      onSelect={onSelect}
      CurrencySelectorModal={AMMCurrencySelectorModal}
    />
  )
}

export const SelectMarketCurrency = ({
  selected,
  onSelect,
}: {
  selected?: Currency
  onSelect: (token: Currency) => void
}) => {
  return (
    <CurrencySelector
      selected={selected}
      onSelect={onSelect}
      CurrencySelectorModal={MarketCurrencySelectorModal}
    />
  )
}
