import { Card, Button } from '@concave/ui'

export const Redeem = ({
  onConfirm,
  bondSigma,
  largeFont,
  setBottom,
  customHeight,
}: {
  onConfirm: () => void
  bondSigma
  largeFont?: boolean
  setBottom?: boolean
  customHeight?: boolean
}) => {
  const redeemable = bondSigma?.parseRedeemable
  const fontSize = largeFont ? '2xl' : 'xl'
  const customHeightSetting = customHeight ? { height: '51.35px' } : {} // 51.35px comes out to 50px?
  const bottom = setBottom ? '1px' : -3
  return (
    <>
      <Card mb={-12} bottom={bottom} fontWeight="bold" fontSize={fontSize} w="100%">
        <Button
          disabled={redeemable === 0}
          variant="primary"
          size="lg"
          w="full"
          onClick={onConfirm}
          fontSize={'inherit'}
          {...customHeightSetting}
        >
          Redeem
        </Button>
      </Card>
    </>
  )
}
