import { CNV, Currency, CurrencyAmount } from '@concave/core'
import { Offer } from '@concave/marketplace'
import { Box, Button, Flex, HStack, NumericInput, Text, VStack } from '@concave/ui'
import { ChooseButton } from 'components/Marketplace/ChooseButton'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useEffect, useState } from 'react'
import { formatFixed } from 'utils/formatFixed'
import { toAmount } from 'utils/toAmount'
import { truncateNumber } from 'utils/truncateNumber'
import { useAccount } from 'wagmi'
import { UserMarketInfoState } from './LockPosition/MarketLockInfo/useMarketPlaceInfo'

type UserListPositionCardProps = {
  marketItemState: UserMarketInfoState
}
type ListForSaleState = ReturnType<typeof useListeForSaleState>

export const useListeForSaleState = ({ marketItemState }: UserListPositionCardProps) => {
  const { data: account } = useAccount()
  const [method, setMethod] = useState<'Sale' | 'Auction'>('Sale')
  const selectedToken = CNV[marketItemState.chainId]
  const [offer, setOffer] = useState(
    new Offer({
      ...marketItemState.marketItem.data.offer,
      ERC20Token: selectedToken.address,
      buyNowPrice:
        marketItemState.marketItem.data.offer.buyNowPrice ||
        marketItemState.marketItem.data.position.currentValue,
      feePercentages: [10000],
      feeRecipients: [account.address],
    }),
  )
  useEffect(() => {
    if (method === 'Sale') setOffer((old) => old.setMinPrice(0))
  }, [method])

  const setPrice = (amount: CurrencyAmount<Currency>) => {
    setOffer((old) => old.setMinPrice(amount.numerator))
  }

  const setBuyNowPrice = (amount: CurrencyAmount<Currency>) => {
    setOffer((old) => old.setBuyNowPrice(amount.numerator))
  }

  const create = () => {
    marketItemState.createOffer(offer)
  }

  const handleMethod = () => {
    /**
     * Uncomment to enable auctions
     * setMethod((old) => (old === 'Auction' ? 'Sale' : 'Auction'))
     */
  }

  return {
    method,
    position: marketItemState.marketItem.data.position,
    marketItem: marketItemState.marketItem.data,
    offer,
    setBuyNowPrice,
    handleMethod,
    setPrice,
    create,
  }
}

export const ListPositionForSale = ({
  listForSaleState,
}: {
  listForSaleState: ListForSaleState
}) => {
  return (
    <VStack direction={'column'} gap={1} pt={4} px={8} pb={0}>
      <Type state={listForSaleState} />
      <Info
        label="Current value:"
        value={truncateNumber(listForSaleState.position.currentValue)}
      ></Info>

      <ListenPrice state={listForSaleState} />
      <BuyNowPrice state={listForSaleState} />
      <Info
        label="Discount:"
        value={formatFixed(listForSaleState.marketItem.discount, { decimals: 2 }) + '%'}
      ></Info>

      {!listForSaleState.offer.isValid && (
        <Text mr="auto" fontSize="sm" color="#c32417" fontWeight="medium">
          {listForSaleState.method === 'Sale' ? 'Invalid sell price' : 'Invalid reserve price'}
        </Text>
      )}
      <Flex pt={4} justifyContent="center">
        <ChooseButton
          onClick={listForSaleState.create}
          disabled={!listForSaleState.offer.isValid}
          title={`List`}
          backgroundType="blue"
        />
      </Flex>
    </VStack>
  )
}

const Type = ({ state }: { state: ListForSaleState }) => {
  return (
    <HStack justifyContent={'center'} width={'full'}>
      <Text textColor={'text.low'} width={'full'} textAlign={'right'} fontWeight="bold">
        Type:
      </Text>
      <Box width={'full'}>
        <Button
          width={'110px'}
          height={'30px'}
          shadow={'Up Small'}
          onClick={state.handleMethod}
          rounded={'2xl'}
          fontWeight="bold"
        >
          {state.method}
        </Button>
      </Box>
    </HStack>
  )
}

const ListenPrice = (props: { state: ListForSaleState }) => {
  const { marketItem, setPrice } = props.state
  const chainId = useCurrentSupportedNetworkId()
  if (props.state.method === 'Sale') {
    return <></>
  }
  return (
    <HStack justifyContent={'center'} width={'full'}>
      <Text textColor={'text.low'} textAlign={'right'} fontWeight="bold" width={'full'}>
        Starting price:
      </Text>
      <Box width={'full'}>
        <NumericInput
          width={'full'}
          shadow={'Down Big'}
          borderRadius={'full'}
          p={1}
          pl={4}
          onValueChange={(values, sourceInfo) => {
            if (sourceInfo.source === 'prop') return
            const value = values.value || '0'
            setPrice(toAmount(value, CNV[chainId]))
          }}
        />
      </Box>
    </HStack>
  )
}

const BuyNowPrice = ({ state }: { state: ListForSaleState }) => {
  const { marketItem, setBuyNowPrice, method } = state
  const chainId = useCurrentSupportedNetworkId()
  return (
    <>
      <HStack justifyContent={'center'} width={'full'}>
        <Text textColor={'text.low'} textAlign={'right'} fontWeight="bold" width={'full'}>
          {method === 'Sale' ? 'Sell price' : 'Reserve price'}:
        </Text>
        <Box width={'full'}>
          <NumericInput
            width={'full'}
            shadow={'Down Big'}
            borderRadius={'full'}
            p={1}
            pl={4}
            onValueChange={(values, sourceInfo) => {
              if (sourceInfo.source === 'prop') return
              const value = values.value || '0'
              setBuyNowPrice(toAmount(value, CNV[chainId]))
            }}
          />
        </Box>
      </HStack>
    </>
  )
}
const Info = ({ label, value }: { label: string; value: string }) => {
  return (
    <HStack justifyContent={'center'} width={'full'}>
      <Text textColor={'text.low'} textAlign={'right'} fontWeight="bold" width={'full'}>
        {label}
      </Text>

      <Box width={'full'}>
        <Flex
          width={'full'}
          shadow={'Up Small'}
          borderRadius={'full'}
          p={1}
          pl={4}
          align="center"
          fontWeight="bold"
        >
          {value}
        </Flex>
      </Box>
    </HStack>
  )
}
