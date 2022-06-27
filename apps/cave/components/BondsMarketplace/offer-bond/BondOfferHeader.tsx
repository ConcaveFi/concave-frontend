import { Button, Flex, Heading, Text } from '@concave/ui'
import { ButtonLink } from 'components/ButtonLink'
import React from 'react'
import { MdOutlineDashboard } from 'react-icons/md'

export function BondOfferHeader() {
  return (
    <>
      <Heading as="h1" mt={8} mb={3} fontSize="64px">
        Add xRune Bond Offer
      </Heading>
      <Flex
        my={3}
        justify={'center'}
        flexDirection="column"
        maxWidth={{ sm: '185px', lg: '518px' }}
        align={'center'}
      >
        <Text textAlign="center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Text>
        <Button
          my={3}
          variant="primary.outline"
          size="lg"
          w="278px"
          rightIcon={<MdOutlineDashboard size="20px" />}
          bgColor="secondary.75"
          fontSize="14px"
        >
          Your Bond Offer Analytics
        </Button>
      </Flex>
    </>
  )
}
