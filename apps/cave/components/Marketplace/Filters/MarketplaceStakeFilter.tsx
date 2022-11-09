import { stakingPools } from '@concave/marketplace'
import { Box, Flex, gradientBorder, Image, SlideFade, Text, useDisclosure } from '@concave/ui'
import { FC } from 'react'
import { numberMask } from 'utils/numberMask'

type MakeplaceStakeFilterProps = {
  poolId: number
  days: number
  totalVAPR: number
  onToggleFilter: (poolId: number, type: 'add' | 'remove') => void
}
export const MakeplaceStakeFilter: FC<MakeplaceStakeFilterProps> = ({
  poolId,
  totalVAPR,
  onToggleFilter,
}) => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true })

  const onClick = () => {
    onToggle()
    const type: 'add' | 'remove' = isOpen ? 'remove' : 'add'
    onToggleFilter(poolId, type)
  }

  return (
    <Box
      as={SlideFade}
      in={true}
      offsetY="-80px"
      w={{ base: 'full', sm: 'auto' }}
      minW={{ base: '175px', sm: '49%', md: '24%' }}
    >
      <Flex
        height="full"
        rounded={'2xl'}
        minW={{ base: '175px', sm: '49%', md: '24%' }}
        py={2}
        pl={-2}
        pr={3}
        shadow="Up Small"
        fontSize={'sm'}
        cursor="pointer"
        sx={isOpen && { ...gradientBorder({ borderWidth: 2 }) }}
        onClick={onClick}
      >
        <Image
          my={'auto'}
          width={{
            base: '100px',
            sm: '80px',
          }}
          height={{
            base: '50px',
            sm: '40px',
          }}
          objectFit={`cover`}
          alt={`Image of stake ${stakingPools[poolId]?.days}`}
          src={`/assets/marketplace/${stakeImage[poolId]}`}
        />
        <Flex direction={'column'} justify="center" align="start" lineHeight={'18px'}>
          <Text fontSize={'sm'} color={'text.low'}>
            Stake period
          </Text>
          <Text fontWeight={'bold'}>{stakingPools[poolId]?.days} days</Text>
          <Text fontSize={'sm'} color={'text.low'}>
            APR
          </Text>
          <Text fontWeight={'bold'}>{numberMask(totalVAPR)}%</Text>
        </Flex>
      </Flex>
    </Box>
  )
}
const stakeImage = {
  0: '12mposition.png',
  1: '6mposition.png',
  2: '3mposition.png',
  3: '1mposition.png',
}
