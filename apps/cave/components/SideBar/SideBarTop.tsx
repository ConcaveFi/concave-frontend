import React from 'react'
import { Box, Flex, Text, VStack, HStack } from '@chakra-ui/react'
import { Image } from '@concave/ui'
import { ConnectWallet } from 'components/ConnectWallet'
import { ButtonLink } from 'components/ButtonLink'
import { MdOutlineDashboard } from 'react-icons/md'

function SideBarTop() {
  return (
    <div>
      <Box
        top="16px"
        border-radius="16px"
        shadow="down"
        bgGradient="linear(to-tr, secondary.150, secondary.100)"
        px={2}
        py={10}
        box-shadow="lg"
        rounded="lg"
      >
        <Image src="/assets/concave/logomark.svg" alt="concave logo" maxWidth="52px" />
        <Image src="/assets/concave/logotype.svg" alt="concave logo" width="100px" ml={3} />
      </Flex>

      <Stack gap="1" align="flex-end" mt={7}>
        <ButtonLink
          href="/treasury"
          variant="primary.outline"
          size="medium"
          w="full"
          leftIcon={<MdOutlineDashboard size="20px" />}
        >
          Dashboard
        </ButtonLink>
        <ConnectWallet />
      </Stack>
    </Stack>
  )
}

export default SideBarTop
