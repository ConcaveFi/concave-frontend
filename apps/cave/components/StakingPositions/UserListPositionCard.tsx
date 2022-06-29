import { CNV, Currency, CurrencyAmount } from '@concave/core'
import { MarketItemInfo, Offer } from '@concave/marketplace'
import { Box, Button, Flex, HStack, NumericInput, Text, VStack } from '@concave/ui'
import { ChooseButton } from 'components/Marketplace/ChooseButton'
import { BigNumber } from 'ethers'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useEffect, useState } from 'react'
import { formatFixed } from 'utils/formatFixed'
import { toAmount } from 'utils/toAmount'

import { useAccount } from 'wagmi'
import { UserMarketInfoState } from './LockPosition/MarketLockInfo/useMarketPlaceInfo'

type UserListPositionCardProps = {
  marketInfoState: UserMarketInfoState
}
type ListForSaleState = ReturnType<typeof useListeForSaleState>

export const useListeForSaleState = ({ marketInfoState }: UserListPositionCardProps) => {
  const { address } = useAccount()
  const [method, setMethod] = useState<'Sale' | 'Auction'>('Sale')
  const selectedToken = CNV[marketInfoState.chainId]
  const [offer, setOffer] = useState(
    new Offer({
      ...marketInfoState.marketInfo.data.offer,
      ERC20Token: selectedToken.address,
      buyNowPrice:
        marketInfoState.marketInfo.data.offer.buyNowPrice ||
        marketInfoState.marketInfo.data.position.currentValue,
      feePercentages: [10000],
      feeRecipients: [address],
    }),
  )
  const marketInfo = new MarketItemInfo({ ...marketInfoState.marketInfo.data, offer })
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
    marketInfoState.createOffer(offer)
  }

  const handleMethod = () => {
    setMethod((old) => (old === 'Auction' ? 'Sale' : 'Auction'))
  }

  return {
    method,
    marketInfo,
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
      <CurrentValue currentValue={listForSaleState.marketInfo.position.currentValue} />
      <ListenPrice state={listForSaleState} />
      <BuyNowPrice state={listForSaleState} />
      <Discount state={listForSaleState} />

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
  const { marketInfo, setPrice } = props.state
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
  const { marketInfo, setBuyNowPrice, method } = state
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
const Discount = ({ state }: { state: ListForSaleState }) => {
  return (
    <HStack justifyContent={'center'} width={'full'}>
      <Text textColor={'text.low'} textAlign={'right'} fontWeight="bold" width={'full'}>
        Discount:
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
          {formatFixed(state.marketInfo.discount, { decimals: 2 })}%
        </Flex>
      </Box>
    </HStack>
  )
}

const CurrentValue = (props: { currentValue: BigNumber }) => {
  return (
    <HStack justifyContent={'center'} width={'full'}>
      <Text textColor={'text.low'} textAlign={'right'} fontWeight="bold" width={'full'}>
        Current value:
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
          {formatFixed(props.currentValue)}
        </Flex>
      </Box>
    </HStack>
  )
}
