import React from 'react'
import { Card } from '@concave/ui'

export function BondCard({ buttonLabel }) {
  console.log('hey', buttonLabel)
  return (
    <Card shadow="up">
      <Card px={10} py={8} gap={4}></Card>
    </Card>
  )
}

export default BondCard
