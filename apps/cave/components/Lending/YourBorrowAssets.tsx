import React from 'react'
import { Card } from '@concave/ui'
import { FromInput, ToInput } from 'components/Lending/yourborrowassetsinfo'

export function YourBorrowAssetsCard({ buttonLabel }) {
  return (
    <Card shadow="up">
      <Card px={10} py={8} gap={4}>
        <FromInput />
        <ToInput />
      </Card>
    </Card>
  )
}

export default YourBorrowAssetsCard
