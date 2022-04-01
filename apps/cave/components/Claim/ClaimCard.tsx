import { Button, Card, Center, Stack, Text } from '@concave/ui'
import { useAuth } from 'contexts/AuthContext'
import { useEffect, useState } from 'react'
import { useBalance, useContractWrite } from 'wagmi'
import { aCNVredeemabi } from 'lib/contractoABI'

export function ClaimCard() {
  const { user } = useAuth()
  // const [{ data, error, loading }, getaCNVBalance] = useBalance({
  //   addressOrName: user.address,
  //   token: '0x2A6bb78490c2221E0D36d931192296BE4b3A01F1', // INSERT aCNV ADDRESS
  // })
  const [{ data, error, loading }, write] = useContractWrite(
    {
      addressOrName: '0x3bc60dc5936fa22f23656f1fe8b7831e51faa65c',
      contractInterface: aCNVredeemabi,
    },
    'redeem',
    {
      args: [user.address],
    },
  )
  const [redeemText, setRedeemText] = useState('Redeem aCNV')
  const [redeeming, setRedeeming] = useState(false)

  useEffect(() => {
    console.log(`data:${data}`)
    console.log(`error:${error}`)
  }, [data, error])

  const redeemAncv = () => {
    setRedeeming(loading ? true : false)
    setRedeemText(loading ? 'Redeeming' : 'Redeemed')
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
          isLoading={redeeming}
          loadingText="Redeeming"
          onClick={redeemAncv}
        >
          {redeemText}
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
