import { Button, Card, Flex, Heading, Text } from '@concave/ui'
import { ButtonLink } from 'components/ButtonLink'
import React from 'react'
import { MdOutlineDashboard } from 'react-icons/md'

export function BondableAssets() {
  return (
    <Card
      p={5}
      gap={2}
      variant="primary"
      h="fit-content"
      shadow="Block Up"
      w="100%"
      maxW="506px"
      height="352px"
    >
      <Flex flexDir={'column'} align="center">
        <Flex
          shadow="down"
          width="474px"
          height="110px"
          alignContent={'center'}
          rounded={'2xl'}
        ></Flex>
        <Flex
          shadow="down"
          width="474px"
          height="110px"
          alignContent={'center'}
          rounded={'2xl'}
        ></Flex>
        <Button
          my={3}
          variant="primary"
          size="lg"
          w="278px"
          h="49px"
          bgColor="secondary.75"
          fontSize="14px"
          rounded={'3xl'}
        >
          Confirm
        </Button>
      </Flex>
    </Card>
  )
}
