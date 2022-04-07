import React from 'react'
import { Box, Flex, Text, Image } from '@concave/ui'
import { ButtonLink } from 'components/ButtonLink'

function PageNav() {
  return (
    <div>
      <Flex>
        <Image src={'/assets/sidebar/linkage.svg'} ml={7} alt="linkage" />
        <Box ml={-1}>
          <Box
            shadow="down"
            bgGradient="linear(to-tr, secondary.150, secondary.100)"
            p={1}
            box-shadow="lg"
            rounded="2xl"
          >
            <ButtonLink
              leftIcon={<Image alt="bond" src={'/assets/sidebar/page-bond.svg'} />}
              iconSpacing={7}
              bgGradient="linear(to-tr, secondary.150, secondary.100)"
              w="160px"
              h="45px"
              borderRadius="lg"
              shadow="up"
              textColor="#5F7A99"
              href="/bond"
            >
              Bonds
            </ButtonLink>
            <Text fontSize="sm" fontWeight="thin" textColor="#5F7A99" textAlign="center" p={1}>
              CNV-DAI ROI 9.8%
            </Text>
          </Box>

          <ButtonLink
            leftIcon={<Image alt="lStaking" src={'/assets/sidebar/page-lstaking.svg'} />}
            iconSpacing={2}
            variant="primary.outline"
            bgGradient="linear(to-tr, secondary.150, secondary.100)"
            w="160px"
            h="45px"
            borderRadius="2xl"
            textColor="#5F7A99"
            mt={16}
            href={'liquidstaking'}
          >
            Liquid Staking
          </ButtonLink>

          <ButtonLink
            leftIcon={<Image alt="MarketPlace" src={'/assets/sidebar/page-marketplace.svg'} />}
            iconSpacing={7}
            shadow="up"
            _focus={{ shadow: 'down' }}
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
            mt={6}
          >
            <ButtonLink
              leftIcon={<Image alt="Swap" src={'/assets/sidebar/page-swap.svg'} />}
              iconSpacing={7}
              bgGradient="linear(to-tr, secondary.150, secondary.100)"
              w="160px"
              h="45px"
              borderRadius="lg"
              shadow="up"
              textColor="text.low"
              href={'swap'}
            >
              Swap
            </ButtonLink>
            <ButtonLink
            variant="ghost"
              w="full"
              mt={2}
              size="sm"
              bg="none"
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
            variant="ghost"
              size="sm"
              w="full"
              bg="none"
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
