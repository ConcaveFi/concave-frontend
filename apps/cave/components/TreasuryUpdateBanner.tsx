import { CloseIcon, InfoOutlineIcon } from '@concave/icons'
import { Box, Button, Card, Stack, Text } from '@concave/ui'
import { useState } from 'react'

export function TreasuryUpdateBanner() {
  return (
    <Card
      variant="secondary"
      px={5}
      py={3}
      direction={{ base: 'column', sm: 'row' }}
      display={{ base: 'none', md: 'inline-flex' }}
      align="center"
      rounded="3xl"
      shadow="Up for Blocks"
      pos="relative"
      overflow="visible"
    >
      <InfoOutlineIcon color="text.low" w={10} h={10} />
      <Stack spacing={0} ml={5}>
        <Text fontWeight="bold" whiteSpace="nowrap">
          The app currently does not show the latest treasury values.
        </Text>
        <Text color="text.low" fontSize="sm">
          We have plans to completely redesign the website in the future. Join our Discord and
          verify yourself as an lsdCNV holder in order to see the most recent treasury updates.
        </Text>
      </Stack>
      <Stack spacing={1} align="center" ml={{ base: 0, sm: 6 }}></Stack>
    </Card>
  )
}
