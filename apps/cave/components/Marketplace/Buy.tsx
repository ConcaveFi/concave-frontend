import { CNV, MARKETPLACE_CONTRACT } from '@concave/core'
import { ConcaveNFTMarketplace, Offer, StakingPosition } from '@concave/marketplace'
import { Text } from '@concave/ui'
import { ApproveButton } from 'components/ApproveButton/ApproveButton'
import { useTransactionRegistry } from 'hooks/TransactionsRegistry'
import { concaveProvider } from 'lib/providers'
import { useSigner } from 'wagmi'

export const BuyButton = ({ position, offer }: { position: StakingPosition; offer: Offer }) => {
  const { data: signer } = useSigner()
  const { registerTransaction } = useTransactionRegistry()

  const onClick = async () => {
    const contract = new ConcaveNFTMarketplace(concaveProvider(position.chainId))
    const tx = await contract.buyNow(signer, position, offer)
    registerTransaction(tx, {
      type: 'offer marketplace',
      tokenId: +position.tokenId.toString(),
    })
  }
  return (
    <ApproveButton
      approveArgs={{
        currency: CNV[position.chainId],
        spender: MARKETPLACE_CONTRACT[position.chainId],
        amount: offer.buyNowPrice,
      }}
      variant={'primary'}
      borderWidth={0}
      minW={'120px'}
      m={2}
      size={'md'}
      onClick={onClick}
    >
      <Text>Buy now</Text>
    </ApproveButton>
  )
}
