import { Box, Flex, Input, Text } from '@concave/ui'
import { useEffect, useState } from 'react'
import ChooseButton from './ChooseButton'
import ToggleButton from './ToggleButton'

export default function PriceCard() {
  const toggleButons = [{ title: 'None' }, { title: 'Lowest First' }, { title: 'Highest First' }]

  const [currentButton, setCurrentButton] = useState(0)
  const [toggleButtonsComp, setToggleButonsComp] = useState(null)

  const onChange = (index: number) => setCurrentButton(index)

  useEffect(() => {
    setToggleButonsComp(
      toggleButons.map((button, index) => {
        return (
          <ToggleButton
            key={index}
            title={button.title}
            onClick={() => onChange(index)}
            active={index === currentButton}
          />
        )
      }),
    )
  }, [currentButton])

  return (
    <Box
      height={198}
      width={400}
      rounded="2xl"
      background={'linear-gradient(265.73deg, #274C63 0%, #182F3E 100%)'}
      shadow="up"
    >
      <Text
        pt={4}
        pb={2}
        width="full"
        textAlign={'start'}
        pl="12"
        fontSize={14}
        fontWeight={700}
        textColor={'#5F7A99'}
      >
        Sort:
      </Text>
      <Flex justifyContent={'center'} gap="2">
        {toggleButtonsComp}
      </Flex>
      <Flex mt={6} justifyContent={'start'} alignItems="center">
        <Text
          pr={4}
          textAlign={'center'}
          pl="12"
          fontSize={14}
          fontWeight={700}
          textColor={'#5F7A99'}
        >
          CNV Price Range :
        </Text>
        <Flex gap={1} alignItems="center">
          <Flex justifyContent="center" alignItems={'center'}>
            <Text position={'absolute'}>from</Text>
            <Input width="90px" height="30px" borderRadius={'2xl'} />
          </Flex>
          <Box width={2.5} height={1} shadow="down"></Box>
          <Flex justifyContent="center" alignItems={'center'}>
            <Text position={'absolute'}>to</Text>
            <Input width="90px" height="30px" borderRadius={'2xl'} />
          </Flex>
        </Flex>
      </Flex>
      <Flex height={'65px'} justifyContent="center" alignItems={'end'} gap="2">
        <ChooseButton title="Reset" />
        <ChooseButton title="Apply" backgroundType="blue" />
      </Flex>
    </Box>
  )
}
