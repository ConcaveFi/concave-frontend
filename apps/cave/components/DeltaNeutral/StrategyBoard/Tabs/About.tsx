import { Box, Flex, gradientBorder, Text } from '@concave/ui'
import { FC, useState } from 'react'

export const AboutTab = () => {
  return (
    <Flex direction={'column'} w="full" flex={1} mb={8}>
      <Flex h={'220px'} my={12}>
        <Tabs />
        <Flex
          flex={1}
          h="full"
          rounded={'2xl'}
          apply="background.glass"
          sx={{ ...gradientBorder({ borderWidth: 2, variant: 'secondary' }) }}
          shadow="up"
          px={10}
          direction="column"
        >
          <Text fontSize={'sm'} fontWeight="bold" color="text.small" m="25px 0px 18px 0px">
            The vault earns yield on its SOL deposits by running a weekly automated covered call
            strategy. The vault reinvests the yield earned back into the strategy, effectively
            compounding the yields for depositors over time.
          </Text>
          <Text fontSize={'sm'} fontWeight="bold" color="text.small" textDecor={'underline'}>
            Contract: 0x4fsd...fsd45
          </Text>
        </Flex>
      </Flex>
      <CapacityContainer />
    </Flex>
  )
}

const CapacityContainer = () => (
  <Flex
    width={'full'}
    h="92px"
    rounded={'2xl'}
    apply="background.glass"
    sx={{ ...gradientBorder({ borderWidth: 2, variant: 'secondary' }) }}
    direction="column"
    shadow={'up'}
    justify="center"
    px={8}
    gap={1}
  >
    <Flex width={'full'} justify="space-between" fontWeight={'bold'}>
      <Text>Current deposited</Text>
      <Text>332,341 USDC</Text>
    </Flex>
    <Flex height={'8px'} rounded="full" width={'full'} apply="background.metal" shadow={'up'}>
      <Box width={'50%'} height="full" bg="stroke.accent" rounded={'full'} />
    </Flex>
    <Flex width={'full'} justify="space-between" fontWeight={'bold'}>
      <Text>Vault capacity</Text>
      <Text>500,000 USDC</Text>
    </Flex>
  </Flex>
)

type TabsType = 'Vault strategy' | 'Fee structure' | 'Withdrawals' | 'Risks'
const Tabs = () => {
  const [currentTab, setCurrentTab] = useState<TabsType>('Vault strategy')
  const vaultStrategySelected = currentTab === 'Vault strategy'
  const structureSelected = currentTab === 'Fee structure'
  const risksSelected = currentTab === 'Risks'
  const withdrawalsSelected = currentTab === 'Withdrawals'
  return (
    <Flex direction={'column'} w={'160px'} h="full" justify="space-around">
      <TabButton
        isSelected={vaultStrategySelected}
        onClick={setCurrentTab}
        title="Vault strategy"
      />
      <TabButton isSelected={structureSelected} onClick={setCurrentTab} title="Fee structure" />
      <TabButton isSelected={withdrawalsSelected} onClick={setCurrentTab} title="Withdrawals" />
      <TabButton isSelected={risksSelected} onClick={setCurrentTab} title="Risks" />
    </Flex>
  )
}

type TabButtonProps = { isSelected: boolean; title: TabsType; onClick: (tabName: TabsType) => void }
const TabButton: FC<TabButtonProps> = ({ isSelected, onClick, title }) => {
  return (
    <Text
      fontWeight={'bold'}
      color={!isSelected && 'text.small'}
      w={'full'}
      textAlign="end"
      onClick={() => onClick(title)}
      cursor="pointer"
      fontSize={'xl'}
      pr={3}
      py={2}
      borderBottom={isSelected && '2px solid'}
      borderColor={'text.small'}
    >
      {title}
    </Text>
  )
}
