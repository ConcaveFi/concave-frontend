import {
  CNV,
  CNV_ADDRESS,
  Currency,
  CurrencyAmount,
  FIXED_ORDER_MARKET_CONTRACT,
} from '@concave/core'
import { FixedOrderMarketContract, MarketItem } from '@concave/marketplace'
import { Box, Button, Flex, HStack, Input, NumericInput, Text, VStack } from '@concave/ui'
import { SelectAMMCurrency } from 'components/CurrencySelector/SelectAMMCurrency'
import { ChooseButton } from 'components/Marketplace/ChooseButton'
import { BigNumber } from 'ethers'
import { formatEther } from 'ethers/lib/utils'
import { useInsert_Cavemart_ListingMutation } from 'graphql/generated/graphql'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { concaveProvider } from 'lib/providers'
import { useState } from 'react'
import { formatFixed } from 'utils/formatFixed'
import { toAmount } from 'utils/toAmount'
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

export const useListeForSaleState = ({ marketItemState }: UserListPositionCardProps) => {
  const stakingPosition = marketItemState.stakingPosition
  const { address: seller } = useAccount()
  const { mutate } = useInsert_Cavemart_ListingMutation()
  const [marketItem, setMarketItem] = useState(
    new MarketItem({
      seller,
      erc721: stakingPosition.address,
      erc20: CNV_ADDRESS[stakingPosition.chainId],
      tokenId: stakingPosition.tokenId.toString(),
      startPrice: stakingPosition.currentValue,
      endPrice: BigNumber.from(0),
      start: BigNumber.from(0),
      nonce: BigNumber.from(0),
      deadline: 0,
      isListed: false,
      signature: '',
    }),
  )

  const { signTypedDataAsync } = useSignTypedData({
    domain,
    types: marketItem.datatypeForSignature,
    value: marketItem.dataForSignature,
  })

  const create = () => {
    signTypedDataAsync()
      .then(async (data) => {
        const signature = data.substring(2)
        const cavemart = new FixedOrderMarketContract(concaveProvider(chain.rinkeby.id))
        const user = await cavemart.computeSigner(marketItem.new({ signature }))
        alert(user)
        if (user != seller) {
          return
        }
        mutate({
          tokenID: marketItem.tokenId.toString(),
          signatureHash: signature,
          start: marketItem.start.toString(),
          startPrice: marketItem.startPrice.toString(),
          tokenOwner: marketItem.seller,
          tokenIsListed: false,
          deadline: marketItem.deadline,
        })
      })
      .catch(console.error)
  }

  return {
    method: `Sale`,
    stakingPosition,
    marketItem,
    create,
    setPrice: (price: CurrencyAmount<Currency>) => {
      setMarketItem(
        marketItem.new({
          startPrice: price.numerator.toString(),
          erc20: price.wrapped.currency.address,
        }),
      )
    },
    setDeadline: (deadline: BigNumber) => setMarketItem(marketItem.new({ deadline })),
  }
}

export const ListPositionForSale = ({
  listForSaleState,
}: {
  listForSaleState: ListForSaleState
}) => {
  return (
    <VStack direction={'column'} gap={1} pt={8} px={8} pb={0}>
      <Type state={listForSaleState} />
      <Info
        label="Current value:"
        value={formatFixed(listForSaleState.stakingPosition.currentValue)}
      ></Info>

      <CurrencySelector state={listForSaleState}></CurrencySelector>
      <BuyNowPrice state={listForSaleState} />
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
          {listForSaleState.method === 'Sale' ? 'Invalid rice' : 'Invalid reserve price'}
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
  const { setPrice } = props.state
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
  const { setPrice } = state
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
          value={formatEther(state.marketItem.startPrice)}
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
const CurrencySelector = ({ state }: { state: ListForSaleState }) => {
  return (
    <HStack justifyContent={'center'} width={'full'}>
      <Text textColor={'text.low'} textAlign={'right'} fontWeight="bold" width={'full'}>
        Currency:
      </Text>
      <Box width={'full'}>
        <SelectAMMCurrency
          selected={CNV[state.stakingPosition.chainId]}
          onSelect={(token) => {
            state.setPrice(CurrencyAmount.fromRawAmount(token, `0`))
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
