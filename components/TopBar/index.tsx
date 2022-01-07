import { HStack, Container, Flex, Heading, Button, Box, Image, Text } from '@chakra-ui/react'
import colors from 'theme/colors'
import { Balance } from './Balance'
import { ConnectWallet } from './ConnectWallet'
import { ToggleTheme } from './ToggleTheme'
import { Router, useRouter } from 'next/router'
import navStyles from './navbar.module.css'

export const TopBar = () => {
  const router = useRouter()

  return (
    <div className={navStyles.mobileNav}>
      <Box as="header">
        <Image
          src={'/images/lines.svg'}
          alt="top bar background"
          maxWidth="1440px"
          maxHeight="100px"
          position="absolute"
        />

        {/* bg="green.500"> */}
        <Container maxWidth="container.xl">
          <Flex alignItems={'center'} justifyContent="space-between">
            <Heading as="h1">
              <Image
                src={'/images/CNV_white_svg.svg'}
                alt="concave logo"
                maxWidth="100px"
                maxHeight="120px"
                position="relative"
              />
            </Heading>

            <HStack gap="0">
              <Button
                onClick={() => router.push('/swap')}
                variant={'ghost'}
                size="medium"
                w={130}
                maxHeight="200px"
                _hover={{
                  background: 'radial_reflection',
                }}
                _active={{ background: 'radial_reflection' }}
              >
                Get gCNV
              </Button>
              <Button
                onClick={() => router.push('/placeholder_lending')}
                variant={'ghost'}
                size="medium"
                w={185}
                _active={{ background: 'radial_reflection' }}
                _hover={{ background: 'radial_reflection' }}
                borderRadius="1x1"
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
    </div>
  )
}
