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
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { concaveProvider } from 'lib/providers'
import { useEffect, useState } from 'react'
import { formatFixed } from 'utils/formatFixed'
import { toAmount } from 'utils/toAmount'
import { chain, useAccount, useSignTypedData } from 'wagmi'
import { ConfirmSignature } from './ConfirmSignature'
import { Info } from './Info'
import { UserMarketInfoState } from './useMarketPlaceInfo'

type UserListPositionCardProps = { marketItemState: UserMarketInfoState }

type ListForSaleState = ReturnType<typeof useListeForSaleState>

export const useListeForSaleState = ({ marketItemState }: UserListPositionCardProps) => {
  const [signature, setSignature] = useState(``)
  const stakingPosition = marketItemState.stakingPosition
  const { address: seller } = useAccount()
  const [marketItem, setMarketItem] = useState(
    new MarketItem({
      seller,
      erc721: stakingPosition.address,
      erc20: CNV_ADDRESS[stakingPosition.chainId],
      tokenId: stakingPosition.tokenId.toString(),
      startPrice: stakingPosition.currentValue,
      endPrice: 0,
      start: 0,
      deadline: stakingPosition.maturity,
      isListed: false,
      signature: '',
    }),
  )
  const cavemart = new FixedOrderMarketContract(concaveProvider(chain.rinkeby.id))
  const { signTypedDataAsync } = useSignTypedData({
    domain: {
      name: 'Cavemart',
      version: '1',
      chainId: chain.rinkeby.id,
      verifyingContract: FIXED_ORDER_MARKET_CONTRACT[chain.rinkeby.id],
    },
    types: {
      Swap: [
        { name: 'seller', type: 'address' },
        { name: 'erc721', type: 'address' },
        { name: 'erc20', type: 'address' },
        { name: 'tokenId', type: 'uint256' },
        { name: 'startPrice', type: 'uint256' },
        { name: 'endPrice', type: 'uint256' },
        { name: 'start', type: 'uint256' },
        { name: 'deadline', type: 'uint256' },
      ],
    },
    value: {
      seller: marketItem.seller,
      erc721: marketItem.erc721,
      erc20: marketItem.erc20,
      tokenId: marketItem.tokenId.toString(),
      startPrice: marketItem.startPrice.toString(),
      endPrice: marketItem.endPrice.toString(),
      start: marketItem.start.toString(),
      deadline: marketItem.deadline.toString(),
    },
  })

  const create = async () => {
    try {
      marketItemState.setWaiting(true)
      const data = await signTypedDataAsync()
      const signature = data.substring(2)
      const computedSigner = await cavemart.computeSigner(marketItem.new({ signature }))
      if (computedSigner !== marketItem.seller) {
        throw `Invalid signature`
      }
      setSignature(signature)
    } catch (e) {
      console.error(e)
    }
    marketItemState.setWaiting(false)
  }

  return {
    method: `Sale`,
    stakingPosition,
    marketItem,
    signature,
    clearSignature: () => setSignature(``),
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
  onClose,
}: {
  listForSaleState: ListForSaleState
  onClose: () => void
}) => {
  if (listForSaleState.signature) {
    return (
      <ConfirmSignature
        {...listForSaleState}
        onClose={() => {
          listForSaleState.clearSignature()
          onClose()
        }}
      />
    )
  }
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
      <Info
        label="Discount:"
        value={
          formatFixed(
            listForSaleState.stakingPosition.calculateDiscount(listForSaleState.marketItem),
            { decimals: 2 },
          ) + '%'
        }
      ></Info>
      <Flex pt={4} justifyContent="center">
        <ChooseButton onClick={listForSaleState.create} title={`List`} backgroundType="blue" />
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
          value={new Date(props.state.marketItem.deadline.mul(1000).toNumber())
            .toISOString()
            .substring(0, 10)}
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

const BuyNowPrice = ({ state }: { state: ListForSaleState }) => {
  const { setPrice } = state

  const chainId = useCurrentSupportedNetworkId()
  const [value, setValue] = useState(formatFixed(state.stakingPosition.currentValue.toString()))

  useEffect(() => {
    if (value) setPrice(toAmount(value, CNV[chainId]))
  }, [value])

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
          value={value}
          p={1}
          pl={4}
          onValueChange={(values, sourceInfo) => {
            if (sourceInfo.source === 'prop') return
            setValue(values.value)
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
          onSelect={(token) => state.setPrice(CurrencyAmount.fromRawAmount(token, `0`))}
        ></SelectAMMCurrency>
      </Box>
    </HStack>
  )
}
