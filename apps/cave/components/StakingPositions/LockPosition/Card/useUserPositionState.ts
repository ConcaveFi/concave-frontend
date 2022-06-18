import { StakingPosition } from '@concave/marketplace'
import { useState } from 'react'

interface NftPositionCardProps {
  stakingPosition: StakingPosition
}

export const useUserPositionState = (props: NftPositionCardProps) => {
  const { stakingPosition } = props
  const [active, setActive] = useState(false)
  return {
    stakingPosition,
    active,
    toogleActive: () => {
      setActive(!active)
    },
  }
}
