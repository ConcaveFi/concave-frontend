import { Button, gradientBorder } from '@concave/ui'
import { useConnectModal } from 'components/Modals'

export const ConnectButton = () => {
  const connectModal = useConnectModal()

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
