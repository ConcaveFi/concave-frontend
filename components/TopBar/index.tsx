import { HStack, Container, Flex, Heading, Button, Box, Image, Text } from '@chakra-ui/react'
import colors from 'theme/colors'
import { ButtonLink } from 'components/ButtonLink'
import { ConnectWallet } from './ConnectWallet'

export const TopBar = () => {
  return (
    <Box
      as="header"
      sx={{
        position: 'relative',
        height: 105,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          bg: 'url(/images/lines.svg)',
        },
      }}
    >
      {/* <Image
        src={'/images/lines.svg'}
        alt="top bar background"
        maxWidth="1440px"
        maxHeight="100px"
        position="absolute"
      /> */}

      <Container maxWidth="container.xl">
        <Flex justifyContent="space-between" maxHeight="72px">
          <Image
            src={'/images/CNV_white_svg.svg'}
            alt="concave logo"
            maxWidth="100px"
            maxHeight="120px"
            position="relative"
          />

          <HStack spacing="0">
            <ButtonLink variant="navigation" href="/swap">
              Get gCNV
            </ButtonLink>
            <ButtonLink variant="navigation" href={'/placeholder_lending'}>
              Lending and Borrowing
            </ButtonLink>
          </HStack>

          <HStack gap="1">
            <ButtonLink
              href="/placeholder_dashboard"
              variant="secondary"
              bgGradient={colors.gradients.green}
              size="large"
              borderRadius="2xl"
            >
              Dashboard
            </ButtonLink>
            <ConnectWallet />
          </HStack>
        </Flex>
      </Container>
    </Box>
  )
}
