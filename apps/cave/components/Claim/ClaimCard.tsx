import { Button, Card, Center, Stack, Text } from "@concave/ui";
export function ClaimCard( { userAddress: string })
{    
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
        <Stack align="center"  direction="row" justify="space-between" w="80%">
        
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
         Redeem aCNV
        </Button>
        <Text color="text.low">aCNV Balance: 50</Text>
        </Stack>
        <Stack align="center" direction="row" justify="space-between" w="80%" >

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
        </Stack>
      </Card>
    )
}