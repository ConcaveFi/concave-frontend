import { Flex, FlexProps, gradientBorder, Text } from '@concave/ui'
import { FC } from 'react'
import { VaultStrategyBoard } from './StrategyBoard/StrategyBoard'

type StrategyInfoContainerProps = {} & FlexProps
export const StrategyInfoContainer: FC<StrategyInfoContainerProps> = ({ ...props }) => {
  return (
    <Flex
      width={'640px'}
      rounded={'2xl'}
      apply="background.glass"
      sx={{ ...gradientBorder({ borderWidth: 2, variant: 'secondary' }) }}
      pt={16}
      padding={2}
      {...props}
      px={10}
      direction="column"
      shadow={'up'}
    >
      <Text my={5} fontSize="sm" mx={'auto'} fontWeight="bold" color="text.small">
        Your deposit will be deployed in the vault’s weekly strategy on Friday at 11am UTC
      </Text>
      <VaultStrategyBoard />
    </Flex>
  )
}
