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
import { IconType } from 'react-icons'
import { ReactText } from 'react'
import { Image } from '@concave/ui'
import { ConnectWallet } from 'components/TopBar/ConnectWallet'
import { ButtonLink } from 'components/ButtonLink'
import { DownIcon } from '@concave/icons'
interface LinkItemProps {
  name: string
  icon: IconType
  link: string
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Bonds', icon: FaBriefcase, link: 'bond' },
  { name: 'Liquid Staking', icon: FaBatteryThreeQuarters, link: 'liquidstaking' },
  { name: 'Marketplace', icon: FaShoppingCart, link: '/marketplace' },
  { name: 'Swap', icon: FaRandom, link: 'swap' },
]

function PageNav() {
  return (
    <div>
      <Box>
        {LinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon} link={link.link}>
            {link.name}
          </NavItem>
        ))}
      </Box>
    </div>
  )
}

interface NavItemProps extends FlexProps {
  icon: IconType
  link: string
  children: ReactText
}
const NavItem = ({ icon, children, link, ...rest }: NavItemProps) => {
  return (
    <Link
      href={link}
      {...(link.startsWith('http')
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : { replace: 'true' })}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  )
}

export default PageNav
