import { StakingPool, stakingPools } from '@concave/marketplace'
import { RangeFilter } from 'components/NftFilters/Filters/hooks/useFilterByRange'
import { NftSort } from 'components/NftFilters/Sorters/hooks/useNftSort'
import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'

type StakeSettingsContextProps = {
  sorter: NftSort
  initialCNVFilter: RangeFilter
  tokenIdFilter: number | undefined
  stakePoolFilters: StakingPool[]
  setSorter: Dispatch<SetStateAction<NftSort>>
  setInitialCNVFilter: Dispatch<SetStateAction<RangeFilter>>
  setTokenIdFilter: Dispatch<SetStateAction<number | undefined>>
  setStakePoolFilters: Dispatch<SetStateAction<StakingPool[]>>
}
const StakeSettingsCtx = createContext<StakeSettingsContextProps>({
  sorter: { order: 'ASC', sort: 'REDEEM_DATE' },
  setInitialCNVFilter: () => {},
  setStakePoolFilters: () => {},
  setTokenIdFilter: () => {},
  tokenIdFilter: undefined,
  initialCNVFilter: {},
  stakePoolFilters: [],
  setSorter: () => {},
})

export function StakeSettingsProvider({ children }) {
  const [sorter, setSorter] = useState<NftSort>({ order: 'ASC', sort: 'REDEEM_DATE' })
  const [stakePoolFilters, setStakePoolFilters] = useState<StakingPool[]>([...stakingPools])
  const [initialCNVFilter, setInitialCNVFilter] = useState({})
  const [tokenIdFilter, setTokenIdFilter] = useState()

  return (
    <StakeSettingsCtx.Provider
      value={{
        tokenIdFilter,
        setTokenIdFilter,
        setStakePoolFilters,
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
