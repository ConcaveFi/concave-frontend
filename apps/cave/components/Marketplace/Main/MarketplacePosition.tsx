import { Box, Flex, Image, Popover, PopoverContent, PopoverTrigger, Text } from '@chakra-ui/react'
import { CurrencyAmount, FIXED_ORDER_MARKET_CONTRACT, NATIVE, Percent } from '@concave/core'
import { LockedIcon, UnlockedIcon } from '@concave/icons'
import { FixedOrderMarketContract, StakingPosition } from '@concave/marketplace'
import {
  Button,
  ButtonProps,
  Card,
  CardProps,
  FlexProps,
  gradientBorder,
  HStack,
  Spinner,
  useDisclosure,
} from '@concave/ui'
import { useCurrencyButtonState } from 'components/CurrencyAmountButton/CurrencyAmountButton'
import { usePositionDiscount } from 'components/StakingPositions/LockPosition/MarketLockInfo/usePositionDiscount'
import { differenceInDays, format, formatDistanceToNowStrict } from 'date-fns'
import { useTransaction } from 'hooks/TransactionsRegistry/useTransaction'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { concaveProvider } from 'lib/providers'
import { useMemo } from 'react'
import { compactFormat, formatFixed } from 'utils/formatFixed'
import { useAccount, useSigner } from 'wagmi'

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
  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <Popover placement="right" isOpen={isOpen}>
      <PopoverTrigger>
        <Flex
          onMouseOver={onOpen}
          onMouseOut={onClose}
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
          gap={2}
          justify="space-between"
        >
          <HStack align="center" gap={0} width={'full'} justify="space-between">
            <ImageContainer w={'250px'} h={'59px'} stakingPosition={stakingPosition} px={3} />
            <Info title="Current value" info={`${currentValue} CNV`} />
            <Info
              title="Discount"
              info={
                discount.discount
                  ? `${formatFixed(discount.discount, { decimals: 2, places: 0 })}%`
                  : '-'
              }
              isLoading={discount.isLoading}
            />

            {/* <Info title="Token id" info={stakingPosition.tokenId.toString()} /> */}
            <BuyContainer w={'210px'} stakingPosition={stakingPosition} />
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
          onMouseLeave={onClose}
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
            <Text>{formatDistanceToNowStrict(positionDate, { addSuffix: true })} </Text>
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
      <Info info={`${stakingPosition.tokenId}`} title="Token id" ml={2} />
      <Flex>
        <Image
          width={'auto'}
          height={{ base: '90px', lg: '70px' }}
          alt={`Image of stake ${label}`}
          src={`/assets/marketplace/${stakeImage[stakingPosition.poolID]}`}
        />
      </Flex>
      <Info info={`${label}`} title="Stake period" ml={2} />
    </Flex>
  )
}

type BuyContainerProps = { stakingPosition: StakingPosition } & CardProps
const BuyContainer = ({ stakingPosition, ...boxProps }: BuyContainerProps) => {
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

  const useCurrencyState = useCurrencyButtonState(price, FIXED_ORDER_MARKET_CONTRACT[chainId], {
    amountInfo: true,
  })

  const buttonProps = useMemo(() => {
    if (account.address === stakingPosition.market.seller) {
      return {
        children: 'Your listing',
        minWidth: '45%',
        _hover: {},
        m: -0.5,
        borderWidth: 0,
        disabled: true,
      } as ButtonProps
    }
    if (swap.isWaitingForConfirmation)
      return { loadingText: 'Confirm', isLoading: true, minWidth: '45%' }

    if (swap.isWaitingTransactionReceipt)
      return { loadingText: 'Waiting', isLoading: true, minWidth: '45%' }

    if (swap.isSucess) {
      return { children: 'Bought', minWidth: '45%' }
    }
    if (swap.isError) {
      return { children: 'Unavailable', minWidth: '45%' }
    }
    if (useCurrencyState.approved) {
      return {
        onClick: swap.sendTx,
        children: 'Buy',
        minWidth: '45%',
        fontSize: 'xl',
        m: -0.5,
      }
    }

    if (useCurrencyState.state === 'default') {
      return {
        ...useCurrencyState.buttonProps,
        m: -0.5,
        minWidth: '45%',
      }
    }

    return {
      ...useCurrencyState.buttonProps,
      my: 0,
      p: 2,
      variant: ``,
      borderWidth: 0,
      minWidth: '100%',
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
    <Card
      p={0.5}
      h={'full'}
      rounded={'2xl'}
      {...boxProps}
      boxShadow={'Up Big'}
      sx={{ ...gradientBorder({ borderWidth: 1 }) }}
    >
      <Flex w="auto" h={'59px'} rounded={'2xl'} shadow="up" justify="end">
        {buttonProps.minWidth === '45%' && (
          <HStack flex={1} align="center" mr={6} justify="center">
            <Flex direction={'column'} fontWeight={'bold'} p={2}>
              <Text fontSize={'12px'} color="text.low" mr={`auto`}>
                Price
              </Text>
              <Text
                fontSize={'14px'}
                noOfLines={1}
                title={
                  formatFixed(price.quotient.toString(), {
                    ...currency,
                    places: 6,
                  }) + ` ${currency.symbol}`
                }
              >
                {compactFormat(price.quotient.toString(), currency) + ` ${currency.symbol}`}
              </Text>
            </Flex>
          </HStack>
        )}
        <Button
          boxShadow={'Up Big'}
          px={2}
          h={'63px'}
          rounded={'2xl'}
          variant={'primary.outline'}
          {...buttonProps}
        />
      </Flex>
    </Card>
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
            bg={'linear-gradient(90deg, #375FC2 0%, #46CFF3 100%)'}
            rounded="full"
          />
        </Box>
      </Flex>
      <UnlockedIcon />
    </HStack>
  )
}
type InfoProps = { title: string; info: string; isLoading?: boolean }
const Info = ({ info, title, isLoading, ...flexProps }: InfoProps & FlexProps) => (
  <Flex direction={'column'} align="center" {...flexProps}>
    <Text fontSize={'12px'} color="text.low">
      {title}
    </Text>
    <Text fontWeight={'bold'} fontSize={'18px'}>
      {isLoading && <Spinner size="xs" />}
      {info}
    </Text>
  </Flex>
)
