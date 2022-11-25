import { Flex } from '@concave/ui'
import { useLiquidStakeData } from 'components/LiquidStaking/hooks/useLiquidStakeData'
import { StakePoolFilterEnum } from 'components/NftFilters/Filters/hooks/useFilterByStakePool'
import { MakeplaceStakeFilter } from '../Filters/MarketplaceStakeFilter'

interface FilterContainerProps {
  stakeFilters: StakePoolFilterEnum[]
  onChangeStakeFilters: (stakeFilters: StakePoolFilterEnum[]) => void
}

export function MarketplaceFilterContainer(props: FilterContainerProps) {
  const { onChangeStakeFilters, stakeFilters } = props
  const { stakeData } = useLiquidStakeData()

  function onChangeFilters(changedFilder, type) {
    switch (type) {
      case 'add': {
        onChangeStakeFilters([...stakeFilters, changedFilder])
      }
      case 'remove': {
        onChangeStakeFilters(stakeFilters.filter((filter) => filter !== changedFilder))
      }
    }
  }

  const isReady = !!stakeData?.length
  if (!isReady) {
    return null
  }

  return (
    <Flex direction={'column'} mt={0} align="start" rounded={'inherit'} width="full">
      <Flex
        mt={2}
        height={'auto'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
        width={'full'}
        rounded={'inherit'}
        shadow="down"
        gap={2}
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
