import { Card, Button } from '@concave/ui'

export const Redeem = ({ onConfirm, bondSigma }: { onConfirm: () => void; bondSigma }) => {
  const parse = bondSigma?.bondSigma
  const claimed = parse?.claimed ? parse?.claimed : true
  return (
    <>
      {claimed ? (
        ''
      ) : (
        <Card mb={-20} fontWeight="bold" fontSize="lg" w="250px">
          <Button variant="primary" size="lg" isFullWidth onClick={onConfirm}>
            Redeem
          </Button>
        </Card>
      )}
    </>
  )
}
