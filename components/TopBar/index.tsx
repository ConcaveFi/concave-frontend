import { HStack, Container, Flex, Heading, Button, Box } from '@chakra-ui/react'
import colors from 'theme/colors'
import { Balance } from './Balance'
import { ConnectWallet } from './ConnectWallet'
import { ToggleTheme } from './ToggleTheme'

export const TopBar = () => {
  return (
    <Box as="header">
      {/* bg="green.500"> */}
      <Container maxWidth="container.xl">
        <Flex py="4" alignItems={'center'} justifyContent="space-between">
          <Heading as="h1">Concave</Heading>
          <HStack gap="1">
            {/* <Balance /> */}
            <Button
              variant={'secondary'}
              bgGradient={colors.gradients.green}
              size="large"
              w={200}
              borderRadius="2xl"
            >
              Dashboard
            </Button>
            <ConnectWallet />
          </HStack>
        </Flex>
      </Container>
    </Box>
  )
}
