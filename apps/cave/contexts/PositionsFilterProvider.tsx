import { StakingPool, stakingPools } from '@concave/marketplace'
import { RangeFilter } from 'components/NftFilters/Filters/hooks/useFilterByRange'
import { NftSort } from 'components/NftFilters/Sorters/hooks/useNftSort'
import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'

type StakeSettingsContextProps = {
  sorter: NftSort
  initialCNVFilter: RangeFilter
  tokenIdFilter: number | undefined
  stakePoolFilters: Set<number>
  setSorter: Dispatch<SetStateAction<NftSort>>
  setInitialCNVFilter: Dispatch<SetStateAction<RangeFilter>>
  setTokenIdFilter: Dispatch<SetStateAction<number | undefined>>
  tooglePoolFilter: (poolId: number) => void
}
const StakeSettingsCtx = createContext<StakeSettingsContextProps>({
  sorter: { order: 'ASC', sort: 'REDEEM_DATE' },
  setInitialCNVFilter: () => {},
  tooglePoolFilter: (poolId: number) => {},
  setTokenIdFilter: () => {},
  tokenIdFilter: undefined,
  initialCNVFilter: {},
  stakePoolFilters: new Set(),
  setSorter: () => {},
})

export function StakeSettingsProvider({ children }) {
  const [sorter, setSorter] = useState<NftSort>({ order: 'ASC', sort: 'REDEEM_DATE' })
  const [stakePoolFilters, setStakePoolFilters] = useState<Set<number>>(
    new Set(stakingPools.map((i) => i.poolId)),
  )
  const [initialCNVFilter, setInitialCNVFilter] = useState({})
  const [tokenIdFilter, setTokenIdFilter] = useState()

  const tooglePoolFilter = (poolId: number) => {
    stakePoolFilters.has(poolId) ? stakePoolFilters.delete(poolId) : stakePoolFilters.add(poolId)
    setStakePoolFilters(new Set(stakePoolFilters))
  }

  return (
    <StakeSettingsCtx.Provider
      value={{
        tokenIdFilter,
        setTokenIdFilter,
        tooglePoolFilter,
        setInitialCNVFilter,
        stakePoolFilters,
        initialCNVFilter,
        setSorter,
        sorter,
      }}
    >
      {children}
    </StakeSettingsCtx.Provider>
  )
}

export const useStakeSettings = () => useContext(StakeSettingsCtx)
