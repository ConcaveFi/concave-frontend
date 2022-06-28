import { DAI, USDC } from '@concave/core'
import { ChevronDownIcon } from '@concave/icons'
import { Avatar, Button, Card, Flex, Heading, HStack, Input, Text } from '@concave/ui'
import { ButtonLink } from 'components/ButtonLink'
import { CurrencyIcon } from 'components/CurrencyIcon'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import React from 'react'
import { MdOutlineDashboard } from 'react-icons/md'
import { BondChartSimulation } from '../offer-bond/bondchart'

export function BondableAssetCard() {
  const networkId = useCurrentSupportedNetworkId()
  const DAI_token = DAI[networkId]
  const usdc = USDC[networkId]

  return (
    <Flex flexDir={'row'} gap={10} mt={10}>
      <Card
        p={5}
        gap={4}
        variant="primary"
        h="fit-content"
        shadow="Block Up"
        w="100%"
        maxW="506px"
        height="557px"
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
              Bondable Assets {DAI_token.symbol}
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
                    justify={'center'}
                    alignContent={'center'}
                    align={'center'}
                  >
                    <CurrencyIcon mr={2} size="xs" currency={DAI_token} />
                    <Text mr={2}> {DAI_token.symbol}</Text>
                    <ChevronDownIcon />
                  </Flex>
                  <Text>60%</Text>
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
                    justify={'center'}
                    alignContent={'center'}
                    align={'center'}
                  >
                    <Avatar
                      src={`/assets/tokens/usdc.svg`}
                      size="xs"
                      bg={'text.low'}
                      getInitials={(a) => a}
                      draggable={false}
                      userSelect="none"
                      mr={2}
                    />
                    <Text mr={2}>USDC</Text>
                    <ChevronDownIcon />
                  </Flex>
                  <Text>40%</Text>
                </HStack>
              </Card>
            </HStack>
          </Flex>
          <Flex
            shadow="down"
            width="474px"
            height="157px"
            justifyContent="center"
            rounded={'2xl'}
            flexDirection="column"
          >
            <Text textColor="text.high" fontWeight="600" fontSize="18px">
              Issued Asset
            </Text>
            <HStack mt={4} mb={4} ml={8} alignContent={'end'} justifyContent="center">
              <Text fontSize="12px" textColor={'text.low'}>
                Token Contract:
              </Text>

              <Text
                alignContent={'end'}
                justifyContent="center"
                rounded={'2xl'}
                shadow="down"
                width="332px"
                height="26px"
                fontSize="12px"
              >
                07a58f5f58E697e51Ab0357BC9e260A04
              </Text>
            </HStack>
            <HStack alignContent={'end'} justifyContent="center" mt={4} mb={4} ml={8}>
              <Text
                fontSize="12px"
                alignContent={'center'}
                justifyContent="center"
                textColor={'text.low'}
              >
                Amount
              </Text>

              <Text
                alignContent={'center'}
                justifyContent="center"
                rounded={'2xl'}
                shadow="down"
                width="121px"
                height="26px"
                fontSize="12px"
              >
                40,0000.00
              </Text>
              <Text
                fontSize="12px"
                alignContent={'center'}
                justifyContent="center"
                textColor={'text.low'}
              >
                xRUNE
              </Text>
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
            <HStack mt={4} mb={4} ml={8} alignContent={'center'} justifyContent="center">
              <Text
                alignContent={'center'}
                justifyContent="center"
                fontSize="12px"
                textColor={'text.low'}
              >
                Contract:
              </Text>

              <Text
                alignContent={'center'}
                justifyContent="center"
                rounded={'2xl'}
                shadow="down"
                width="332px"
                height="26px"
                fontSize="12px"
              >
                07a58f5f58E697e51Ab0357BC9e260A04
              </Text>
            </HStack>
          </Flex>
          <Button
            my={3}
            variant="primary"
            size="lg"
            w="278px"
            h="49px"
            bgColor="secondary.75"
            fontSize="22px"
            rounded={'3xl'}
          >
            Confirm and Deposit
          </Button>
        </Flex>
      </Card>
      <BondChartSimulation></BondChartSimulation>
    </Flex>
  )
}
