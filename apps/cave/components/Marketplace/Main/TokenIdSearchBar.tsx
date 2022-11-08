import { CloseIcon, Search2Icon } from '@concave/icons'
import { Flex, NumericInput, Tooltip, useBreakpointValue } from '@concave/ui'
import { FC, useState } from 'react'

type TokenIdSearchBarProps = { onApplyFilter: (id: number) => void }
export const TokenIdSearchBar: FC<TokenIdSearchBarProps> = ({ onApplyFilter }) => {
  const [value, setValue] = useState('')
  const [appliedNumber, setAppliedNumber] = useState('')
  const hasAppliedFilter = appliedNumber !== ''

  const hideFilters = useBreakpointValue({ base: true, md: false, xl: false, '2xl': false })
  if (hideFilters) {
    return <></>
  }

  return (
    <Flex align={'center'} px={4} py={2} rounded={'2xl'} w={'160px'} shadow="down">
      <Search2Icon color={'text.low'} mr={2} />
      <NumericInput
        thousandSeparator={false}
        value={value}
        onValueChange={(event) => setValue(event.value)}
        placeholder={hasAppliedFilter ? appliedNumber : 'Enter token id'}
        onKeyDown={(event) => {
          if (event.code !== 'Enter') return
          onApplyFilter(value ? Number(value) : undefined)
          setAppliedNumber(value)
        }}
      />
      {hasAppliedFilter && (
        <Tooltip label="Clear filter">
          <CloseIcon
            color={'text.low'}
            cursor="pointer"
            onClick={() => {
              onApplyFilter(undefined)
              setAppliedNumber('')
              setValue('')
            }}
          />
        </Tooltip>
      )}
    </Flex>
  )
}
