import { parseEther } from 'ethers/lib/utils'
import { usePCNVUserData } from '../Hooks/usePCNVUserData'
import useVestedTokens from '../Hooks/useVestedTokens'
import { VestedTokenButtonProps } from '../TreasuryRedeemCard'
import { VestedTokenDialog } from './VestedTokenDialog'

export const PCNVRedemptionDialog: React.FC<VestedTokenButtonProps> = ({ isOpen, onClose }) => {
  const { data: pCNVRedeemableData, isLoading } = usePCNVUserData()
  const { pCNV } = useVestedTokens()

  const balance = parseEther(pCNV?.data?.formatted || '0')
  return (
    <>
      <VestedTokenDialog
        isLoading={isLoading}
        isOpen={isOpen}
        onClose={onClose}
        onRedeem={() => {}}
        status={'default'}
        tokenUserData={{ ...pCNVRedeemableData, balance }}
        title="Redeem pCNV"
      />
    </>
  )
}
