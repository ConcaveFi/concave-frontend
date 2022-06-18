import { SettingsIcon } from '@chakra-ui/icons'
import { Flex, Text } from '@chakra-ui/react'
import { BondFilterButton } from './FilterButton'
import { BondFilterContainer } from './FilterContainer'

export const BondMarketplaceHeader = () => {
  return (
    <Flex
      width={'778px'}
      height="313px"
      shadow={'up'}
      apply="background.metal"
      rounded={'2xl'}
      px="8"
      pt={8}
      m="auto"
      direction={'column'}
    >
      <TitleContainer />
      <BondFilterContainer />
    </Flex>
  )
}
const TitleContainer = () => (
  <Flex width={'full'} height="193px" rounded={'inherit'} shadow="Down Medium">
    <Text
      m={'auto'}
      fontSize="64px"
      fontWeight={'bold'}
      textShadow="0px 0px 27px rgba(129, 179, 255, 0.31)"
    >
      Bonds Market
    </Text>
  </Flex>
)
