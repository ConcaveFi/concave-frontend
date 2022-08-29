import { Currency } from '@concave/core'
import { Skeleton, useDisclosure } from '@concave/ui'
import { FC } from 'react'
import { SelectCurrencyButton } from './SelectCurrencyButton'

export type CurrencySelectorProps = { selected?: Currency; onSelect: (c: Currency) => void }
export const CurrencySelector = ({
  selected,
  onSelect,
  CurrencySelectorModal,
}: CurrencySelectorProps & {
  CurrencySelectorModal?: FC<{
    selected: Currency
    onSelect: (token: Currency) => void
    isOpen: boolean
    onClose: () => void
  }>
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <SelectCurrencyButton
        isDisabled={!CurrencySelectorModal}
        selected={selected}
        onClick={onOpen}
      />
      {CurrencySelectorModal && (
        <CurrencySelectorModal
          isOpen={isOpen}
          onClose={onClose}
          selected={selected}
          onSelect={onSelect}
        />
      )}
    </>
  )
}

export const LoadingCurrencySelector = () => (
  <Skeleton w="130px" h="30px" rounded="full" opacity={0.1} shadow="Up Small" />
)
