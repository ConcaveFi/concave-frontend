import { Currency } from '@concave/core'
import { useDisclosure } from '@concave/ui'
import React, { FC } from 'react'
import { SelectCurrencyButton } from './SelectCurrencyButton'

export type CurrencySelectorComponent = FC<{ selected: Currency; onSelect: (c: Currency) => void }>
export const CurrencySelector = ({
  selected,
  onSelect,
  CurrencySelectorModal,
}: {
  selected?: Currency
  onSelect: (token: Currency) => void
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
