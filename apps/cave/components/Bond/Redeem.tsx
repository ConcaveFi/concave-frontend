import { Card, Button } from '@concave/ui'
import { truncateNumber } from 'utils/truncateNumber'

export const Redeem = ({
  onConfirm,
  bondSigma,
  largeFont,
  setBottom,
  customHeight,
  buttonDisabled,
}: {
  onConfirm: () => void
  bondSigma
  largeFont?: boolean
  setBottom?: boolean
  customHeight?: boolean
  buttonDisabled: boolean
}) => {
  const redeemable = bondSigma?.parseRedeemable
  const fontSize = largeFont ? '2xl' : 'xl'
  const customHeightSetting = customHeight ? { height: '51.35px' } : {} // 51.35px comes out to 50px?
  const bottom = setBottom ? '1px' : -3
  return (
    <>
      <Card mb={-12} bottom={bottom} fontWeight="bold" fontSize={fontSize} w="100%">
        <Button
          disabled={buttonDisabled || +truncateNumber(redeemable) === 0}
          variant="primary"
          size="lg"
          w="full"
          onClick={onConfirm}
          fontSize={'inherit'}
          {...customHeightSetting}
        >
          {buttonDisabled
            ? 'Redeeming'
            : +truncateNumber(redeemable) === 0
            ? 'No CNV redeemable'
            : 'Redeem'}
        </Button>
      </Card>
    </>
  )
}
