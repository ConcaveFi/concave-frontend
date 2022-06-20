import { Box, Flex, FlexboxProps, FlexProps, Text } from '@chakra-ui/react'
import { gradientBorder } from '@concave/ui'
import React from 'react'

export const PreferredBondTable = () => {
  return <BondTable />
}

const BondTable = () => (
  <>
    <Flex w="580px" maxW={'580px'} mx="auto" overflowY="hidden" ml={-1}>
      <HeaderContainer />
    </Flex>
    <Flex
      w="580px"
      maxW={'580px'}
      h={'320px'}
      mx="auto"
      direction={'column'}
      overflowY="scroll"
      overflowX={'hidden'}
      __css={{ ...scrollBar }}
    >
      <BodyContainer />
      <BodyContainer />
      <BodyContainer />
      <BodyContainer enabled />
      <BodyContainer />
      <BodyContainer />
      <BodyContainer />
      <BodyContainer />
      <BodyContainer />
    </Flex>
  </>
)

const HeaderContainer = () => (
  <Flex w={'full'} h="60px">
    <HeaderCol label="Price" />
    <HeaderCol label="ROI" />
    <HeaderCol label="Days untill unlock" />
    <HeaderCol label="Supply" />
    <HeaderCol label="Vesting type" />
  </Flex>
)

const BodyContainer: React.FC<Enabled> = ({ enabled }) => (
  <Flex w={'full'} direction={'column'} justify="start">
    <BodyRow
      enabled={enabled}
      columns={{ days: '56', price: '$0.043', roi: '6.32%', supply: '2910.23 CNV', type: 'Linear' }}
    />
  </Flex>
)

type Label = { label: string }
const HeaderCol: React.FC<Label & FlexboxProps> = ({ label, ...props }) => (
  <Flex height="full" justify={'center'} align="center" flex={1} {...props}>
    <Text fontWeight={'bold'} fontSize="14px" color="text.low" textAlign={'center'}>
      {label}
    </Text>
  </Flex>
)

type Enabled = { enabled?: boolean }
type BodyRow = {
  columns: { price: string; roi: string; days: string; supply: string; type: string }
}
const BodyRow: React.FC<BodyRow & Enabled> = ({ columns, enabled }) => (
  <Flex
    cursor={'pointer'}
    rounded={'2xl'}
    sx={enabled && { ...gradientBorder({ borderWidth: 2 }) }}
    direction="column"
    mt={'-2px'}
  >
    <Flex>
      {Object.values(columns).map((value, index) => (
        <TableText label={value} key={index} />
      ))}
    </Flex>
    {!enabled && <Box height={'2px'} width="95%" mx={'auto'} bg="stroke.secondary" />}
  </Flex>
)

const TableText: React.FC<Label> = ({ label }) => (
  <Flex py={'10px'} maxW={'116px'} flex={1} align="center" justify={'center'}>
    <Text fontSize={'14px'} fontWeight="bold" textAlign={'center'}>
      {label}
    </Text>
  </Flex>
)

const scrollBar = {
  '::-webkit-scrollbar': {
    width: '12px',
  },

  '::-webkit-scrollbar-track': {
    // boxShadow: 'inset 0 0 10px 10px',
    // color: 'green.300',
    border: 'solid 4px transparent',
    rounded: '2xl',
  },

  '::-webkit-scrollbar-thumb': {
    border: 'solid 3px transparent',
    boxShadow: 'inset 0 0 10px 10px #74bae8',
    rounded: '2xl',
  },
}
