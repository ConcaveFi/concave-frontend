import { Flex, FlexProps, Text } from '@chakra-ui/react'
import { BondFilterContainer } from './FilterContainer'

export const BondMarketplaceHeader: React.FC<FlexProps> = ({ ...props }) => {
  return (
    <Flex
      width={'778px'}
      height="313px"
      shadow={'up'}
      apply="background.metal"
      rounded={'40px'}
      px="8"
      pt={8}
      mx="auto"
      direction={'column'}
      {...props}
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
