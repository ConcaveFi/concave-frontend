import { Card, Button } from '@concave/ui'
import { utils } from 'ethers'

export const Redeem = ({
  onConfirm,
  bondSigma,
  largeFont,
  setBottom,
  customHeight,
  buttonDisabled,
  isRedeeming,
}: {
  onConfirm: () => void
  bondSigma
  largeFont?: boolean
  setBottom?: boolean
  customHeight?: boolean
  buttonDisabled: boolean
  isRedeeming?: boolean
}) => {
  const redeemable = bondSigma?.parseRedeemable
  const fontSize = largeFont ? '2xl' : 'xl'
  const customHeightSetting = customHeight ? { height: '51.35px' } : {} // 51.35px comes out to 50px?
  const bottom = setBottom ? '-12px' : -3

  const formatRedeemable =
    Math.sign(parseInt(redeemable)) === 1
      ? (+utils.formatEther(BigInt(parseInt(redeemable)))).toFixed(2)
      : 0
  return (
    <>
      <Card mb={-12} bottom={bottom} fontWeight="bold" fontSize={fontSize} w="100%">
        <Button
          disabled={buttonDisabled || +formatRedeemable === 0}
          variant="primary"
          size="lg"
          w="full"
          onClick={onConfirm}
          fontSize={'inherit'}
          {...customHeightSetting}
        >
          {buttonDisabled && isRedeeming
            ? 'Redeeming'
            : buttonDisabled && !isRedeeming
            ? 'Updating'
            : formatRedeemable === 0
            ? 'No CNV redeemable'
            : 'Redeem'}
        </Button>
      </Card>
    </>
  )
}
