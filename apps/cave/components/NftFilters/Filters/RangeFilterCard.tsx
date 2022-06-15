import { Box, Collapse, Flex } from '@chakra-ui/react'
import { NumericInput } from '@concave/ui'
import { ChooseButton } from 'components/Marketplace/ChooseButton'
import { useState } from 'react'

type RangeFilterCard = {
  onApplyFilter: () => void
  onResetFilter: () => void
}

export const RangeFilterCard = () => {
  const [min, setMin] = useState<number>(0)
  const [max, setMax] = useState<number>(0)
  const isOpen = !!min && !!max
  return (
    <Flex
      width={'260px'}
      height={isOpen ? '114px' : '80px'}
      rounded={'lg'}
      border="2px solid"
      bg={'linear-gradient(265.73deg, #364E6A 0%, #1C2E3E 100%)'}
      borderColor={'text.accent'}
      direction={'column'}
      overflow="hidden"
      transition={'.4s all'}
    >
      <Flex height={'40px'} justify="center" width="full" align="center" py={'10'} gap={1}>
        <InputField placeholder="From" onChangeValue={setMin} />
        <Box width={'10px'} height="4px" shadow={'down'} my="auto" />
        <InputField placeholder="To" onChangeValue={setMax} />
      </Flex>
      <Flex height={'60px'} align="end" justify={'center'} gap={2}>
        <ChooseButton onClick={() => {}} title={'Reset'} backgroundType="default" width={'100px'} />
        <ChooseButton onClick={() => {}} title={'Apply'} backgroundType="blue" width={'100px'} />
      </Flex>
    </Flex>
  )
}

type InputField = {
  onChangeValue: (value: number) => void
  placeholder: string
}
const InputField = ({ onChangeValue, placeholder }: InputField) => {
  return (
    <Flex width={'100px'} height="30px" shadow={'down'} rounded="full" justify={'center'}>
      <NumericInput
        textAlign={'center'}
        placeholder={placeholder}
        onValueChange={(e) => onChangeValue(+e.value)}
      />
    </Flex>
  )
}
