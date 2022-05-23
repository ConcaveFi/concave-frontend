import { Text, VStack, HStack, Flex, Button, Box } from '@concave/ui'
import { GasIcon, RedeemIcon, LinesIcon, DiscountIcon, PriceIcon, StakeIcon } from '@concave/icons'

interface SearchFilterCardProps {
  title: string
  icon: string
  hasFilter?: boolean
}

const SearchFilterCard = (props: SearchFilterCardProps) => {
  const { title, icon, hasFilter } = props
  const gradientBg = 'linear-gradient(43deg, #72639B 0%, #44B9DE 100%)'
  const defaultBackground = 'linear-gradient(209.18deg, #19394C 6.18%, #0A161F 146.11%)'
  const UpSmall = `0px 4px 4px rgba(0, 0, 0, 0.25), inset -1px 1px 2px rgba(128, 186, 255, 0.05)`

  return (
    <Flex
      background={!!hasFilter ? gradientBg : defaultBackground}
      width={83}
      height={53}
      rounded="2xl"
      transform={{ base: 'scale(0.9)', md: 'scale(1)' }}
    >
      <Flex
        direction={'column'}
        align="center"
        justify={'center'}
        gap={1}
        background={defaultBackground}
        rounded="2xl"
        m={'1px'}
        flex="1"
        shadow={'up'}
      >
        <Box
          position={'absolute'}
          height="full"
          width={'full'}
          bgImage={'/assets/textures/metal.png'}
          bgSize="20%"
          rounded={'2xl'}
        />
        <Flex gap={0} mt={1} alignItems="end">
          <>
            {icon === 'GasIcon' && <GasIcon viewBox="0 0 16 16" />}
            {icon === 'RedeemIcon' && <RedeemIcon viewBox="0 0 16 16" />}
            {icon === 'DiscountIcon' && <DiscountIcon viewBox="0 0 16 16" />}
            {icon === 'PriceIcon' && <PriceIcon viewBox="0 0 16 16" />}
            {icon === 'StakeIcon' && <StakeIcon viewBox="0 0 16 16" />}
          </>
          <LinesIcon viewBox="0 0 16 16" mr={1} />
        </Flex>
        <Text fontSize="xs" textAlign={'center'} color="text.low" fontWeight="medium">
          {title}
        </Text>
      </Flex>
    </Flex>
  )
}
export default SearchFilterCard
