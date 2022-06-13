import { DiscountIcon, GasIcon, LinesIcon, PriceIcon, RedeemIcon, StakeIcon } from '@concave/icons'
import { Box, Flex, Text } from '@concave/ui'

interface SearchFilterCardProps {
  title: string
  icon: string
  hasFilter?: boolean
}

export const SearchFilterCard = (props: SearchFilterCardProps) => {
  const { title, icon, hasFilter } = props

  return (
    <Flex
      background={
        !!hasFilter ? 'stroke.primary' : 'linear-gradient(265.73deg, #274C63 0%, #182F3E 100%)'
      }
      width={90}
      height={53}
      rounded="2xl"
      transform={{ base: 'scale(0.9)', md: 'scale(1)' }}
    >
      <Flex
        direction={'column'}
        align="center"
        justify={'center'}
        gap={1}
        background={'linear-gradient(265.73deg, #274C63 0%, #182F3E 100%)'}
        rounded="2xl"
        m={'1px'}
        flex="1"
        shadow={{ base: 'Up Small', md: 'up' }}
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
