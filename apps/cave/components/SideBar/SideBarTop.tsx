import React from 'react'
import { Flex, Stack } from '@chakra-ui/react'
import { Image } from '@concave/ui'
import { ConnectWallet } from 'components/TopBar/ConnectWallet'
import { ButtonLink } from 'components/ButtonLink'
import { MdOutlineDashboard } from 'react-icons/md'

function SideBarTop() {
  return (
    <Stack borderRadius="2xl" shadow="down" p={4}>
      <Flex
        alignItems="center"
        justify="center"
        my={12}
        filter="drop-shadow(0px 0px 27px #81b3ff4f)"
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
