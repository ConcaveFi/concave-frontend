import { CNV, Currency, DAI, FRAX, USDC } from '@concave/core'
import { Button, Flex, Heading, Modal } from '@concave/ui'
import { CurrencyIcon } from 'components/CurrencyIcon'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { defaultChains } from 'wagmi'
import { CurrencySelector } from './CurrencySelector'

const FaucetCurrencySelectorModal = ({
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
  const networkId = useCurrentSupportedNetworkId()
  const currencies = [DAI, CNV, USDC, FRAX].map((c) => c[networkId]).filter(Boolean)

  return (
    <Modal
      bluryOverlay
      title="Mintable tokens"
      size="md"
      isOpen={isOpen}
      onClose={onClose}
      bodyProps={{ gap: 4, w: ['350px'] }}
    >
      <Heading size="sm">Select a token to mint</Heading>
      <Flex gap={2} wrap="wrap">
        {currencies.map((currency) => (
          <Button
            key={currency.isToken ? currency.address : currency.symbol}
            onClick={() => selectAndClose(currency)}
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
    </Modal>
  )
}

export const SelectFaucetCurrency = ({
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
      CurrencySelectorModal={FaucetCurrencySelectorModal}
    />
  )
}
