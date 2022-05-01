import { Card, Button } from '@concave/ui'

export const Redeem = ({ onConfirm, bondSigma }: { onConfirm: () => void; bondSigma }) => {
  const parse = bondSigma?.claimed
  console.log(parse)
  const claimed = parse?.claimed
  const totalOwed = bondSigma?.totalOwed.toFixed(2)
  console.log(claimed)
  return (
    <>
      {claimed ? (
        ''
      ) : totalOwed > 0 ? (
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
