import { Text, VStack, HStack, Flex, Button } from '@concave/ui'
import { GasIcon, RedeemIcon, LinesIcon, DiscountIcon, PriceIcon, StakeIcon } from '@concave/icons'

interface SearchFilterCardProps {
  title: string
  icon: string
}

const SearchFilterCard = (props: SearchFilterCardProps) => {
  const { title, icon } = props
  return (
    <Flex
      justify="center"
      align={'center'}
      w="80px"
      h="53px"
      background="gray.400"
      overflowY={'auto'}
      maxHeight={'500px'}
      borderRadius="16px"
      overflow={'hidden'}
      css={{
        boxShadow:
          '0px 4px 4px 0px rgba(0, 0, 0, 0.25) , inset -1px 1px 2px rgba(128, 186, 255, 0.05)',
        background: 'rgba(113, 113, 113, 0.01)',
      }}
      zIndex={2}
      shadow="up"
    >
      <VStack>
        <HStack>
          <>
            {icon === 'GasIcon' && <GasIcon viewBox="0 0 16 16" />}
            {icon === 'RedeemIcon' && <RedeemIcon viewBox="0 0 16 16" />}
            {icon === 'DiscountIcon' && <DiscountIcon viewBox="0 0 16 16" />}
            {icon === 'PriceIcon' && <PriceIcon viewBox="0 0 16 16" />}
            {icon === 'StakeIcon' && <StakeIcon viewBox="0 0 16 16" />}
          </>
          <LinesIcon viewBox="0 0 16 16" mr={1} />
        </HStack>
        <Text fontSize="xs" color="text.low" fontWeight="medium">
          {title}
        </Text>
      </VStack>
    </Flex>
  )
}
export default SearchFilterCard
