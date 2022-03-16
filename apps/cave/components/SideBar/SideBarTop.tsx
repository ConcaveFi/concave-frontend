import React from 'react'
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  VStack,
  HStack,
} from '@chakra-ui/react'
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
        // border="1px"
        // background-color="rgba(156, 156, 156, 0.01);"
        shadow="down"
        bgGradient="linear(to-tr, secondary.150, secondary.100)"
        px={2}
        py={10}
        box-shadow="lg"
        rounded="lg"
      >
        <Flex alignItems="center" mx={6}>
          <Image
            src={'/assets/sidebar/concave-logo.png'}
            alt="concave logo"
            maxWidth="58px"
            position="relative"
            ml={-2}
          />
          <Image src={'/assets/sidebar/concave-title.svg'} alt="concave logo" ml={-3} />
        </Flex>

        <VStack gap="1" align="flex-end" mt={7}>
          <ButtonLink
            href="/treasury"
            variant="primary.outline"
            bgGradient="linear(to-tr, secondary.150, secondary.100)"
            w="200px"
            size="large"
            borderRadius="2xl"
          >
            <HStack gap="2">
              <MdOutlineDashboard fontSize="20px" />
              <Text fontSize="lg">Dashboard</Text>
            </HStack>
          </ButtonLink>
          <ConnectWallet />
        </VStack>
      </Box>
    </div>
  )
}

export default SideBarTop
