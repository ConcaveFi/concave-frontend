import { Button, Card, Flex, Heading, HStack, Input, Text } from '@concave/ui'
import { ButtonLink } from 'components/ButtonLink'
import React from 'react'
import { MdOutlineDashboard } from 'react-icons/md'

export function BondableAssets() {
  return (
    <Card
      p={5}
      gap={4}
      variant="primary"
      h="fit-content"
      shadow="Block Up"
      w="100%"
      maxW="506px"
      height="352px"
    >
      <Flex gap={4} flexDir={'column'} align="center">
        <Flex
          shadow="down"
          justify={'center'}
          width="474px"
          height="110px"
          alignContent={'center'}
          rounded={'2xl'}
          flexDirection="column"
        >
          <Text fontSize="18px" fontWeight="600" textColor="text.high" mb={4}>
            Bondable Assets
          </Text>
          <HStack justify="center">
            <Card variant="primary" w="100%" maxW="170px" height="34px">
              <HStack>
                <Flex
                  rounded={'2xl'}
                  width="107px"
                  height="31px"
                  shadow="up"
                  bgColor="secondary.100"
                >
                  <Text>test</Text>
                </Flex>
                <Text>40%</Text>
              </HStack>
            </Card>

            <Card variant="primary" w="100%" maxW="170px" height="34px">
              <HStack>
                <Flex
                  rounded={'2xl'}
                  width="107px"
                  height="31px"
                  shadow="up"
                  bgColor="secondary.100"
                >
                  <Text>test</Text>
                </Flex>
                <Text>60%</Text>
              </HStack>
            </Card>
          </HStack>
        </Flex>
        <Flex
          shadow="down"
          width="474px"
          height="110px"
          justifyContent="center"
          rounded={'2xl'}
          flexDirection="column"
        >
          <Text textColor="text.high" fontWeight="600" fontSize="18px">
            Recepient Address
          </Text>
          <HStack mt={4} mb={4} ml={8}>
            <Text textColor={'text.low'}>Contract:</Text>

            <Input
              alignContent={'center'}
              justifyContent="center"
              rounded={'2xl'}
              shadow="down"
              width="332px"
              height="26px"
            />
          </HStack>
        </Flex>
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
