import { Button, Card, Center, Stack, Text } from '@concave/ui'
import { useAuth } from 'contexts/AuthContext'
import { useEffect, useState } from 'react'
import { useBalance } from 'wagmi'

export function ClaimCard() {
  const { user } = useAuth()
  const [{ data, error, loading }, getaCNVBalance] = useBalance({
    addressOrName: user.address,
    // token: '0x2B8E79CBD58418CE9aeB720BAf6B93825B93eF1F', // INSERT aCNV ADDRESS
  })
  const [redeemText, setRedeemText] = useState('Redeem aCNV')
  const [redeeming, setRedeeming] = useState(false)

  useEffect(() => {
    console.log(`error:${error}`)
  }, [error])

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
          onClick={() => setRedeeming(true)}
        >
          {redeemText}
        </Button>
        <Text color="text.low">aCNV Balance: {loading ? 0 : data?.formatted}</Text>
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
