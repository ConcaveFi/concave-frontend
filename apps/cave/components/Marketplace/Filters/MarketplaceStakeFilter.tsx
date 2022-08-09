import { stakingPools } from '@concave/marketplace'
import { Flex, gradientBorder, Image, Text, useDisclosure } from '@concave/ui'
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
    <Flex
      bg="linear-gradient(265.73deg, #364E6A 0%, #1C2E3E 100%)"
      flex={1}
      height="full"
      rounded={'2xl'}
      shadow="up"
      fontSize={'sm'}
      cursor="pointer"
      sx={isOpen && { ...gradientBorder({ borderWidth: 2 }) }}
      onClick={onClick}
    >
      <Image
        my={'auto'}
        width={'auto'}
        height={'90px'}
        alt={`Image of stake ${stakingPools[poolId]?.days}`}
        src={`/assets/marketplace/${stakeImage[poolId]}`}
      />
      <Flex ml={-1} direction={'column'} justify="center" align="start" lineHeight={'18px'}>
        <Text color={'text.low'}>Stake period</Text>
        <Text fontWeight={'bold'}>{stakingPools[poolId]?.days} days</Text>
        <Text fontSize={'sm'} color={'text.low'}>
          APR
        </Text>
        <Text fontWeight={'bold'}>{numberMask(totalVAPR)}%</Text>
      </Flex>
    </Flex>
  )
}
const stakeImage = {
  0: '12mposition.png',
  1: '6mposition.png',
  2: '3mposition.png',
  3: '1mposition.png',
}
