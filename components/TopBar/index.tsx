import { HStack, Container, Flex, Heading, Button, Box, Image, Stack, Text } from '@chakra-ui/react'
import colors from 'theme/colors'
import { ButtonLink, ButtonLinkProps } from 'components/ButtonLink'
import { ConnectWallet } from './ConnectWallet'
const NavButton = ({
  label,
  subLabel,

  ...props
}: ButtonLinkProps & { label: string; subLabel: string }) => (
  <ButtonLink {...props} variant="navigation2">
    <Stack p={2}>
      <Text>{label}</Text>
      <Text>{subLabel}</Text>
    </Stack>
  </ButtonLink>
)

const Concave_BTTN = ({
  label,
  iconPath,

  ...props
}: ButtonLinkProps & { iconPath: string; label: string }) => (
  <ButtonLink {...props} variant="navigation_home">
    <HStack p={2} gap="0">
      <Image src={iconPath} width={20} height={20} alt="" positon="relative" />
      <Text fontSize={24}>{label}</Text>
    </HStack>
  </ButtonLink>
)
export const TopBar = () => {
  return (
    <Container
      as="header"
      borderRadius="lg"
      borderWidth="1px"
      bgGradient="linear-gradient(239.18deg, #1B3442 27.18%, #0A161F 96.11%)"
      maxWidth="97.2%"
    >
      <Flex justifyContent="space-between">
        <HStack spacing="0">
          <Concave_BTTN iconPath="/icons/logo.svg" label="Concave" href="/swap "></Concave_BTTN>
          <ButtonLink variant="navigation2" href={'/placeholder_lending'}>
            get gCNV
          </ButtonLink>
          <NavButton href="/swap" label="Dynamic Bond" subLabel="Market"></NavButton>
          <NavButton href="/swap" label="Lending and " subLabel="Borrowing"></NavButton>
        </HStack>
        <HStack gap="1">
          <ButtonLink
            href="/placeholder_dashboard"
            variant="primary.outline"
            bgGradient={colors.gradients.green}
            size="large"
            borderRadius="2xl"
            w={200}
          >
            Dashboard
          </ButtonLink>
          <ConnectWallet />
        </HStack>
      </Flex>
    </Container>
  )
}
