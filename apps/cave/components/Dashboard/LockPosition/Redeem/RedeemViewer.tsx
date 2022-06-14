import { NonFungibleTokenInfo } from '@concave/marketplace'
import { Box, Button, Flex, FlexProps, Text, TextProps } from '@concave/ui'
import { bigNumberMask, createRedeemState } from './UseRedeemState'

interface RedeemCardViewerProps {
  nonFungibleTokenInfo: NonFungibleTokenInfo
}
const RedeemCardViewer = ({ nonFungibleTokenInfo }: RedeemCardViewerProps) => {
  const { curValue, initialBal, gainedAmt, maturity } = createRedeemState({ nonFungibleTokenInfo })
  const readyForReedem = maturity < Date.now() / 1000
  return (
    <Box
      borderRadius="2xl"
      mt={{ lg: 1, md: 3 }}
      mb={3}
      mx={{ base: 0, md: '0px', lg: 2 }}
      pt={{ base: 6, md: 3 }}
      px={{ base: 0, md: 0 }}
      maxW={{ base: '353px', md: '500px', lg: '720px' }}
    >
      <Flex gap={3} flex={1} direction={{ base: 'column', md: 'row' }}>
        <Flex ml={{ lg: 7 }} mx="auto">
          <Info
            label="Current Value"
            valueFontSize={{ base: 'sm', md: 'lg' }}
            value={bigNumberMask(curValue) + ' CNV'}
          />
          <Info
            label="Gained"
            valueFontSize={{ base: 'sm', md: 'lg' }}
            value={bigNumberMask(gainedAmt) + ' CNV'}
          />
          <Info
            label="Initial"
            valueFontSize={{ base: 'sm', md: 'lg' }}
            value={bigNumberMask(initialBal) + ' CNV'}
          />
        </Flex>
        <Button
          size={'md'}
          minW={{ base: '280px', md: '160px' }}
          cursor={!readyForReedem ? 'default' : 'pointer'}
          variant={!readyForReedem ? 'primary.outline' : 'primary'}
          shadow={!readyForReedem ? 'down' : 'up'}
          _hover={{}}
          mx="auto"
          my={'auto'}
          mt="2px"
          _active={readyForReedem && { transform: 'scale(0.9)' }}
          _focus={{}}
        >
          <Text color={!readyForReedem ? 'text.low' : 'white'} fontSize={{ base: '2xl', md: 'sm' }}>
            {!readyForReedem ? 'Not redeemable' : 'Redeem'}
          </Text>
        </Button>
      </Flex>
    </Box>
  )
}

interface Info extends FlexProps {
  label: string
  value: string
  valueFontSize?: TextProps['fontSize']
}
export const Info: React.FC<Info> = ({ ...props }) => {
  return (
    <Flex width={'110px'} direction={'column'} textAlign={{ lg: 'start', md: 'center' }} {...props}>
      <Text color="text.low" fontSize="sm" lineHeight={'12px'} noOfLines={1}>
        {props.label}
      </Text>
      <Text fontSize={props.valueFontSize || 'md'} fontWeight="bold" noOfLines={1}>
        {props.value}
      </Text>
    </Flex>
  )
}
export default RedeemCardViewer
