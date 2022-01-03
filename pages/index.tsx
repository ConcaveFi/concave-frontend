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
import Gcnv from 'components/Gcnv'

function Home() {
  return (
    <Page>
      <Gcnv />
    </Page>
  )
}

export default Home
