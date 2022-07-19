import { Token } from '@concave/core'
import { Button, Image } from '@concave/ui'
import { useAccount } from 'wagmi'
import { getCurrencyLogoURI } from './CurrencyIcon'

export const AddTokenToWalletButton = ({ token }: { token: Token }) => {
  const { connector } = useAccount()

  const { address, symbol, decimals } = token
  const image = getCurrencyLogoURI(token)

  return (
    <Button
      variant="secondary"
      size="medium"
      onClick={() =>
        connector.watchAsset({
          address,
          symbol,
          image,
          decimals /* base connector type does not declare decimals so we type as any to avoid compiler errors */,
        } as any)
      }
      leftIcon={<Image src={image} width="24px" height="24px" alt={`${symbol} icon`} />}
    >
      Add {symbol} to wallet
    </Button>
  )
}
