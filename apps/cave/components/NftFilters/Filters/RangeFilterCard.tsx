import { Box, Button, Collapse, Flex, useDisclosure } from '@chakra-ui/react'
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

  const allInputsEmpty = !+min && !+max
  const onlyOneInputEnpty = (!+min && !!max) || (!!+min && !max)
  const maxHigherThanMin = +max >= +min
  const canApply = !allInputsEmpty && (maxHigherThanMin || onlyOneInputEnpty)

  const onApply = () => {
    if (!canApply) return
    onApplyFilter({ min: min && +min, max: max && +max })
    setHasFilter(true)
  }
  const onReset = () => {
    setMin('')
    setMax('')
    onResetFilter()
  }
  return (
    <Flex
      width={'260px'}
      height={'114px'}
      rounded={'lg'}
      apply="background.metalBrighter"
      border={'2px solid'}
      borderColor="text.low"
      direction={'column'}
      overflow="hidden"
      shadow={'up'}
      transition={'.4s all'}
    >
      <Flex height={'40px'} justify="center" width="full" align="center" pt={'10'} pb={5} gap={1}>
        <InputField onPressEnter={onApply} value={min} placeholder="From" onChangeValue={setMin} />
        <Box width={'10px'} height="4px" shadow={'down'} my="auto" />
        <InputField
          redOutline={!canApply}
          onPressEnter={onApply}
          value={max}
          placeholder="To"
          onChangeValue={setMax}
        />
      </Flex>
      {
        <Flex height={'60px'} align="center" justify={'center'} gap={2}>
          <ChooseButton
            onClick={() => {
              onReset()
              setHasFilter(false)
            }}
            title={'Reset'}
            backgroundType="default"
            width={'100px'}
            rounded="2xl"
            height="30px"
            borderBottomRadius={'2xl'}
          />
          <Button
            onClick={onApply}
            rounded="2xl"
            borderBottomRadius={'2xl'}
            title={'Apply'}
            width={'100px'}
            shadow={!canApply && 'Down Medium'}
            cursor={!canApply && 'default'}
            _hover={!canApply && {}}
            _focus={{}}
            _active={{}}
            height="30px"
            variant={canApply ? 'primary' : 'secondary'}
          >
            Apply
          </Button>
        </Flex>
      }
    </Flex>
  )
}

type InputField = {
  onChangeValue: (value: string) => void
  onPressEnter: VoidFunction
  value: number | string
  placeholder: string
  redOutline?: boolean
}
const InputField = ({
  onChangeValue,
  onPressEnter,
  placeholder,
  value,
  redOutline,
}: InputField) => {
  return (
    <Flex width={'100px'} height="30px" shadow={'down'} rounded="full" justify={'center'}>
      <NumericInput
        onKeyDown={(event) => event?.key === 'Enter' && onPressEnter()}
        value={value}
        textAlign={'center'}
        color={redOutline && 'red.300'}
        placeholder={placeholder}
        onValueChange={(e) => onChangeValue(e.value)}
      />
    </Flex>
  )
}
