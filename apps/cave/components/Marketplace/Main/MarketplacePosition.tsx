import { Box, Flex, Image, Popover, PopoverContent, PopoverTrigger, Text } from '@chakra-ui/react'
import { Currency, CurrencyAmount, MARKETPLACE_CONTRACT, NATIVE, Percent } from '@concave/core'
import { LockedIcon, UnlockedIcon } from '@concave/icons'
import { FixedOrderMarketContract, StakingPosition } from '@concave/marketplace'
import { FlexProps, gradientBorder, HStack, Spinner } from '@concave/ui'
import { BuyButton } from 'components/BuyButton/BuyButton'
import { useCurrencyButtonState } from 'components/CurrencyAmountButton/CurrencyAmountButton'
import { usePositionDiscount } from 'components/StakingPositions/LockPosition/MarketLockInfo/usePositionDiscount'
import { differenceInDays, format, formatDistanceToNowStrict } from 'date-fns'
import { useTransaction } from 'hooks/TransactionsRegistry/useTransaction'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { concaveProvider } from 'lib/providers'
import { useMemo, useState } from 'react'
import { compactFormat, formatFixed } from 'utils/formatFixed'
import { useAccount, useSigner } from 'wagmi'
import { ConfirmPurchaseModal } from './ConfirmBuy'

const border = gradientBorder({ borderWidth: 2 })

type MarketplacePositionProps = { stakingPosition: StakingPosition }
export const MarketplacePosition: React.FC<MarketplacePositionProps> = ({ stakingPosition }) => {
  const currentValue = compactFormat(stakingPosition?.currentValue)
  const positionDate = new Date(stakingPosition.maturity * 1000)
  const deadlineDate = new Date(stakingPosition.market.deadline.mul(1000).toNumber())
  const relativePositionTime = formatDistanceToNowStrict(positionDate, { unit: 'day' })
  const days = stakingPosition.pool.days
  const diff = (differenceInDays(positionDate, Date.now()) - days) * -1
  const percentToMaturity = new Percent(diff, days)
  const discount = usePositionDiscount(stakingPosition)
  const [active, setActive] = useState(false)
  return (
    <Popover placement="right" trigger="hover">
      <PopoverTrigger>
        <Flex
          width={'full'}
          rounded={'2xl'}
          shadow="up"
          transition={`0.15s`}
          bg="url(assets/textures/metal.png), linear-gradient(180deg, #16222E 0.7%, #28394D 55.07%)"
          bgPos={'50% 50%, 0px 0px'}
          bgSize="120px, auto"
          direction={'column'}
          _hover={{
            boxShadow: 'Blue Light',
            ...border,
          }}
          p={1.5}
          px={2.5}
          gap={1.5}
          justify="space-between"
          onMouseOver={() => setActive(true)}
          onMouseLeave={() => setActive(false)}
        >
          <HStack align="center" gap={0} width={'full'} justify="space-between">
            <ImageContainer w={'250px'} h={'60px'} stakingPosition={stakingPosition} px={4} />
            <Info title="Current value" info={`${currentValue} CNV`} />
            <Info
              title="Discount"
              color={discount.discount > 0 ? '#7AF0CD' : `red.700`}
              info={
                discount.discount
                  ? `${formatFixed(discount.discount, { decimals: 2, places: 0 })}%`
                  : '-'
              }
              isLoading={discount.isLoading}
            />

            {/* <Info title="Token id" info={stakingPosition.tokenId.toString()} /> */}
            <BuyContainer active={active} stakingPosition={stakingPosition} />
          </HStack>
          <LoadBard
            date={format(positionDate, 'MM/dd/yyyy')}
            relativeDate={relativePositionTime}
            percent={percentToMaturity}
          />
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

const stakeImage = {
  0: '12mposition.png',
  1: '6mposition.png',
  2: '3mposition.png',
  3: '1mposition.png',
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
          src={`/assets/marketplace/${stakeImage[stakingPosition.poolID]}`}
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
  const swap = useTransaction(
    async () => {
      const contract = new FixedOrderMarketContract(concaveProvider(stakingPosition.chainId))
      return contract.swap(signer, stakingPosition.market)
    },
    { meta: { type: 'offer marketplace', tokenId: +tokenId.toString() }, onError: console.error },
  )

  const useCurrencyState = useCurrencyButtonState(price, MARKETPLACE_CONTRACT[chainId], {
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
    if (swap.isSucess) return { children: 'Bought', disabled: true }
    if (swap.isError) return { children: 'Unavailable', disabled: true }
    if (useCurrencyState.approved) {
      return {
        showPrice: true,
        onClick: swap.sendTx,
        children: 'Buy',
        fontSize: 'lg',
      }
    }

    if (useCurrencyState.state === 'default')
      return {
        ...useCurrencyState.buttonProps,
        showPrice: true,
        fontSize: '14px',
      }

    return {
      ...useCurrencyState.buttonProps,
    }
  }, [
    account.address,
    stakingPosition.market.seller,
    swap.isError,
    swap.isSucess,
    swap.isWaitingForConfirmation,
    swap.isWaitingTransactionReceipt,
    swap.sendTx,
    useCurrencyState.approved,
    useCurrencyState.buttonProps,
    useCurrencyState.state,
  ])
  return (
    <>
      <ConfirmPurchaseModal isOpen={swap.isWaitingForConfirmation} staking={stakingPosition} />
      <BuyButton
        boxShadow={'Up Big'}
        shadow="up"
        variant={active ? 'primary' : 'primary.outline'}
        colorScheme={'brighter'}
        w={`180px`}
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
type LoadBarProps = { percent: Percent; date: string; relativeDate: string }
const LoadBard = ({ percent, date, relativeDate }: LoadBarProps) => {
  return (
    <HStack mx={2}>
      <LockedIcon h={`18px`} w={'18px'} />
      <Flex w={'full'} mx="auto" rounded={'2xl'} shadow="down" h={3} p={0.5}>
        <Box
          width={`100%`}
          height="full"
          backgroundImage={'/assets/liquidstaking/progress.svg'}
          backgroundRepeat={'repeat-x'}
          rounded="full"
          backgroundPosition={'center'}
        >
          <Box
            width={`${percent.toFixed()}%`}
            maxW={`full`}
            height="full"
            bg={'stroke.accent'}
            rounded="full"
          />
        </Box>
      </Flex>
      <UnlockedIcon />
    </HStack>
  )
}
type InfoProps = { title: string; info: string; isLoading?: boolean }
const Info = ({ info, title, isLoading, color, ...flexProps }: InfoProps & FlexProps) => (
  <Flex direction={'column'} align="center" {...flexProps}>
    <Text fontSize={'xs'} color="text.low">
      {title}
    </Text>
    <Text color={color} fontWeight={'bold'} fontSize={'sm'}>
      {isLoading && <Spinner size="xs" />}
      {info}
    </Text>
  </Flex>
)
