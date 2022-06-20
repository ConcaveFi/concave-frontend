import { Box, Button, Card, Flex, Heading, HStack, Text } from '@concave/ui'
import { ButtonLink } from 'components/ButtonLink'
import React from 'react'
import { MdOutlineDashboard } from 'react-icons/md'

export function BondTypeCard() {
  return (
    <Card
      p={5}
      gap={2}
      variant="primary"
      h="fit-content"
      shadow="Block Up"
      w="100%"
      maxW="430px"
      height="386px"
    >
      <Flex shadow="down" width="384px" height="60px" alignContent={'center'} rounded={'2xl'}>
        <Text
          fontWeight="bold"
          verticalAlign={'bottom'}
          ml={1}
          mt={4}
          align={'left'}
          fontSize="24px"
        >
          Discount Type
        </Text>
      </Flex>

      <Flex
        shadow="down"
        width="384px"
        height="60px"
        mt={2}
        alignContent={'center'}
        rounded={'2xl'}
      >
        <HStack>
          <Text
            fontWeight="bold"
            verticalAlign={'bottom'}
            ml={1}
            mt={4}
            align={'left'}
            fontSize="24px"
          >
            Discount Type
          </Text>

          <Text
            fontWeight="bold"
            verticalAlign={'bottom'}
            ml={1}
            mt={4}
            align={'left'}
            fontSize="24px"
          >
            Discount Type
          </Text>
          <Text
            fontWeight="bold"
            verticalAlign={'bottom'}
            ml={1}
            mt={4}
            align={'left'}
            fontSize="24px"
          >
            Discount Type
          </Text>
        </HStack>
      </Flex>
    </Card>
  )
}
