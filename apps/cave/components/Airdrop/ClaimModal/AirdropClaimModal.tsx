import { useBreakpointValue } from '@concave/ui'
import { AirdropClaimDesktopModal } from './AirdropClaimDesktopModal'
import { AirdropClaimMobileModal } from './AirdropClaimMobileModal'

export function AirdropClaimModal() {
  const isMobile = useBreakpointValue({base: true, sm: false})

  if ( isMobile ) {
    return <AirdropClaimMobileModal></AirdropClaimMobileModal>
  }

  return <AirdropClaimDesktopModal></AirdropClaimDesktopModal>
}
