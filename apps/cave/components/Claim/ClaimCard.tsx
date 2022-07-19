import { Button, Card, Stack } from '@concave/ui'
import { aCNVredeemabi } from 'lib/contractoABI'
import { useAccount, useContractWrite } from 'wagmi'

export function ClaimCard() {
  const { address } = useAccount()
  // const [{ data, error, loading }, getaCNVBalance] = useBalance({
  //   addressOrName: user.address,
  //   token: '0x2A6bb78490c2221E0D36d931192296BE4b3A01F1', // INSERT aCNV ADDRESS
  // })
  //
  const { isLoading: isRedeeming, write } = useContractWrite({
    addressOrName: '0x38baBedCb1f226B49b2089DA0b84e52b6181Ca59',
    contractInterface: aCNVredeemabi,
    functionName: 'redeem',
    args: [address],
  })
  // const [redeemText, setRedeemText] = useState('aCNV')

  const redeemAncv = () => {
    // setRedeemText(isRedeeming ? 'Redeeming' : 'Nothing to Redeem')
    write()
  }
  return (
    <Card
      variant="secondary"
      borderGradient="secondary"
      borderWidth={3}
      p={4}
      width={['100%', '400px', '450px']}
      shadow="Up Big"
      gap={2}
    >
      <Stack align="center" direction="row" justify="space-between" w="80%" alignItems="center">
        <Button
          fontWeight="bold"
          fontSize="md"
          variant="primary.outline"
          bgGradient="linear(90deg, #72639B 0%, #44B9DE 100%)"
          w="50%"
          h="30px"
          size="large"
          mx="moz-initial"
          isLoading={isRedeeming}
          loadingText="Redeeming"
          onClick={redeemAncv}
        >
          aCNV
        </Button>
        {/* <Text color="text.low">aCNV Balance: {loading ? 0 : data?.formatted}</Text> */}
      </Stack>

      {/* <Stack align="center" direction="row" justify="space-between" w="80%" >
      <Button
          mt={5}
          fontWeight="bold"
          fontSize="md"
          variant="primary.outline"
          bgGradient="linear(90deg, #72639B 0%, #44B9DE 100%)"
          w="50%"
          h="30px"
          size="large"
          mx="moz-initial"
          
        >
         Redeem bbtCNV
        </Button>
        <Text color="text.low">bbtCNV Balance: 200</Text>
        </Stack> */}
    </Card>
  )
}
