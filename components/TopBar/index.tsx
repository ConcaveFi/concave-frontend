import { HStack, Container, Flex, Heading, Button, Box, Image, Text } from '@chakra-ui/react'
import colors from 'theme/colors'
import { Balance } from './Balance'
import { ConnectWallet } from './ConnectWallet'
import { ToggleTheme } from './ToggleTheme'
import { Router, useRouter } from 'next/router'

export const TopBar = () => {
  const router = useRouter()
  return (
    <Box as="header">
      {/* bg="green.500"> */}
      <Container maxWidth="container.xl">
        <Flex py="4" alignItems={'center'} justifyContent="space-between">
          <Heading as="h1">
            <Image
              src={'/images/CNV_white_svg.svg'}
              alt="concave logo"
              maxWidth="83px"
              maxHeight="62px"
            />
          </Heading>
          <HStack gap="1">
            <Button
              onClick={() => router.push('/swap')}
              variant={'secondary'}
              bgGradient={colors.gradients.green}
              size="large"
              w={200}
              borderRadius="2xl"
            >
              Get CNV
            </Button>
            <Button
              onClick={() => router.push('/placeholder_lending')}
              variant={'secondary'}
              bgGradient={colors.gradients.green}
              size="large"
              w={200}
              borderRadius="2xl"
            >
              Lending and Borrowing
            </Button>
          </HStack>

          <HStack gap="1">
            {/* <Balance /> */}

            <Button
              onClick={() => router.push('/placeholder_dashboard')}
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
