import { CloseIcon, InfoOutlineIcon } from '@concave/icons'
import { Box, Button, Card, Stack, Text } from '@concave/ui'
import React, { useState } from 'react'

function SecurityBanner() {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <Box mx="auto" pos="absolute" top={{ base: 12, md: 8 }} zIndex={10} left={8}>
      {isOpen && (
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
          <Button
            bg="blackAlpha.700"
            border="2px solid white"
            p={1.5}
            rounded="full"
            pos="absolute"
            top="-4px"
            right="-4px"
            onClick={() => setIsOpen(false)}
          >
            <CloseIcon w="8px" h="8px" />
          </Button>
        </Card>
      )}
    </Box>
  )
}

export default SecurityBanner
