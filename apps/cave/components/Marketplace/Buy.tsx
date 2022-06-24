import { CNV, MARKETPLACE_CONTRACT } from '@concave/core'
import { ConcaveNFTMarketplace, MarketItemInfo } from '@concave/marketplace'
import { Text } from '@concave/ui'
import { ApproveButton } from 'components/ApproveButton/ApproveButton'
import { BigNumber } from 'ethers'
import { useTransactionRegistry } from 'hooks/TransactionsRegistry'
import { concaveProvider } from 'lib/providers'
import { useSigner } from 'wagmi'

export const BuyButton = ({ marketInfo }: { marketInfo: MarketItemInfo }) => {
  const { data: signer } = useSigner()
  const { registerTransaction } = useTransactionRegistry()

  const onClick = async () => {
    const contract = new ConcaveNFTMarketplace(concaveProvider(marketInfo.position.chainId))
    const tx = await contract.buyNow(signer, marketInfo, BigNumber.from(0))
    registerTransaction(tx, {
      type: 'offer marketplace',
      tokenId: +marketInfo.position.tokenId.toString(),
    })
  }
  return (
    <ApproveButton
      approveArgs={{
        currency: CNV[marketInfo.position.chainId],
        spender: MARKETPLACE_CONTRACT[marketInfo.position.chainId],
        amount: marketInfo.offer.buyNowPrice,
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
