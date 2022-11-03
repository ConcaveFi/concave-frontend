import { Flex, gradientBorder, Text } from '@concave/ui'
import { FC } from 'react'

export const PerformanceTab = () => {
  return (
    <Flex w={'full'} height="230" my={16}>
      <Flex
        sx={{ ...gradientBorder({ borderWidth: 2, variant: 'secondary' }) }}
        rounded="2xl"
        width={'340px'}
        apply="background.glass"
      >
        <Text m={'auto'} fontSize="xl" color={'text.small'} opacity={0.6} fontWeight="bold">
          Graph here.
        </Text>
      </Flex>
      <Flex direction={'column'} pl={12} justify="space-around">
        <Info title="Projected APY" info="44.78%" />
        <Info title="Previous week performance" info="4.12%" />
        <Info title="Amount available to farm" info="9,686,648 USDC" />
      </Flex>
    </Flex>
  )
}

type InfoProps = { title: string; info: string }
const Info: FC<InfoProps> = ({ info, title }) => (
  <Flex direction={'column'} align={'start'} fontWeight="bold">
    <Text fontSize={'xs'} color={'text.small'}>
      {title}
    </Text>
    <Text fontSize={'md'}>{info}</Text>
  </Flex>
)
