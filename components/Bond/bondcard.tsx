import React from 'react'
import { Card } from 'components/Card'

export function BondCard({ buttonLabel }) {
  return (
    <Card shadow="up">
      <Card px={10} py={8} gap={4}></Card>
    </Card>
  )
}

export default BondCard
