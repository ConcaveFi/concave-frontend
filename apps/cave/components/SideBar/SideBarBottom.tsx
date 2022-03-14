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
import { ExternalLinkIcon } from '@chakra-ui/icons'
import {
  FaDiscord,
  FaTwitter,
  FaTwitch,
  FaShoppingCart,
  FaRandom,
  FaBatteryThreeQuarters,
  FaBriefcase,
} from 'react-icons/fa'
import { FiMenu } from 'react-icons/fi'
import { SiGitbook } from 'react-icons/si'

interface MediaProps {
  icon: string
  name: string
  link: string
}
const Media: Array<MediaProps> = [
  {
    icon: 'documentation',
    name: 'Documentation',
    link: 'https://docs.concave.lol/introduction/',
  },
  {
    icon: 'concavelol',
    name: 'Concave.lol',
    link: 'https://concave.lol/',
  },
  {
    icon: 'discord',
    name: 'Discord',
    link: '',
  },
  {
    icon: 'twitter',
    name: 'Twitter',
    link: 'https://twitter.com/ConcaveFi',
  },
  {
    icon: 'blog',
    name: 'Blog',
    link: '',
  },
]

function SideBarBottom() {
  return (
    <div>
      <Box
        top="16px"
        border-radius="16px"
        // border="1px"
        // background-color="rgba(156, 156, 156, 0.01);"
        shadow="down"
        bgGradient="linear(to-tr, secondary.250, secondary.100)"
        px={12}
        py={8}
        box-shadow="lg"
        rounded="lg"
        textColor="#5F7A99"
      >
        <VStack>
          {Media.map((m) => (
            <Link href={m.link} isExternal key={m.name}>
              <HStack spacing="2px" textAlign="left" w="150px" gap={2}>
                <Image src={`/assets/sidebar/${m.icon}.svg`} alt="documentation logo" ml={-3} />
                <Text fontSize="base" fontWeight="bold">
                  {m.name}
                </Text>
              </HStack>
            </Link>
          ))}
        </VStack>
      </Box>
    </div>
  )
}

export default SideBarBottom
