import { Box, Collapse, Flex } from '@chakra-ui/react'
import { gradientBorder, NumericInput } from '@concave/ui'
import { ChooseButton } from 'components/Marketplace/ChooseButton'
import { useState } from 'react'
import { RangeFilter } from './hooks/useFilterByRange'

type RangeFilterCard = {
  onApplyFilter: (rangeFilter: RangeFilter) => void
  onResetFilter: () => void
}

export const RangeFilterCard = ({ onApplyFilter, onResetFilter }: RangeFilterCard) => {
  const [min, setMin] = useState<string>()
  const [max, setMax] = useState<string>()
  const [hasFilter, setHasFilter] = useState(false)
  const isOpen = !!min || !!max || hasFilter
  const onReset = () => {
    setMin('')
    setMax('')
    onResetFilter()
  }
  return (
    <Flex
      width={'260px'}
      height={isOpen ? '114px' : '80px'}
      rounded={'lg'}
      apply="background.metalBrighter"
      direction={'column'}
      overflow="hidden"
      shadow={'up'}
      transition={'.4s all'}
    >
      <Flex height={'40px'} justify="center" width="full" align="center" py={'10'} gap={1}>
        <InputField value={min} placeholder="From" onChangeValue={setMin} />
        <Box width={'10px'} height="4px" shadow={'down'} my="auto" />
        <InputField value={max} placeholder="To" onChangeValue={setMax} />
      </Flex>
      <Flex height={'60px'} align="end" mb={'2px'} justify={'center'} gap={2}>
        <ChooseButton
          onClick={() => {
            onReset()
            setHasFilter(false)
          }}
          title={'Reset'}
          backgroundType="default"
          width={'100px'}
        />
        <ChooseButton
          onClick={() => {
            onApplyFilter({ min: Math.min(+min, +max), max: Math.max(+min, +max) })
            setHasFilter(true)
          }}
          title={'Apply'}
          backgroundType="blue"
          width={'100px'}
        />
      </Flex>
    </Flex>
  )
}

type InputField = {
  onChangeValue: (value: string) => void
  value: number | string
  placeholder: string
}
const InputField = ({ onChangeValue, placeholder, value }: InputField) => {
  return (
    <Flex width={'100px'} height="30px" shadow={'down'} rounded="full" justify={'center'}>
      <NumericInput
        value={value}
        textAlign={'center'}
        placeholder={placeholder}
        onValueChange={(e) => onChangeValue(e.value)}
      />
    </Flex>
  )
}
