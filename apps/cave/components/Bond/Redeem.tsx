import { Card, Button } from '@concave/ui'
import { utils } from 'ethers'

export const Redeem = ({ onConfirm, bondSigma }: { onConfirm: () => void; bondSigma }) => {
  const redeemable = bondSigma?.parseRedeemable
  console.log(redeemable)
  return (
    <>
      {Math.sign(redeemable) === 1 ? (
        <Card mb={-12} bottom={-3} fontWeight="bold" fontSize="lg" w="100%">
          <Button variant="primary" size="lg" isFullWidth onClick={onConfirm}>
            Redeem
          </Button>
        </Card>
      ) : (
        ''
      )}
    </>
  )
}
