import { Button, Card, Flex, Heading, Text } from '@concave/ui'
import { ButtonLink } from 'components/ButtonLink'
import React from 'react'
import { MdOutlineDashboard } from 'react-icons/md'

export function AppearancedCard() {
  return (
    <>
      <Card
        p={5}
        gap={4}
        variant="primary"
        h="fit-content"
        shadow="Block Up"
        w="100%"
        maxW="302px"
        height="312px"
      ></Card>
    </>
  )
}
