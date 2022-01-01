import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Card } from 'components/Card'
import Image from 'next/image'
import React from 'react'
import colors from 'theme/colors'
import { fonts } from 'theme/foundations'
import { Page } from '../components/Page'

const BondCard = () => {
  return (
    <Card px={10} py={8} variant="primary" borderWidth={2}>
      <Stack gap={4}>
        <Flex direction="column" gap={1} px={5}>
          <Text textColor={'grey.500'} fontWeight={700}>
            From
          </Text>
          <Flex
            mx={-5}
            px={5}
            py={3}
            shadow={'down'}
            w={400}
            h={90}
            borderRadius="2xl"
            bgGradient={colors.gradients.green}
            align={'start'}
          >
            <Input
              variant="unstyled"
              placeholder="0.0"
              fontFamily={fonts.heading}
              fontWeight={700}
              fontSize={24}
              _placeholder={{ color: 'white' }}
            />
            <Stack align="end">
              <Flex
                align="center"
                borderRadius="full"
                py={1}
                px={3}
                bgColor="alphaWhite.50"
                gap={1}
              >
                <Image src="/assets/tokens/eth.svg" width="18px" height="18px" alt="" />
                <Text fontWeight={'600'}>ETH</Text>
                <ChevronDownIcon />
              </Flex>
              <Flex
                align="center"
                borderRadius="full"
                py={1}
                px={3}
                bgColor="alphaWhite.50"
                gap={1}
                fontSize={12}
                textColor="grey.700"
                whiteSpace="nowrap"
              >
                Balance: 2.1007
                <Text textColor={'blue.500'}>Max</Text>
              </Flex>
            </Stack>
          </Flex>
        </Flex>

        <Flex direction="column" gap={1} px={5}>
          <Text textColor={'grey.500'} fontWeight={700}>
            To (estimated)
          </Text>
          <Flex
            mx={-5}
            px={5}
            py={3}
            shadow={'up'}
            w={400}
            h={90}
            borderRadius="2xl"
            bgGradient={colors.gradients.green}
            align="start"
          >
            <Input
              variant="unstyled"
              placeholder="0.0"
              fontFamily={fonts.heading}
              fontWeight={700}
              fontSize={24}
              _placeholder={{ color: 'white' }}
            />
            <Stack align="end" fontWeight={600}>
              <Text fontSize={24}>gCNV</Text>
              <Text fontSize={14} color="grey.700">
                ~$2,914
              </Text>
            </Stack>
          </Flex>
        </Flex>

        <Button variant="primary" size="large" fontSize={24} isFullWidth>
          Get with 5 day vesting
        </Button>
      </Stack>
    </Card>
  )
}

const BondInfoCard = () => {
  return (
    <Card w={484} variant="secondary" borderWidth={2} bgImage="/assets/cave.png">
      <Card px={10} py={8} variant="secondary" borderWidth={2} bgImage="/assets/cave.png">
        <Text>AAAAAA</Text>
      </Card>
    </Card>
  )
}

function Home() {
  return (
    <Page>
      <Container maxW="container.lg">
        <Flex direction="column" gap={12}>
          <Box mt={12}>
            <Heading as="h1">Discounted gCNV</Heading>
            <Text maxW={520}>
              Get your gCNV that will grow internal CNV number your gCNV that will grow number or
              smth idk lol Get your gCNV that will grow internal CNV number or smth idk lol
            </Text>
          </Box>
          <Flex gap={6} flexWrap="wrap" justify="center">
            <BondCard />
            <BondInfoCard />
          </Flex>
        </Flex>
      </Container>
    </Page>
  )
}

export default Home
