import React from 'react'
import { Box, Button, Flex, Icon, Link, Text, FlexProps, Image } from '@concave/ui'
import { IconType } from 'react-icons'
import { ReactText } from 'react'

function PageNav() {
  return (
    <div>
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
            <Text fontSize="sm" fontWeight="thin" textColor="#5F7A99" textAlign="center" p={1}>
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
              mt={4}
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
              leftIcon={<Image src={'/assets/sidebar/page-marketplace.svg'} />}
              iconSpacing={7}
              variant="primary.outline"
              bgGradient="linear(to-tr, secondary.150, secondary.100)"
              w="160px"
              h="45px"
              borderRadius="2xl"
              textColor="#5F7A99"
              mt={16}
            >
              Marketplace
            </Button>
          </Link>

          <Link href={'swap'} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
            <Button
              leftIcon={<Image src={'/assets/sidebar/page-swap.svg'} />}
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
