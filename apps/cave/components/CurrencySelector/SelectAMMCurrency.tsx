import { CNV, Currency, DAI, NATIVE, WETH9 } from '@concave/gemswap-sdk'
import { CnvQuestionIcon } from '@concave/icons'
import { Button, Flex, Heading, Modal } from '@concave/ui'
import { CurrencyIcon } from 'components/CurrencyIcon'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import React from 'react'
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
            leftIcon={<CurrencyIcon currency={currency} />}
            pr={3}
            aria-selected={!!selected?.equals(currency)}
            variant="select"
          >
            {currency.symbol.toUpperCase()}
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
