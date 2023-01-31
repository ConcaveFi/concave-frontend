import { Currency, DAI, FRAX, MARKETPLACE_CONTRACT, NATIVE, USDC } from '@concave/core'
import { DownIcon } from '@concave/icons'
import { FixedOrderMarketContract, MarketItem, StakingPosition } from '@concave/marketplace'
import {
  Box,
  Button,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  Text,
  VStack,
} from '@concave/ui'
import { CurrencyIcon } from 'components/CurrencyIcon'
import { ChooseButton } from 'components/Marketplace/ChooseButton'
import { BigNumber, BigNumberish } from 'ethers'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { concaveProvider } from 'lib/providers'
import { Dispatch, SetStateAction, useCallback } from 'react'
import { formatFixed } from 'utils/bigNumberMask'
import { useSignTypedData } from 'wagmi'
import { BigNumberField } from './BigNumberField'
import { ConfirmSignature } from './ConfirmSignature'
import { ConfirmUnlist } from './ConfirmUnlist'
import { EpochDateField } from './EpochDateField'
import { usePositionDiscount } from './hooks/usePositionDiscount'
import { Info } from './Info'

type ListForSaleState = ReturnType<typeof useListeForSaleState>

export const SaleModal = ({
  market,
  staking,
  state,
  setMarket,
  onClose,
}: {
  onClose: VoidFunction
  staking: StakingPosition
  market: MarketItem
  state: `` | 'list' | 'unlist'
  setMarket: Dispatch<SetStateAction<MarketItem>>
}) => {
  const listForSaleState = useListeForSaleState({ market, setMarket })
  return (
    <Modal
      bluryOverlay
      title=""
      size={'xs'}
      isOpen={state != ''}
      onClose={onClose}
      isCentered
      hideClose
      bodyProps={{
        minW: 350,
        p: 0,
        rounded: '2xl',
        shadow: 'up',
        variant: 'primary',
      }}
    >
      {state === 'list' && (
        <ListPositionForSale
          {...listForSaleState}
          onClose={onClose}
          setMarket={setMarket}
          staking={staking}
        />
      )}
      {state === 'unlist' && (
        <ConfirmUnlist
          {...listForSaleState}
          onClose={onClose}
          setMarket={setMarket}
          staking={staking}
        />
      )}
    </Modal>
  )
}

export type UseListeForSaleState = ReturnType<typeof useListeForSaleState>
export const useListeForSaleState = ({
  market,
  setMarket,
}: {
  market: MarketItem
  setMarket: Dispatch<SetStateAction<MarketItem>>
}) => {
  const chainId = useCurrentSupportedNetworkId()
  const { signTypedDataAsync, isLoading, isIdle } = useSignTypedData({
    domain: {
      name: 'Marketplace',
      version: '1',
      chainId,
      verifyingContract: MARKETPLACE_CONTRACT[chainId],
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
      seller: market.seller,
      erc721: market.erc721,
      erc20: market.erc20,
      tokenId: market.tokenId,
      startPrice: market.startPrice,
      endPrice: market.endPrice,
      start: market.start,
      deadline: market.deadline,
    },
  })

  const create = async () => {
    try {
      const signature = await signTypedDataAsync()
      const marketplaceContract = new FixedOrderMarketContract(concaveProvider(chainId))
      const computedSigner = await marketplaceContract.computeSigner(market.new({ signature }))
      if (computedSigner !== market.seller) throw `Invalid signature`
      setMarket(market.new({ signature }))
    } catch (e) {
      console.error(e)
    }
  }
  const setCurrency = useCallback((currency: Currency) => setMarket((m) => m.new({ currency })), [])

  const setPrice = useCallback(
    (startPrice: BigNumber) => setMarket((m) => m.new({ startPrice })),
    [],
  )
  const setDeadline = useCallback(
    (deadline: BigNumberish) => setMarket((m) => m.new({ deadline })),
    [],
  )

  return {
    isLoading,
    isIdle,
    market,
    create,
    setCurrency,
    setPrice,
    setDeadline,
  }
}

function addDays(date: Date, days: number) {
  var result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export const ListPositionForSale = ({
  isLoading,
  isIdle,
  market,
  staking,
  setMarket,
  onClose,
  create,
  setCurrency,
  setPrice,
  setDeadline,
}: ListForSaleState & {
  staking: StakingPosition
  onClose: VoidFunction
  setMarket: Dispatch<SetStateAction<MarketItem>>
}) => {
  const discount = usePositionDiscount(staking, market)
  const tomorrow = addDays(new Date(), 1)
  const disabled = market.deadline?.mul(1000).lt(Date.now()) || market.startPrice.eq(0)

  if (market.signature) {
    return (
      <ConfirmSignature market={market} staking={staking} setMarket={setMarket} onClose={onClose} />
    )
  }
  return (
    <VStack direction={'column'} justifyContent={'space-between'} gap={1} pt={8} px={8} pb={0}>
      <Type />
      <Info label="Current value:" value={formatFixed(staking.currentValue) + ' CNV'}></Info>
      <CurrencySelector value={market.currency} onChange={setCurrency} />
      <BigNumberField
        label="Price:"
        currency={market.currency}
        onChange={setPrice}
        decimalScale={4}
      />
      <EpochDateField
        label="Deadline:"
        onChange={setDeadline}
        minDate={tomorrow.getTime() / 1000}
        maxDate={staking.maturity}
      />
      {discount.isSuccess && (
        <Info
          label="Discount:"
          value={formatFixed(discount.discount, { decimals: 2 }) + '%'}
        ></Info>
      )}
      <Text textColor={'text.low'} as="em" fontSize={'xs'}>
        1.5% sale fee
      </Text>
      <Flex pt={3} justifyContent="center">
        <ChooseButton
          onClick={create}
          isLoading={!isIdle}
          disabled={disabled}
          loadingText={'Confirm on wallet'}
          title={`List`}
        />
      </Flex>
    </VStack>
  )
}
const Type = () => {
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
          Sale
        </Button>
      </Box>
    </HStack>
  )
}

const CurrencySelector = ({
  value,
  onChange,
}: {
  value: Currency
  onChange: (currency: Currency) => void
}) => {
  return (
    <HStack justifyContent={'center'} width={'full'}>
      <Text textColor={'text.low'} textAlign={'right'} fontWeight="bold" width={'full'}>
        Currency:
      </Text>
      <SelectMarketCurrency selected={value} onSelect={onChange} />
    </HStack>
  )
}

export const SelectMarketCurrency = ({
  selected,
  onSelect,
}: {
  selected?: Currency
  onSelect: (token: Currency) => void
}) => {
  const networkId = useCurrentSupportedNetworkId()
  const currencies = [DAI, NATIVE, USDC, FRAX].map((c) => c[networkId]).filter((c) => c)
  return (
    <Menu>
      <MenuButton
        width={'full'}
        shadow={'Up Big'}
        borderRadius={'full'}
        _active={{
          shadow: 'Down Big',
        }}
        px={4}
        py={1.5}
        as={Button}
        rightIcon={<DownIcon w={`16px`} />}
      >
        <HStack>
          <CurrencyIcon size="xs" currency={selected} />
          <span>{selected.symbol}</span>
        </HStack>
      </MenuButton>
      <MenuList>
        {currencies.map((c) => {
          return (
            <MenuItem key={c.symbol} onClick={() => onSelect(c)} gap={2}>
              <CurrencyIcon size="xs" currency={c} />
              <span>{c.symbol}</span>
            </MenuItem>
          )
        })}
      </MenuList>
    </Menu>
  )
}
