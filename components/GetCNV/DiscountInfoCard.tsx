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
import { Page } from 'components/Page'

function BondInfoCard() {
  return (
    <Card w={484} borderWidth={2} bgImage="/assets/cave.png">
      <Card px={10} py={8} borderWidth={2} bgImage="/assets/cave.png">
        <Text>AAAAA</Text>
      </Card>
    </Card>
  )
}

export default BondInfoCard
