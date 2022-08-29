import { CNV, Currency, DAI, NATIVE, PCNV, WETH9 } from '@concave/core'
import { QuestionIcon } from '@concave/icons'
import { Button, Flex, Heading, Modal, Skeleton } from '@concave/ui'
import { useQueryCurrencies } from 'components/AMM/hooks/useQueryCurrencies'
import { CurrencyIcon } from 'components/CurrencyIcon'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { defaultChains } from 'wagmi'
import { CurrencySelector, CurrencySelectorProps } from './CurrencySelector'
import { SearchableTokenList } from './SearchableTokenList'

const CommonTokens = ({
  selected,
  onSelect,
}: {
  selected?: Currency
  onSelect: (currency: Currency) => void
}) => {
  const networkId = useCurrentSupportedNetworkId()
  const currencies = [DAI, CNV, NATIVE, WETH9, PCNV].map((c) => c[networkId])
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

const LoadingCurrencySelector = () => (
  <Skeleton w="130px" h="30px" rounded="full" opacity={0.1} shadow="Up Small" />
)

export const SelectAMMCurrency: React.FC<CurrencySelectorProps> = ({ selected, onSelect }) => {
  const { isLoading } = useQueryCurrencies()

  if (isLoading) return <LoadingCurrencySelector />

  return (
    <CurrencySelector
      selected={selected}
      onSelect={onSelect}
      CurrencySelectorModal={AMMCurrencySelectorModal}
    />
  )
}

export default SelectAMMCurrency
