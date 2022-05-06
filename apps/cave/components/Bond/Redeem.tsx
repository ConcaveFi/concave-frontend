import { Card, Button } from '@concave/ui'

export const Redeem = ({ onConfirm, bondSigma }: { onConfirm: () => void; bondSigma }) => {
  const totalOwed = bondSigma?.totalOwed
  const redeemable = bondSigma?.redeemable
  return (
    <>
      {totalOwed ? (
        <Card mb={-12} bottom={-3} fontWeight="bold" fontSize="lg" w="100%">
          <Button variant="primary" size="lg" isFullWidth onClick={onConfirm}>
            {redeemable < 0.1 ? 'Nothing to redeem' : 'Redeem'}
          </Button>
        </Card>
      ) : (
        ''
      )}
    </>
  )
}
