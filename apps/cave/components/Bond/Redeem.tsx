import { Card, Button } from '@concave/ui'
import { utils } from 'ethers'

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
  console.log(redeemable)
  const fontSize = largeFont ? '2xl' : 'xl'
  const customHeightSetting = customHeight ? { height: '51.35px' } : {} // 51.35px comes out to 50px?
  const bottom = setBottom ? '-3px' : -3
  return (
    <>
      {Math.sign(redeemable) === 1 ? (
        <Card mb={-12} bottom={bottom} fontWeight="bold" fontSize={fontSize} w="100%">
          <Button
            variant="primary"
            size="lg"
            isFullWidth
            onClick={onConfirm}
            fontSize={'inherit'}
            {...customHeightSetting}
          >
            Redeem
          </Button>
        </Card>
      ) : (
        ''
      )}
    </>
  )
}
