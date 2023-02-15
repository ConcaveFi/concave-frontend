import { Currency } from '@concave/core'
import { ButtonProps, Skeleton, useDisclosure } from '@concave/ui'
import { FC } from 'react'
import { SelectCurrencyButton } from './SelectCurrencyButton'

export type CurrencySelectorComponent = FC<{ selected: Currency; onSelect: (c: Currency) => void }>
export type CurrencySelectorType = {
  selected?: Currency
  onSelect: (token: Currency) => void
  CurrencySelectorModal?: FC<{
    selected: Currency
    onSelect: (token: Currency) => void
    isOpen: boolean
    onClose: () => void
  }>
}
type CurrencySelectorButtonType = Omit<ButtonProps, keyof CurrencySelectorType>

export const CurrencySelector = ({
  selected,
  onSelect,
  CurrencySelectorModal,
  ...buttonProps
}: CurrencySelectorType & CurrencySelectorButtonType) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <SelectCurrencyButton
        {...buttonProps}
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
