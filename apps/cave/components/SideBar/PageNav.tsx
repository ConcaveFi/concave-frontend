import React from 'react'
import {
  IconButton,
  Box,
  Button,
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
import { EmailIcon } from '@chakra-ui/icons'
import { MdSettings } from 'react-icons/md'
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

interface PageProps {
  name: string
  icon: IconType
  link: string
}
const PageItems: Array<PageProps> = [
  { name: 'Bonds', icon: FaBriefcase, link: 'bond' },
  { name: 'Liquid Staking', icon: FaBatteryThreeQuarters, link: 'liquidstaking' },
  { name: 'Marketplace', icon: FaShoppingCart, link: 'marketplace' },
  { name: 'Swap', icon: FaRandom, link: 'swap' },
]

function PageNav() {
  return (
    <div>
      {/* <Box>
        {PageItems.map((page) => (
          <NavItem key={page.name} icon={page.icon} link={page.link}>
            {page.name}
          </NavItem>
        ))}
      </Box> */}
      <Flex>
        <Image src={'/assets/sidebar/linkage.svg'} mt={4} ml={7} />
        <Box ml={-1}>
          <Box
            shadow="down"
            bgGradient="linear(to-tr, secondary.150, secondary.100)"
            p={1}
            box-shadow="lg"
            rounded="2xl"
          >
            <Link href={'bond'} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
              <Button
                leftIcon={<Image src={'/assets/sidebar/page-bond.svg'} />}
                iconSpacing={7}
                // variant="primary.outline"
                bgGradient="linear(to-tr, secondary.150, secondary.100)"
                w="160px"
                h="45px"
                borderRadius="lg"
                shadow="up"
                textColor="#5F7A99"
              >
                Bonds
              </Button>
            </Link>
            <Text fontSize="sm" fontWeight="thin" textColor="#5F7A99" textAlign="center" m={1}>
              5 days - 9% ROI
            </Text>
          </Box>

          <Link
            href={'liquidstaking'}
            style={{ textDecoration: 'none' }}
            _focus={{ boxShadow: 'none' }}
          >
            <Button
              leftIcon={<Image src={'/assets/sidebar/page-lstaking.svg'} />}
              iconSpacing={2}
              variant="primary.outline"
              bgGradient="linear(to-tr, secondary.150, secondary.100)"
              w="160px"
              h="45px"
              borderRadius="2xl"
              textColor="#5F7A99"
              mt={16}
            >
              Liquid Staking
            </Button>
          </Link>

          <Link
            href={'marketplace'}
            style={{ textDecoration: 'none' }}
            _focus={{ boxShadow: 'none' }}
          >
            <Button
              leftIcon={<Image src={'/assets/sidebar/page-bond.svg'} />}
              iconSpacing={7}
              variant="primary.outline"
              bgGradient="linear(to-tr, secondary.150, secondary.100)"
              w="160px"
              h="45px"
              borderRadius="2xl"
              textColor="#5F7A99"
              mt={20}
            >
              Marketplace
            </Button>
          </Link>

          <Link href={'swap'} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
            <Button
              leftIcon={<Image src={'/assets/sidebar/page-bond.svg'} />}
              iconSpacing={7}
              variant="primary.outline"
              bgGradient="linear(to-tr, secondary.150, secondary.100)"
              w="160px"
              h="45px"
              borderRadius="2xl"
              textColor="#5F7A99"
              mt={10}
            >
              Swap
            </Button>
          </Link>
        </Box>
      </Flex>
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
