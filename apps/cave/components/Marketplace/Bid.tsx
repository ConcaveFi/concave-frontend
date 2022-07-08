import { CNV, Currency, CurrencyAmount, MARKETPLACE_CONTRACT } from '@concave/core'
import { ChevronDownIcon } from '@concave/icons'
import { ConcaveNFTMarketplace, Offer, StakingPosition } from '@concave/marketplace'
import { Button, ButtonProps, Collapse, HStack, IconButton, Modal, Text, VStack } from '@concave/ui'
import { ApproveButton } from 'components/ApproveButton/ApproveButton'
import { CurrencyInputField } from 'components/CurrencyAmountField'
import { CurrencyIcon } from 'components/CurrencyIcon'
import { PositionInfoItem } from 'components/Positions/MyPositions'
import { formatDistanceToNow } from 'date-fns'
import { useTransactionRegistry } from 'hooks/TransactionsRegistry'
import { concaveProvider } from 'lib/providers'
import { useMemo, useState } from 'react'
import { formatFixed } from 'utils/formatFixed'
import { useSigner } from 'wagmi'

export const BidButton = ({ position, offer }: { position: StakingPosition; offer: Offer }) => {
  const { data: signer } = useSigner()
  const currentCurrency = CNV[position.chainId]
  const [open, setOpen] = useState(false)
  const [infoOpen, setInfoOpen] = useState(false)
  const { registerTransaction } = useTransactionRegistry()
  const [amount, setAmout] = useState<CurrencyAmount<Currency>>(
    CurrencyAmount.fromRawAmount(currentCurrency, '0'),
  )
  const handleInfo = () => {
    setInfoOpen(!infoOpen)
  }

  const bidButtonProps: ButtonProps = useMemo(() => {
    const minPriceEnough = offer.minPrice.lte(amount.numerator.toString())
    const highestBidEnough = offer.nftHighestBid.lt(amount.numerator.toString())
    if (!minPriceEnough || !highestBidEnough) return { children: 'Bid is too low', disabled: true }

    const bidAmountOverflow = offer.buyNowPrice.lt(amount.numerator.toString())
    if (bidAmountOverflow) return { children: 'Bid is too high', disabled: true }

    const onClick = async () => {
      const contract = new ConcaveNFTMarketplace(concaveProvider(position.chainId))
      const tx = await contract.makeBid(signer, position, amount)
      registerTransaction(tx, {
        type: 'offer marketplace',
        tokenId: +position.tokenId.toString(),
      })
      setOpen(false)
    }
    return { children: 'Submit bid', onClick }
  }, [amount, offer, position, registerTransaction, signer])

  if (!offer.isAuction) {
    return <></>
  }

  const auctionEnd = +offer.auctionEnd.toString()
  const auctionEndLabel = formatDistanceToNow(new Date(auctionEnd * 1000), {
    addSuffix: false,
  })

  const redeemDate = formatDistanceToNow(new Date(+position.maturity.toString() * 1000), {
    addSuffix: false,
  })

  return (
    <>
      <Button
        variant={'primary'}
        borderWidth={0}
        minW={'120px'}
        m={2}
        size={'md'}
        onClick={() => {
          setOpen(true)
        }}
      >
        <Text>Place bid</Text>
      </Button>
      <Modal
        title="Place bid"
        size={'3xl'}
        bluryOverlay
        isOpen={open}
        onClose={() => {
          setOpen(false)
        }}
      >
        <VStack gap={3}>
          <CurrencyInputField currencyAmountIn={amount} onChangeAmount={setAmout} />
          <VStack
            p={4}
            w={'full'}
            shadow={'Down Big'}
            borderRadius={'2xl'}
            fontWeight="bold"
            fontSize="lg"
            color="text.medium"
          >
            <PositionInfoItem label={'Buy now'} value={formatFixed(offer.buyNowPrice)}>
              <CurrencyIcon h={'32px'} size="sm" currency={currentCurrency} />
            </PositionInfoItem>
            <PositionInfoItem label={'Current bid'} value={formatFixed(offer.nftHighestBid)}>
              <CurrencyIcon h={'32px'} size="sm" currency={currentCurrency} />
            </PositionInfoItem>
            <PositionInfoItem label={'Current value'} value={formatFixed(position.currentValue)}>
              <CurrencyIcon h={'32px'} size="sm" currency={currentCurrency} />
            </PositionInfoItem>
            {auctionEnd && (
              <PositionInfoItem label={'Auction end'} value={auctionEndLabel}></PositionInfoItem>
            )}
            <PositionInfoItem label={'Redeem'} value={redeemDate}></PositionInfoItem>
            <IconButton
              size={'sm'}
              aria-label="Search database"
              variant={'solid'}
              w={'full'}
              onClick={handleInfo}
              icon={<ChevronDownIcon transform={!!infoOpen ? 'rotate(180deg)' : ''} w={6} h={6} />}
            >
              Down
            </IconButton>
            <VStack w={'full'} as={Collapse} in={infoOpen} animateOpacity>
              <PositionInfoItem
                label={'Seller'}
                value={offer.nftSeller.substring(0, 8) + '...'}
              ></PositionInfoItem>
              <PositionInfoItem
                label={'Highest bidder'}
                value={offer.nftHighestBidder.substring(0, 8) + '...'}
              ></PositionInfoItem>
              <PositionInfoItem
                label={'Bid increase'}
                value={formatFixed(offer.bidIncreasePercentage) + '%'}
              ></PositionInfoItem>
              <PositionInfoItem
                label={'Auction bid period'}
                value={formatFixed(offer.auctionBidPeriod)}
              ></PositionInfoItem>
            </VStack>
          </VStack>

          <HStack w={'full'}>
            <ApproveButton
              approveArgs={{
                currency: amount.currency,
                spender: MARKETPLACE_CONTRACT[position.chainId],
                amount: amount.numerator.toString(),
              }}
              width={'full'}
              variant={'primary'}
              size={'large'}
              borderWidth={0}
              {...bidButtonProps}
            />
          </HStack>
        </VStack>
      </Modal>
    </>
  )
}
