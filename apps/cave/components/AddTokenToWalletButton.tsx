import { Button, Image } from '@concave/ui'
import { Token } from '@concave/core'
import { useAccount } from 'wagmi'
import { getCurrencyLogoURI } from './CurrencyIcon'

export const AddTokenToWalletButton = ({ token }: { token: Token }) => {
  const { connector } = useAccount()

  const { address, symbol } = token
  const image = getCurrencyLogoURI(token)

  return (
    <Button
      variant="secondary"
      size="medium"
      onClick={() => connector.watchAsset({ address, symbol, image })}
      leftIcon={<Image src={image} width="24px" height="24px" alt={`${symbol} icon`} />}
    >
      Add {symbol} to wallet
    </Button>
  )
}
