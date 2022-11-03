import { ChevronDownIcon } from '@concave/icons'
import { Box, Flex, gradientBorder, Text } from '@concave/ui'
import { FC, useState } from 'react'
import { VaultActivityBar } from './VaultActivityBar'
import { VaultActivityPosition } from './VaultActivityPosition'

export const VaultActivity = () => {
  const positions = new Array(120)
    .fill(0)
    .map((pos, index) => <VaultActivityPosition key={index} />)
  const [currentPag, setCurrentPag] = useState(0)
  const debugPositions = paginationArray(positions, 5)

  return (
    <Flex
      w={'full'}
      minH="580px"
      apply={'background.glass'}
      rounded="2xl"
      sx={{ ...gradientBorder({ borderWidth: 2, variant: 'secondary' }) }}
      shadow="up"
      direction={'column'}
      px={10}
    >
      <Flex gap={4} py={8} px={10} align="center">
        <Text mt={-2} mr={6} fontWeight={'bold'} fontSize="4xl">
          Vault activity
        </Text>
        <Dropdown title="Vault" />
        <Dropdown title="Yield" />
      </Flex>
      <Header />
      <Flex direction={'column'} gap={2} minH={'350px'}>
        {debugPositions[currentPag]}
      </Flex>
      <VaultActivityBar
        m={'auto'}
        currentActive={currentPag}
        onChangePag={setCurrentPag}
        paginationCount={debugPositions.length}
      />
    </Flex>
  )
}

const Header = () => (
  <Flex py={2} px={10}>
    <Text minW={'220px'} textAlign="start">
      Vault
    </Text>
    <Text textAlign="start">Action</Text>
    <Box flex={1} />
    <Text textAlign="start">Contract</Text>
    <Text minW={'220px'} textAlign="end">
      Yeild
    </Text>
  </Flex>
)

type DropdownProps = { title: string }
const Dropdown: FC<DropdownProps> = ({ title }) => (
  <Flex
    px={6}
    rounded="full"
    sx={{ ...gradientBorder({ borderWidth: 2, variant: 'secondary' }) }}
    align="center"
    height="38px"
  >
    <Text>{title}</Text>
    <ChevronDownIcon boxSize={'25px'} />
  </Flex>
)
function paginationArray(array: any[], pagCount: number) {
  const newArray = []
  for (let i = 0; i < array.length; i += pagCount) {
    const cuttedArray = []
    for (let c = 0; c < pagCount; c++) {
      cuttedArray.push(array[i + c])
    }
    newArray.push(cuttedArray)
  }
  return newArray
}
