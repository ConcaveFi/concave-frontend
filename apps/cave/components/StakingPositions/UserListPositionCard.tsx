<<<<<<< HEAD
import { CNV, Currency, CurrencyAmount } from '@concave/core'
import { Offer } from '@concave/marketplace'
import { Box, Button, Flex, HStack, NumericInput, Text, VStack } from '@concave/ui'
=======
import {
  CNV,
  Currency,
  CurrencyAmount,
  FIXED_ORDER_MARKET_CONTRACT,
  STAKING_CONTRACT,
} from '@concave/core'
import { Box, Button, Flex, HStack, Input, NumericInput, Text, VStack } from '@concave/ui'
import { SelectAMMCurrency } from 'components/CurrencySelector/SelectAMMCurrency'
>>>>>>> 5b8c2fabfe3fdf2264e3679e12c51bb9e925fec1
import { ChooseButton } from 'components/Marketplace/ChooseButton'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useState } from 'react'
import { toAmount } from 'utils/toAmount'
import { truncateNumber } from 'utils/truncateNumber'
<<<<<<< HEAD
=======
import { chain, useAccount, useSignTypedData } from 'wagmi'
>>>>>>> 5b8c2fabfe3fdf2264e3679e12c51bb9e925fec1

import { UserMarketInfoState } from './LockPosition/MarketLockInfo/useMarketPlaceInfo'

<<<<<<< HEAD
type UserListPositionCardProps = {
  marketItemState: UserMarketInfoState
}
type ListForSaleState = ReturnType<typeof useListeForSaleState>

