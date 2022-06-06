import { InfoOutlineIcon } from '@concave/icons'
import { Box, Card, Stack, Text } from '@concave/ui'
import React from 'react'

function SecurityBanner() {
  return (
    <Box
      mx="auto"
      pos={{ base: 'relative', md: 'absolute' }}
      top={{ base: 12, md: 4 }}
      left={{ base: 0, md: 5 }}
    >
      <Card
        variant="secondary"
        px={5}
        py={3}
        direction={{ base: 'column', sm: 'row' }}
        align="center"
        rounded="3xl"
        shadow="Up for Blocks"
        pos="relative"
        overflow="visible"
      >
        <InfoOutlineIcon color="text.low" w={10} h={10} />
        <Stack spacing={0} ml={5}>
          <Text color="text.low" fontSize="sm">
            Always make sure the URL is
          </Text>
          <Text fontWeight="bold" whiteSpace="nowrap">
            app.concave.lol
          </Text>

          <Text color="text.low" fontSize="sm">
            bookmark it to be safe
          </Text>
        </Stack>
        <Stack spacing={1} align="center" ml={{ base: 0, sm: 6 }}></Stack>
      </Card>
    </Box>
  )
}

export default SecurityBanner
