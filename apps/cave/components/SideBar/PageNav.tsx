import React from 'react'
import Link from 'next/link'
import { Box, Button, Flex, Text, Image } from '@concave/ui'
import { ButtonLink } from 'components/ButtonLink'

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
            <ButtonLink
              leftIcon={<Image src={'/assets/sidebar/page-bond.svg'} />}
              iconSpacing={7}
              // variant="primary.outline"
              bgGradient="linear(to-tr, secondary.150, secondary.100)"
              w="160px"
              h="45px"
              borderRadius="lg"
              shadow="up"
              textColor="#5F7A99"
              href={'bond'}
            >
              Bonds
            </ButtonLink>
            <Text fontSize="sm" fontWeight="thin" textColor="#5F7A99" textAlign="center" p={1}>
              5 days - 9% ROI
            </Text>
          </Box>

          <ButtonLink
            leftIcon={<Image src={'/assets/sidebar/page-lstaking.svg'} />}
            iconSpacing={2}
            variant="primary.outline"
            bgGradient="linear(to-tr, secondary.150, secondary.100)"
            w="160px"
            h="45px"
            borderRadius="2xl"
            textColor="#5F7A99"
            mt={4}
            href={'liquidstaking'}
          >
            Liquid Staking
          </ButtonLink>

          <ButtonLink
            leftIcon={<Image src={'/assets/sidebar/page-marketplace.svg'} />}
            iconSpacing={7}
            variant="primary.outline"
            bgGradient="linear(to-tr, secondary.150, secondary.100)"
            w="160px"
            h="45px"
            borderRadius="2xl"
            textColor="#5F7A99"
            mt={16}
            href={'marketplace'}
          >
            Marketplace
          </ButtonLink>

          <Box
            shadow="down"
            bgGradient="linear(to-tr, secondary.150, secondary.100)"
            p={1}
            box-shadow="lg"
            rounded="2xl"
            mt={4}
          >
            <ButtonLink
              leftIcon={<Image src={'/assets/sidebar/page-swap.svg'} />}
              iconSpacing={7}
              // variant="primary.outline"
              bgGradient="linear(to-tr, secondary.150, secondary.100)"
              w="160px"
              h="45px"
              borderRadius="lg"
              shadow="up"
              textColor="#5F7A99"
              href={'swap'}
            >
              Swap
            </ButtonLink>
            <ButtonLink
              w="full"
              mt={2}
              size="sm"
              fontSize="sm"
              fontWeight="thin"
              textColor="text.low"
              textAlign="center"
              p={1}
              href={'/position?operation=addLiquidity'}
            >
              Add liquidity
            </ButtonLink>
            <ButtonLink
              size="sm"
              w="full"
              fontSize="sm"
              fontWeight="thin"
              textColor="text.low"
              textAlign="center"
              href={'/position?operation=showLiquidity'}
            >
              Your Pools
            </ButtonLink>
          </Box>
        </Box>
      </Flex>
    </div>
  )
}

export default PageNav
