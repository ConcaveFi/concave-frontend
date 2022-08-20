import { Flex } from '@concave/ui'
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
    <Flex direction={'column'} mt={0} align="start" rounded={'inherit'} width="full">
      <Flex
        mt={2}
        height={'auto'}
        justifyContent={'space-evenly'}
        flexWrap={'wrap'}
        width={'full'}
        gap={4}
        rounded={'inherit'}
        shadow="down"
        p={2}
      >
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
