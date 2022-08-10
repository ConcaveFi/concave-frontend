import { Search2Icon } from '@concave/icons'
import { Flex, NumericInput } from '@concave/ui'
import { FC, useState } from 'react'

type TokenIdSearchBarProps = { onApplyFilter: (id: number) => void }
export const TokenIdSearchBar: FC<TokenIdSearchBarProps> = ({ onApplyFilter }) => {
  const [value, setValue] = useState('')
  return (
    <Flex align={'center'} w="30%" maxH="30px" rounded={'2xl'} shadow="down" px={4} gap={2}>
      <Search2Icon color={'text.low'} />
      <NumericInput
        thousandSeparator={false}
        value={value}
        onValueChange={(event) => setValue(event.value)}
        onKeyDown={(event) => {
          if (event.code !== 'Enter') return
          onApplyFilter(value ? Number(value) : undefined)
        }}
      />
    </Flex>
  )
}
