import {
  CNV,
  Currency,
  CurrencyAmount,
  FIXED_ORDER_MARKET_CONTRACT,
  STAKING_CONTRACT,
} from '@concave/core'
import { Box, Button, Flex, HStack, Input, NumericInput, Text, VStack } from '@concave/ui'
import { CurrencyInputField } from 'components/CurrencyAmountField'
import { SelectAMMCurrency } from 'components/CurrencySelector/SelectAMMCurrency'
import { ChooseButton } from 'components/Marketplace/ChooseButton'
import { BigNumber } from 'ethers'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useState } from 'react'
import { toAmount } from 'utils/toAmount'
import { chain, useAccount, useSignTypedData } from 'wagmi'

import { UserMarketInfoState } from './LockPosition/MarketLockInfo/useMarketPlaceInfo'

type UserListPositionCardProps = {
  marketItemState: UserMarketInfoState
}
type ListForSaleState = ReturnType<typeof useListeForSaleState>
// All properties on a domain are optional
const domain = {
  name: 'Concave Marketplace',
  version: 'alpha',
  chainId: chain.rinkeby.id,
  verifyingContract: FIXED_ORDER_MARKET_CONTRACT[chain.rinkeby.id],
}

// The named list of all type definitions
const types = {
  Message: [
    { name: 'erc721', type: 'address' },
    { name: 'tokenId', type: 'uint256' },
    { name: 'erc20', type: 'address' },
    { name: 'price', type: 'uint256' },
    { name: 'deadline', type: 'uint256' },
    { name: 'seller', type: 'address' },
    { name: 'item', type: 'ERC721' },
    { name: 'price', type: 'Price' },
  ],
}

export const useListeForSaleState = ({ marketItemState }: UserListPositionCardProps) => {
  const { address: seller } = useAccount()
  const [deadline, setDeadline] = useState(``)
  const [method, setMethod] = useState<'Sale' | 'Auction'>('Sale')
  const selectedToken = CNV[marketItemState.chainId]
  const [price, setPrice] = useState<CurrencyAmount<Currency>>(
    CurrencyAmount.fromRawAmount(selectedToken, 0),
  )
  const value = {
    seller,
    erc721: STAKING_CONTRACT[4],
    tokenId: marketItemState.marketItem.data.position.tokenId,
    erc20: price.wrapped.currency.address,
    amount: BigNumber.from(price.wrapped.numerator.toString()),
    deadline,
  }
  const { data, isError, isLoading, isSuccess, signTypedData } = useSignTypedData({
    types,
    domain,
    value,
  })
  console.log(data)
  const create = () => {
    signTypedData()
  }

  const handleMethod = () => {
    /**
     * Uncomment to enable auctions
     * setMethod((old) => (old === 'Auction' ? 'Sale' : 'Auction'))
     */
  }

  return {
    method,
    setDeadline,
    deadline,
    position: marketItemState.marketItem.data.position,
    marketItem: marketItemState.marketItem.data,
    price,
    setPrice,
    handleMethod,
    create,
  }
}

export const ListPositionForSale = ({
  listForSaleState,
}: {
  listForSaleState: ListForSaleState
}) => {
  console.log(`ListPositionForSale`)
  return (
    <VStack direction={'column'} gap={1} pt={8} px={8} pb={0}>
      {/* <Type state={listForSaleState} />
      <Info
        label="Current value:"
        value={truncateNumber(listForSaleState.position.currentValue)}
      ></Info> */}

      <Flex w="full" gap={4} justifyContent={'space-between'}>
        <Text>Price:</Text>{' '}
        <CurrencyInputField
          currencyAmountIn={listForSaleState.price}
          onChangeAmount={listForSaleState.setPrice}
          CurrencySelector={SelectAMMCurrency}
        />
      </Flex>
      <Flex w="full" gap={4} justifyContent={'space-between'}>
        <Text>Deadline:</Text>{' '}
        <Input
          type="date"
          onChange={({ target }) => {
            listForSaleState.setDeadline(`` + target.valueAsDate.getTime() / 1000)
          }}
        ></Input>
      </Flex>

      <ListenPrice state={listForSaleState} />
      {/* <BuyNowPrice state={listForSaleState} /> */}
      {/* <Info
        label="Discount:"
        value={
          ``
          // formatFixed(
          //   listForSaleState.offer.calculateDiscount?.(listForSaleState.marketItem.position),
          //   { decimals: 2 },
          // ) + '%'
        }
      ></Info> */}

      {/* {!listForSaleState.offer.isValid && (
        <Text mr="auto" fontSize="sm" color="#c32417" fontWeight="medium">
          {listForSaleState.method === 'Sale' ? 'Invalid sell price' : 'Invalid reserve price'}
        </Text>
      )} */}
      <Flex pt={4} justifyContent="center">
        <ChooseButton
          onClick={listForSaleState.create}
          // disabled={!listForSaleState.offer.isValid}
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
          cursor={'not-allowed'}
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
