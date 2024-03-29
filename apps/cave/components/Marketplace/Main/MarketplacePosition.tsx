import { Box, Flex, Image, Popover, PopoverContent, PopoverTrigger, Text } from '@concave/ui'
import { Currency, CurrencyAmount, MARKETPLACE_CONTRACT, NATIVE, Percent } from '@concave/core'
import { FixedOrderMarketContract, StakingPosition } from '@concave/marketplace'
import { FlexProps, gradientBorder, HStack, Spinner } from '@concave/ui'
import { BuyButton } from 'components/BuyButton/BuyButton'
import { useCurrencyApprove } from 'components/CurrencyAmountButton/CurrencyAmountButton'
import { ProgressBar } from 'components/ProgressBar'
import { differenceInDays, format, formatDistanceToNowStrict } from 'date-fns'
import { useTransaction } from 'hooks/useTransaction'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useMemo } from 'react'
import { compactFormat, formatFixed } from 'utils/bigNumberMask'
import { useAccount, useProvider, useSigner } from 'wagmi'
import { ConfirmPurchaseModal } from './ConfirmBuy'
import { poolImages } from 'utils/poolImages'

type MarketplacePositionProps = { stakingPosition: StakingPosition; isActive?: boolean } & FlexProps
export const MarketplacePosition: React.FC<MarketplacePositionProps> = ({
  stakingPosition,
  isActive,
  ...flexProps
}) => {
  const currentValue = compactFormat(stakingPosition?.currentValue)
  const positionDate = new Date(stakingPosition.maturity * 1000)
  const deadlineDate = new Date(stakingPosition.market.deadline.mul(1000).toNumber())
  const days = stakingPosition.pool.days
  const diff = (differenceInDays(positionDate, Date.now()) - days) * -1
  const percentToMaturity = new Percent(diff, days)

  return (
    <Popover trigger="hover" isOpen={isActive}>
      <PopoverTrigger>
        <Flex
          width={'full'}
          rounded={'2xl'}
          shadow="up"
          bg="bg.primary"
          bgPos={'50% 50%, 0px 0px'}
          bgSize="120px, auto"
          direction={'column'}
          p={2.5}
          px={2.5}
          gap={1.5}
          justify="space-between"
          {...flexProps}
        >
          <HStack flex={1} gap={2} justify="space-between" flexWrap={`wrap`}>
            <ImageContainer
              w={['100%', '100%', '100%', '250px']}
              h={'60px'}
              stakingPosition={stakingPosition}
            />
            <Info title="Current value" info={`${currentValue} CNV`} />
            <BuyContainer active={isActive} stakingPosition={stakingPosition} />
          </HStack>
          <ProgressBar percent={percentToMaturity} />
        </Flex>
      </PopoverTrigger>
      <PopoverContent w={'350px'}>
        <Flex
          direction={'column'}
          p={4}
          rounded="inherit"
          apply={'background.glass'}
          shadow="up"
          fontWeight="bold"
          borderRadius={'2xl'}
          justifyContent={'left'}
          sx={{ ...gradientBorder({ borderWidth: 1 }) }}
        >
          <HStack>
            <Text color="text.low">Listing expiration date:</Text>
            <Text> {formatDistanceToNowStrict(deadlineDate, { addSuffix: true })}</Text>
          </HStack>
          <HStack>
            <Text color="text.low">Redeem date:</Text>
            <Text> {format(positionDate, 'MM/dd/yyyy')}</Text>
            <Text color={'#79B2F4'}>
              {formatDistanceToNowStrict(positionDate, { addSuffix: true })}{' '}
            </Text>
          </HStack>
        </Flex>
      </PopoverContent>
    </Popover>
  )
}

type ImageContainerProps = { stakingPosition: StakingPosition } & FlexProps
const ImageContainer: React.FC<ImageContainerProps> = ({ stakingPosition, ...flexProps }) => {
  const label = `${stakingPosition.pool.days} Days`
  return (
    <Flex
      align={'center'}
      rounded={'2xl'}
      shadow="Down Medium"
      justify="space-around"
      {...flexProps}
    >
      <Info info={`${stakingPosition.tokenId}`} title="Token id" />
      <Flex>
        <Image
          width={'auto'}
          height={{ base: '90px', lg: '70px' }}
          alt={`Image of stake ${label}`}
          src={`/assets/marketplace/${poolImages[stakingPosition.poolID]}`}
        />
      </Flex>
      <Info info={`${label}`} title="Stake period" />
    </Flex>
  )
}

