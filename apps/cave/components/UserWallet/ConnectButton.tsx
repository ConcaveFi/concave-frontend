import { Button, gradientBorder } from '@concave/ui'
import { useModals } from 'contexts/ModalsContext'

export const ConnectButton = () => {
  const { connectModal } = useModals()

  return (
    <Button
      sx={{ ...gradientBorder({ borderWidth: 2, borderRadius: '2xl' }) }}
      fontFamily="heading"
      variant="primary"
      size="medium"
      w="100%"
      onClick={connectModal.onOpen}
    >
      Connect wallet
    </Button>
  )
}
