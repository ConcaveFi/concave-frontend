import { Box, Flex, Input, Text } from '@concave/ui'
import ChooseButton from 'components/Marketplace/ChooseButton'
import { SortType } from 'components/Marketplace/MarketplaceSearchCard'
import ToggleButton from 'components/Marketplace/ToggleButton'
import { printIntrospectionSchema } from 'graphql'
import { useEffect, useState } from 'react'



  const UserListPositionCard = (props) => {
  const toggleButons = [{ title: 'None' }, { title: 'Lowest First' }, { title: 'Highest First' }]

  const currentButton = props.activeButton
  const [toggleButtonsComp, setToggleButonsComp] = useState(null)

  // INPUT 1
  const [fromValue, setFromValue] = useState('')
  const emptyFrom = fromValue === ''
  const fromLabel = emptyFrom ? 'From' : ''

  // INPUT 2
  const [toValue, setToValue] = useState('')


  const onApply = () => {
    const higherNumber = fromValue > toValue ? +fromValue : +toValue
    const smallerNumber = fromValue < toValue ? +fromValue : +toValue
    props.onApply(smallerNumber, higherNumber)
  }
  const onReset = () => {
    setFromValue('')
    setToValue('')
    props.onReset()
  }

  return (
    <Box
      height="fit"
      width={320}
      rounded="2xl"
      background={'linear-gradient(265.73deg, #274C63 0%, #182F3E 100%)'}
      shadow="up"
    >
      <Flex mt={6} alignItems="center" position="relative">
        <Text
          pr={4}
          textAlign={'center'}
          pl="12"
          fontSize={14}
          fontWeight={700}
          textColor={'#5F7A99'}
        >
          Set Expiration Date:
        </Text>
        <Flex gap={1} alignItems="center">
          <Box width={2.5} height={1} shadow="down"></Box>
          <Flex justifyContent="center" alignItems={'center'}>
            <Input
              value={toValue}
              width="90px"
              height="30px"
              borderRadius={'2xl'}
            />
          </Flex>
        </Flex>
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
          Set Listing Price:
        </Text>
        <Flex gap={1} alignItems="center">
          <Box width={2.5} height={1} shadow="down"></Box>
          <Flex justifyContent="center" alignItems={'center'}>
            <Input
              value={toValue}
              width="90px"
              height="30px"
              borderRadius={'2xl'}
            />
          </Flex>
        </Flex>
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
          Current Value:
        </Text>
        <Flex gap={1} alignItems="center">
          <Box width={2.5} height={1} shadow="down"></Box>
          <Flex justifyContent="center" alignItems={'center'}>
            <Input
              value="634 CNV"
              width="90px"
              height="30px"
              borderRadius={'2xl'}
            />
          </Flex>
        </Flex>
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
          Discount:
        </Text>
        <Flex gap={1} alignItems="center">
          <Box width={2.5} height={1} shadow="down"></Box>
          <Flex justifyContent="center" alignItems={'center'}>
            <Input
              value="2.4%"
              width="90px"
              height="30px"
              borderRadius={'2xl'}
            />
          </Flex>
        </Flex>
      </Flex>
      <Flex height={'65px'} justifyContent="center" alignItems={'end'} gap="2">
        <ChooseButton onClick={onApply} title="List For Sale" backgroundType="blue" />
      </Flex>
    </Box>
  )
  }




export default UserListPositionCard