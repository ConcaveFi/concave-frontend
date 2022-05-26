import { SettingsIcon } from '@concave/icons'
import {
  Box,
  Card,
  Heading,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Stack,
} from '@concave/ui'
import React, { ReactNode } from 'react'

export const TransactionSettings = ({
  trigger,
  children,
}: {
  trigger?: ReactNode
  children: ReactNode
}) => {
  return (
    <Popover placement="top-end" offset={[20, 5]} isLazy>
      <PopoverTrigger>
        {trigger || (
          <IconButton
            onClick={(e) => e.stopPropagation()}
            px={2}
            _focus={{ transform: 'scale(1.12)', filter: 'drop-shadow(-1px 1px 2px #ffffff20)' }}
            _hover={{ transform: 'scale(1.06)', filter: 'drop-shadow(-1px 1px 2px #ffffff20)' }}
            icon={<SettingsIcon viewBox="0 0 20 25" cursor={'pointer'} />}
            aria-label="settings"
          />
        )}
      </PopoverTrigger>
      <Portal>
        <PopoverContent
          border="none"
          w="256px"
          bg="transparent"
          borderRadius="2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <Card variant="secondary" p={4} gap={2} fontFamily="heading" fontWeight="semibold">
            <Heading textAlign="center" size="sm">
              Transaction Settings
            </Heading>
            <Box h="1px" w="full" bg="stroke.primary" my={2} />
            <Stack gap={3} align="flex-start">
              {children}
            </Stack>
          </Card>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}
