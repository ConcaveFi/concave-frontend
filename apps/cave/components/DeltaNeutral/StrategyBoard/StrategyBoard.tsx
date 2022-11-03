import { Flex, gradientBorder, Text } from '@concave/ui'
import { FC, useEffect, useState } from 'react'
import { AboutTab } from './Tabs/About'
import { PerformanceTab } from './Tabs/Performance'
import { StrategyTab } from './Tabs/Strategy'

export const VaultStrategyBoard = () => {
  const [tabActive, setTabActive] = useState('About')
  const aboutSelected = tabActive === 'About'
  const performanceSelected = tabActive === 'Performance'
  const strategySelected = tabActive === 'Strategy'
  const tabs = {
    About: <AboutTab />,
    Performance: <PerformanceTab />,
    Strategy: <StrategyTab />,
  }
  const [currentTabComp, setCurrentTabComp] = useState(tabs[tabActive])
  useEffect(() => setCurrentTabComp(tabs[tabActive]), [tabActive])
  return (
    <Flex direction={'column'} w="full" height={'full'}>
      <Flex
        width={'95%'}
        mx="auto"
        height="60px"
        p={'7px'}
        apply="background.glass"
        sx={{ ...gradientBorder({ borderWidth: 2, variant: 'secondary' }) }}
        rounded="3xl"
        gap={4}
        shadow="up"
      >
        <TabButton isSelected={aboutSelected} title="About" onClick={setTabActive} />
        <TabButton isSelected={strategySelected} title="Strategy" onClick={setTabActive} />
        <TabButton isSelected={performanceSelected} title="Performance" onClick={setTabActive} />
      </Flex>
      {currentTabComp}
    </Flex>
  )
}

type TabButtonProps = { isSelected: boolean; title: string; onClick: (tabName: string) => void }
const TabButton: FC<TabButtonProps> = ({ isSelected, onClick, title }) => (
  <Flex
    height="full"
    rounded={'3xl'}
    sx={isSelected && { ...gradientBorder({ borderWidth: 2, variant: 'secondary' }) }}
    flex={1}
    shadow={isSelected && 'up'}
  >
    <Text
      cursor={'pointer'}
      onClick={() => onClick(title)}
      m={'auto'}
      fontWeight="bold"
      color={!isSelected && 'text.small'}
    >
      {title}
    </Text>
  </Flex>
)
