import { Card, Button } from '@concave/ui'

export const Redeem = ({ onConfirm, bondSigma }: { onConfirm: () => void; bondSigma }) => {
  const totalOwed = bondSigma?.totalOwed?.toFixed(2)
  const totalPending = bondSigma?.totalPending?.toFixed(2)
  return (
    <>
      {totalPending < totalOwed ? (
        <Card mb={-20} fontWeight="bold" fontSize="lg" w="250px">
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