type BuyContainerProps = { stakingPosition: StakingPosition; active: boolean }
const BuyContainer = ({ stakingPosition, active = false }: BuyContainerProps) => {
  const chainId = useCurrentSupportedNetworkId()
  const account = useAccount()
  const tokenId = stakingPosition.tokenId
  const market = stakingPosition.market
  const currency = market.currency
  const price = CurrencyAmount.fromRawAmount(
    currency || NATIVE[chainId],
    stakingPosition.market.startPrice.toString(),
  )
  const { data: signer } = useSigner()
  const provider = useProvider()
  const swap = useTransaction(
    async () => {
      const contract = new FixedOrderMarketContract(provider)
      return contract.swap(signer, stakingPosition.market)
    },
    { meta: { type: 'offer marketplace', tokenId: +tokenId.toString() }, onError: console.error },
  )

  const currencyApprove = useCurrencyApprove(price, MARKETPLACE_CONTRACT[chainId], {
    amountInfo: true,
  })

  const buttonProps = useMemo(() => {
    if (account.address === stakingPosition.market.seller)
      return {
        children: 'Your listing',
        disabled: true,
        showPrice: true,
        variant: 'primary.outline',
        fontSize: '14px',
      }
    if (swap.isWaitingForConfirmation)
      return { loadingText: 'Approve in wallet', disabled: true, isLoading: true }
    if (swap.isWaitingTransactionReceipt)
      return { loadingText: 'Waiting confirmation', disabled: true, isLoading: true }
    if (swap.isSucess) return { children: 'Purchased', disabled: true }
    if (swap.isError) return { children: 'Unavailable', disabled: true }
    if (currencyApprove.approved) {
      return {
        showPrice: true,
        onClick: swap.sendTx,
        children: 'Buy',
        fontSize: 'lg',
      }
    }

    if (currencyApprove.state === 'disconected')
      return {
        ...currencyApprove.buttonProps,
        children: 'Buy',
        showPrice: true,
        fontSize: '14px',
      }
    if (currencyApprove.state === 'default')
      return {
        ...currencyApprove.buttonProps,
        showPrice: true,
        fontSize: '14px',
      }

    return {
      ...currencyApprove.buttonProps,
    }
  }, [
    account.address,
    stakingPosition.market.seller,
    swap.isError,
    swap.isSucess,
    swap.isWaitingForConfirmation,
    swap.isWaitingTransactionReceipt,
    swap.sendTx,
    currencyApprove.approved,
    currencyApprove.buttonProps,
    currencyApprove.state,
  ])
  return (
    <>
      <ConfirmPurchaseModal isOpen={swap.isWaitingForConfirmation} staking={stakingPosition} />
      <BuyButton
        boxShadow={'Up Big'}
        shadow="up"
        variant={active ? 'primary' : 'primary.outline'}
        w={['100%', '150px', '180px']}
        size={`md`}
        {...buttonProps}
      >
        {buttonProps[`children`]}
        {buttonProps[`showPrice`] ? <PriceComponent price={price} /> : null}
      </BuyButton>
    </>
  )
}

const PriceComponent = ({ price }: { price: CurrencyAmount<Currency> }) => {
  const currency = price.currency
  const value = price.quotient

  return (
    <Flex w={`full`} direction={'column'} fontWeight={'bold'}>
      <Box>
        <Text fontSize={'12px'} color="text.low" mr={`auto`}>
          Price
        </Text>
        <Text
          fontSize={'14px'}
          noOfLines={1}
          title={
            formatFixed(value.toString(), {
              ...currency,
              places: 6,
            }) + ` ${currency.symbol}`
          }
        >
          {`${compactFormat(value.toString(), currency)} ${currency.symbol}`}
        </Text>
      </Box>
    </Flex>
  )
}

type InfoProps = { title: string; info: string; isLoading?: boolean }
const Info = ({ info, title, isLoading, color, ...flexProps }: InfoProps & FlexProps) => (
  <Flex minW={'80px'} direction={'column'} align="center" {...flexProps}>
    <Text fontSize={'xs'} color="text.low">
      {title}
    </Text>
    <Text color={color} fontWeight={'bold'} fontSize={'sm'}>
      {isLoading && <Spinner size="xs" />}
      {info}
    </Text>
  </Flex>
)
