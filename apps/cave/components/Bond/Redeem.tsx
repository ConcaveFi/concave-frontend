import { Button, gradientBorder, Text } from '@concave/ui'
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
      {/* <Card mb={-12} bottom={bottom} fontWeight="bold" fontSize={fontSize} w="100%"> */}
      <Button
        sx={formatRedeemable === 0 && { ...gradientBorder({ borderWidth: 2 }) }}
        rounded={formatRedeemable === 0 ? '16px 16px 0px 0px' : 'xl'}
        disabled={buttonDisabled || +formatRedeemable === 0}
        apply={formatRedeemable === 0 && 'background.glass'}
        maxH={formatRedeemable === 0 ? '35px' : '60px'}
        w={formatRedeemable === 0 ? '65%' : 'full'}
        mb={formatRedeemable !== 0 && 4}
        fontSize={'inherit'}
        onClick={onConfirm}
        variant="primary"
        {...customHeightSetting}
      >
        <Text textColor={formatRedeemable ? '#fff' : 'text.low'}>
          {buttonDisabled && isRedeeming
            ? 'Redeeming'
            : buttonDisabled && !isRedeeming
            ? 'Updating'
            : formatRedeemable === 0
            ? 'No CNV redeemable'
            : 'Redeem'}
        </Text>
      </Button>
      {/* </Card> */}
    </>
  )
}
