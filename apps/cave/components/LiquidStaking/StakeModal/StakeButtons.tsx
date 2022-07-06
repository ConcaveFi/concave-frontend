import { Box, Button } from '@concave/ui'

function StakeButtons(props: any) {
  return (
    <Box w="350px">
      <Box px={3}>
        <Button
          onClick={() => console.log('Approve')}
          fontWeight="bold"
          fontSize="md"
          variant="primary.outline"
          bgGradient="linear(90deg, #72639B 0%, #44B9DE 100%)"
          w="100%"
          h="40px"
          size="large"
          mx="auto"
        >
          Approve
        </Button>

        <Button
          mt={5}
          onClick={() => console.log('Stake CNV')}
          fontWeight="bold"
          fontSize="md"
          variant="primary.outline"
          bgGradient="linear(90deg, #72639B 0%, #44B9DE 100%)"
          w="100%"
          h="40px"
          size="large"
          mx="auto"
        >
          Stake CNV
        </Button>
      </Box>
    </Box>
  )
}

export default StakeButtons
