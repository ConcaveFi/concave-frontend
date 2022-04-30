import { Card, Button } from '@concave/ui'

export const Redeem = ({ onConfirm, bondSigma }: { onConfirm: () => void; bondSigma }) => {
    const display = !!bondSigma ? 1 : 0
    return (
      <Card mb={-20} fontWeight="bold" fontSize="lg" w="250px">
        {display ? (
          <Button variant="primary" size="lg" isFullWidth onClick={onConfirm}>
            Redeem
          </Button>
        ) : (
          ''
        )}
      </Card>
    )
  }