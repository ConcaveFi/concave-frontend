import {
  CNV,
  Currency,
  CurrencyAmount,
  FIXED_ORDER_MARKET_CONTRACT,
  STAKING_CONTRACT,
} from '@concave/core'
import { FixedOrderMarketContract, SwapMetadata } from '@concave/marketplace'
import { Box, Button, Flex, HStack, Input, NumericInput, Text, VStack } from '@concave/ui'
import { SelectAMMCurrency } from 'components/CurrencySelector/SelectAMMCurrency'
import { ChooseButton } from 'components/Marketplace/ChooseButton'
import { BigNumber } from 'ethers'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { concaveProvider } from 'lib/providers'
import { useState } from 'react'
import { toAmount } from 'utils/toAmount'
import { truncateNumber } from 'utils/truncateNumber'
import { chain, useAccount, useSignTypedData } from 'wagmi'

import { UserMarketInfoState } from './LockPosition/MarketLockInfo/useMarketPlaceInfo'

type UserListPositionCardProps = { marketItemState: UserMarketInfoState }

type ListForSaleState = ReturnType<typeof useListeForSaleState>

const domain = {
  name: 'MyContractName',
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
    { name: 'endPrice', type: 'uint256' },
    { name: 'nonce', type: 'uint256' },
    { name: 'start', type: 'uint256' },
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
  const value: SwapMetadata = {
    seller,
    erc721: STAKING_CONTRACT[4],
    erc20: price.wrapped.currency.address,
    tokenId: marketItemState.marketItem.data.position.tokenId.toString(),
    startPrice: BigNumber.from(price.wrapped.numerator.toString()).toString(),
    endPrice: BigNumber.from(0).toString(),
    start: BigNumber.from(0).toString(),
    deadline,
  }

  const { signTypedDataAsync } = useSignTypedData({
    types: {
      MyFunction: [{ name: 'owner', type: 'address' }],
    },
    domain,
    value: {
      owner: value.seller,
    },
  })

  const create = () => {
    signTypedDataAsync()
      .then(async (data) => {
        const signature = data.substring(2)
        const r = `0x${signature.substring(0, 64)}`
        const s = `0x${signature.substring(64, 128)}`
        const v = parseInt(signature.substring(128, 130), 16)
        const cavemart = new FixedOrderMarketContract(concaveProvider(chain.rinkeby.id))
        const user = await cavemart.computeSigner({ r, s, v, value })
        console.log(`user`, user)
        console.log(`works`, user === value.seller)
      })
      .catch(console.error)
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
      <Type state={listForSaleState} />
      <Info
        label="Current value:"
        value={truncateNumber(listForSaleState.position.currentValue)}
      ></Info>

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
