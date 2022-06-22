import { Button, Card, Flex, Heading, Text } from '@concave/ui'
import { ButtonLink } from 'components/ButtonLink'
import React from 'react'
import { MdOutlineDashboard } from 'react-icons/md'

export function BondableAssets() {
  return (
    <Card
      p={5}
      gap={2}
      variant="primary"
      h="fit-content"
      shadow="Block Up"
      w="100%"
      maxW="506px"
      height="352px"
    ></Card>
  )
}
