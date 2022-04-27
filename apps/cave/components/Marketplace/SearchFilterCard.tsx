import { Text, VStack, HStack, Flex, Button } from '@concave/ui'
import { GasIcon, RedeemIcon, LinesIcon, DiscountIcon, PriceIcon, StakeIcon } from '@concave/icons'

interface SearchFilterCardProps {
  title: string
  icon: string
  hasFilter?: boolean
}

const SearchFilterCard = (props: SearchFilterCardProps) => {
  const { title, icon, hasFilter } = props
  const gradientBg = 'linear-gradient(43deg, #72639B 0%, #44B9DE 100%)'
  const defaultBackground = 'linear-gradient(200.73deg, #274C63 00%, #182F3E 100%)'
  const UpSmall = `0px 4px 4px rgba(0, 0, 0, 0.25), inset -1px 1px 2px rgba(128, 186, 255, 0.05)`

  return (
    <Flex
      background={!!hasFilter ? gradientBg : defaultBackground}
      width={83}
      height={53}
      rounded="2xl"
      shadow={UpSmall}
    >
      <VStack gap={0} background={defaultBackground} rounded="2xl" m={'2px'} flex="1">
        <HStack gap={0} mt={1} alignItems="end">
          <>
            {icon === 'GasIcon' && <GasIcon viewBox="0 0 16 16" />}
            {icon === 'RedeemIcon' && <RedeemIcon viewBox="0 0 16 16" />}
            {icon === 'DiscountIcon' && <DiscountIcon viewBox="0 0 16 16" />}
            {icon === 'PriceIcon' && <PriceIcon viewBox="0 0 16 16" />}
            {icon === 'StakeIcon' && <StakeIcon viewBox="0 0 16 16" />}
          </>
          <LinesIcon viewBox="0 0 16 16" mr={1} />
        </HStack>
        <Text fontSize="xs" textAlign={'center'} color="text.low" fontWeight="medium">
          {title}
        </Text>
      </VStack>
    </Flex>
    // <Flex
    //   m={'2px'}
    //   justify="center"
    //   align={'center'}
    //   w="80px"
    //   h="53px"
    //   overflowY={'auto'}
    //   maxHeight={'500px'}
    //   borderRadius="16px"
    //   overflow={'hidden'}
    //   css={{
    //     boxShadow:
    //       '0px 4px 4px 0px rgba(0, 0, 0, 0.25) , inset -1px 1px 2px rgba(128, 186, 255, 0.05)',
    //     background: 'rgba(113, 113, 113, 0.01)',
    //   }}
    //   zIndex={2}
    //   shadow="up"
    // >
    //   <VStack>
    //     <HStack>
    //       <>
    //         {icon === 'GasIcon' && <GasIcon viewBox="0 0 16 16" />}
    //         {icon === 'RedeemIcon' && <RedeemIcon viewBox="0 0 16 16" />}
    //         {icon === 'DiscountIcon' && <DiscountIcon viewBox="0 0 16 16" />}
    //         {icon === 'PriceIcon' && <PriceIcon viewBox="0 0 16 16" />}
    //         {icon === 'StakeIcon' && <StakeIcon viewBox="0 0 16 16" />}
    //       </>
    //       <LinesIcon viewBox="0 0 16 16" mr={1} />
    //     </HStack>
    //     <Text fontSize="xs" color="text.low" fontWeight="medium">
    //       {title}
    //     </Text>
    //   </VStack>
    // </Flex>
  )
}
export default SearchFilterCard
