import { Flex, Text } from '@concave/ui'
import { useLiquidStakeData } from 'components/LiquidStaking/hooks/useLiquidStakeData'
import { StakePoolFilterEnum } from 'components/NftFilters/Filters/hooks/useFilterByStakePool'
import { MakeplaceStakeFilter } from '../Filters/MarketplaceStakeFilter'

export function MarketplaceFilterContainer({
  stakeFilters,
  onChangeStakeFilters,
}: {
  stakeFilters: StakePoolFilterEnum[]
  onChangeStakeFilters: (stakeFilters: StakePoolFilterEnum[]) => void
}) {
  const { stakeData } = useLiquidStakeData()
  const onChangeFilters = (changedFilder, type) => {
    if (type === 'add') {
      onChangeStakeFilters([...stakeFilters, changedFilder])
    } else if (type === 'remove') {
      onChangeStakeFilters(stakeFilters.filter((filter) => filter !== changedFilder))
    }
  }
  return (
    <Flex direction={'column'} mt={8} align="start" rounded={'inherit'} width="full">
      <Text fontWeight={'bold'} fontSize="lg" color="text.low">
        Filter by:
      </Text>
      <Flex mt={2} height={'100px'} width="full" rounded={'inherit'} shadow="down" p={2} gap={2}>
        {stakeData?.map((stakeData) => (
          <MakeplaceStakeFilter
            key={stakeData.poolId}
            {...stakeData}
            onToggleFilter={onChangeFilters}
          />
        ))}
      </Flex>
    </Flex>
  )
}
