import React from 'react'
import Image from 'next/image'
import { Text, Button, HStack, Stack } from '@chakra-ui/react'
import { ButtonLink, ButtonLinkProps } from 'components/ButtonLink'
import { Card } from 'components/Card'
import colors from 'theme/colors'
import { FromInput, ToInput } from 'components/Lending/yourborrowassetsinfo'




export function YourBorrowAssetsCard({ buttonLabel }) {
  return (
    <Card shadow="up" bgGradient={colors.gradients.green}>
      <Card px={10} py={8} gap={4}>
      <FromInput />
        <ToInput />
      </Card>
    </Card>
  )
}

export default YourBorrowAssetsCard
