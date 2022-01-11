import React from 'react'
import Image from 'next/image'
import { Text, Button, HStack, Stack } from '@chakra-ui/react'
import { ButtonLink, ButtonLinkProps } from 'components/ButtonLink'
import { Card } from 'components/Card'
import colors from 'theme/colors'
import { FromInput, ToInput } from './Input'

const BuyNavButton = ({
  iconPath,
  label,
  subLabel,
  isActive,
  ...props
}: ButtonLinkProps & { iconPath: string; label: string; subLabel: string }) => (
  <ButtonLink
    {...props}
    isActive={isActive}
    variant="navigation"
    textColor={isActive ? 'text.1' : 'text.3'}
  >
    <Stack p={3}>
      <Image src={iconPath} width={48} height={48} alt="" color="red" />
      <Text fontSize={24}>{label}</Text>
      <Text>{subLabel}</Text>
    </Stack>
  </ButtonLink>
)

const BuyNav = ({ active }) => (
  <HStack spacing={0}>
    <BuyNavButton
      isActive={active === 'swap'}
      href="/swap"
      iconPath="/icons/swap.svg"
      label="Swap"
      subLabel="~$3,214"
    />
    <BuyNavButton
      isActive={active === 'discount'}
      href="/discount"
      iconPath="/icons/discount.svg"
      label="Discount"
      subLabel="~$3,214"
    />
    <BuyNavButton
      isActive={active === 'zap'}
      href="/zap"
      iconPath="/icons/zap.svg"
      label="Zap"
      subLabel="~$3,214"
    />
  </HStack>
)

export function BuyCard({ buttonLabel }) {
  return (
    <Card shadow="up" bgGradient={colors.gradients.green}>
      <BuyNav active="swap" />
      <Card px={10} py={8} gap={4}>
        <FromInput />
        <ToInput />
        <Button variant="primary" size="large" fontSize={24} isFullWidth>
          {buttonLabel}
        </Button>
      </Card>
    </Card>
  )
}

export default BuyCard