export const useListeForSaleState = ({ marketItemState }: UserListPositionCardProps) => {
<<<<<<< HEAD
  const { data: account } = useAccount()
=======
  const { address } = useAccount()
>>>>>>> 487c38971d9fa0eb17e5b5902f30c56b7cd08383
  const [method, setMethod] = useState<'Sale' | 'Auction'>('Sale')
  const marketItem = marketItemState.marketItem.data
  const selectedToken = CNV[marketItemState.chainId]
  const [offer, setOffer] = useState(
    new Offer({
      ...marketItem.offer,
      ERC20Token: selectedToken.address,
      buyNowPrice: marketItem.position.currentValue,
      feePercentages: [10000],
      feeRecipients: [address],
    }),
  )

  useEffect(() => {
    if (method === 'Sale') setOffer((old) => old.setMinPrice(0))
  }, [method])

  const setPrice = (amount: CurrencyAmount<Currency>) => {
    setOffer((old) => old.setMinPrice(amount.numerator))
=======
type UserListPositionCardProps = { marketItemState: UserMarketInfoState }

type ListForSaleState = ReturnType<typeof useListeForSaleState>

const domain = {
  name: 'Fixed Order Market',
  version: '1',
  chainId: chain.rinkeby.id,
  verifyingContract: FIXED_ORDER_MARKET_CONTRACT[chain.rinkeby.id],
}

const types = {
  SwapMetadata: [
    { name: 'seller', type: 'address' },
    { name: 'erc721', type: 'address' },
    { name: 'erc20', type: 'address' },
    { name: 'tokenId', type: 'uint256' },
    { name: 'startPrice', type: 'uint256' },
    { name: 'nonce', type: 'uint256' }, // 0
    { name: 'endPrice', type: 'uint256' }, // 0
    { name: 'start', type: 'uint256' }, // 0
    { name: 'deadline', type: 'uint256' },
  ],
}

export const useListeForSaleState = ({ marketItemState }: UserListPositionCardProps) => {
  const selectedToken = CNV[marketItemState.chainId]
  const { address: seller } = useAccount()
  const [deadline, setDeadline] = useState(BigNumber.from(Date.now()))
  const [method, setMethod] = useState<'Sale' | 'Auction'>('Sale')
  const [price, setPrice] = useState<CurrencyAmount<Currency>>(
    CurrencyAmount.fromRawAmount(
      selectedToken,
      marketItemState.marketItem.data.position.currentValue.toString(),
    ),
  )
  const value = {
    seller,
    erc721: STAKING_CONTRACT[4],
    erc20: price.wrapped.currency.address,
    tokenId: marketItemState.marketItem.data.position.tokenId,
    startPrice: BigNumber.from(price.wrapped.numerator.toString()),
    endPrice: BigNumber.from(0),
    nonce: BigNumber.from(0),
    start: BigNumber.from(0),
    deadline,
>>>>>>> 5b8c2fabfe3fdf2264e3679e12c51bb9e925fec1
  }

  const { signTypedDataAsync } = useSignTypedData({
    types,
    domain,
    value,
  })

  const create = () => {
<<<<<<< HEAD
    marketItemState.createOffer(offer)
=======
    signTypedDataAsync()
      .then((data) => {
        const signature = data.substring(2)
        const r = `0x${signature.substring(0, 64)}`
        const s = `0x${signature.substring(64, 128)}`
        const v = parseInt(signature.substring(128, 130), 16)
        console.log()
        console.log(
          JSON.stringify({
            r,
            s,
            v,
            data,
            types,
            domain,
            value: {
              ...value,
              start: value.start.toString(),
              startPrice: value.startPrice.toString(),
              endPrice: value.endPrice.toString(),
              nonce: value.nonce.toString(),
              deadline: value.deadline.toString(),
            },
          }),
        )
      })
      .catch(console.error)
>>>>>>> 5b8c2fabfe3fdf2264e3679e12c51bb9e925fec1
  }

  const handleMethod = () => {
    /**
     * Uncomment to enable auctions
     * setMethod((old) => (old === 'Auction' ? 'Sale' : 'Auction'))
     */
  }

  return {
    method,
<<<<<<< HEAD
    position: marketItemState.marketItem.data.position,
    marketItem: marketItemState.marketItem.data,
    offer,
    setBuyNowPrice,
    handleMethod,
=======
    setDeadline,
    deadline,
    position: marketItemState.marketItem.data.position,
    marketItem: marketItemState.marketItem.data,
    price,
>>>>>>> 5b8c2fabfe3fdf2264e3679e12c51bb9e925fec1
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
      <Type state={listForSaleState} />
      <Info
        label="Current value:"
        value={truncateNumber(listForSaleState.position.currentValue)}
      ></Info>

<<<<<<< HEAD
      <ListenPrice state={listForSaleState} />
      <BuyNowPrice state={listForSaleState} />
      <Info
        label="Discount:"
        value={
          formatFixed(
            listForSaleState.offer.calculateDiscount?.(listForSaleState.marketItem.position),
            { decimals: 2 },
          ) + '%'
        }
      ></Info>
=======
      <CurrencySelector state={listForSaleState}></CurrencySelector>
      <BuyNowPrice state={listForSaleState} />
      <ListenPrice state={listForSaleState} />
      <Deadline state={listForSaleState} />
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
>>>>>>> 5b8c2fabfe3fdf2264e3679e12c51bb9e925fec1

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

const Deadline = (props: { state: ListForSaleState }) => {
  const { marketItem, setPrice } = props.state
  const chainId = useCurrentSupportedNetworkId()
  return (
    <HStack justifyContent={'center'} width={'full'}>
      <Text textColor={'text.low'} textAlign={'right'} fontWeight="bold" width={'full'}>
        Deadline:
      </Text>
      <Box width={'full'}>
        <Input
          width={'full'}
          height={'30px'}
          padding={2}
          borderRadius="full"
          type="date"
          onChange={({ target }) => {
            props.state.setDeadline(
              BigNumber.from(`` + (target.valueAsDate.getTime() / 1000).toPrecision()),
            )
          }}
        ></Input>
      </Box>
    </HStack>
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
<<<<<<< HEAD

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
=======
const BuyNowPrice = (props: { state: ListForSaleState }) => {
  const { marketItem, setPrice } = props.state
  const chainId = useCurrentSupportedNetworkId()
  return (
    <HStack justifyContent={'center'} width={'full'}>
      <Text textColor={'text.low'} textAlign={'right'} fontWeight="bold" width={'full'}>
        Price:
      </Text>
      <Box width={'full'}>
        <NumericInput
          width={'full'}
          shadow={'Down Big'}
          borderRadius={'full'}
          value={props.state.price.toSignificant(5)}
          p={1}
          pl={4}
          onValueChange={(values, sourceInfo) => {
            if (sourceInfo.source === 'prop') return
            const value = values.value || '0'
            setPrice(toAmount(value, props.state.price.currency))
          }}
        />
      </Box>
    </HStack>
  )
}
const CurrencySelector = (props: { state: ListForSaleState }) => {
  const { marketItem, setPrice } = props.state
  const chainId = useCurrentSupportedNetworkId()
  return (
    <HStack justifyContent={'center'} width={'full'}>
      <Text textColor={'text.low'} textAlign={'right'} fontWeight="bold" width={'full'}>
        Currency:
      </Text>
      <Box width={'full'}>
        <SelectAMMCurrency
          selected={props.state.price.currency}
          onSelect={(token) => {
            props.state.setPrice(CurrencyAmount.fromRawAmount(token, `0`))
          }}
        ></SelectAMMCurrency>
      </Box>
    </HStack>
  )
}

>>>>>>> 5b8c2fabfe3fdf2264e3679e12c51bb9e925fec1
const Info = ({ label, value }: { label: string; value: string }) => {
  return (
    <HStack justifyContent={'center'} width={'full'}>
      <Text textColor={'text.low'} textAlign={'right'} fontWeight="bold" width={'full'}>
        {label}
      </Text>

      <Box width={'full'}>
        <Flex
          width={'full'}
          // shadow={'Up Small'}
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
