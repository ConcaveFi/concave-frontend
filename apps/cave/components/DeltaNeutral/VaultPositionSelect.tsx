import { useDisclosure } from '@chakra-ui/react'
import { Currency } from '@concave/core'
import { Avatar, AvatarGroup, Flex, gradientBorder, Text } from '@concave/ui'
import { FC } from 'react'
import { VaultStrategyModal } from './VaultStrategyModal'

export type VaultPositionSelectProps = {
  title?: string
  tokens: Currency[]
  selectabe?: boolean
  variant?: 'primary' | 'secondary'
}
export const VaultPositionSelect: FC<VaultPositionSelectProps> = ({
  selectabe,
  tokens,
  title,
  variant = 'primary',
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  return (
    <Flex
      apply={variant === 'primary' && 'background.metal'}
      sx={variant === 'primary' && { ...gradientBorder({ borderWidth: 2, variant: 'secondary' }) }}
      w={'250px'}
      h="365px"
      rounded={'2xl'}
      p={'20px 10px'}
    >
      <Flex h="full" w="full" shadow={'down'} rounded="56px" p={3}>
        <Flex
          h={'full'}
          w="full"
          apply={'background.glass'}
          rounded="inherit"
          shadow={'Glass Up Medium'}
          sx={{ ...gradientBorder({ borderWidth: 2, variant: 'secondary' }) }}
          direction="column"
          align={'center'}
          justify="center"
          gap={0}
          cursor={selectabe && 'pointer'}
          onClick={selectabe ? onOpen : undefined}
        >
          <Text fontWeight={'bold'} color="text.small">
            {title || 'Vault strategy'}
          </Text>
          <Text fontWeight={'bold'} fontSize={'2xl'}>
            {tokens?.map((token) => token?.symbol).reduce((prev, cur) => prev + '-' + cur)}
          </Text>
          <AvatarGroup spacing={-4} my={5}>
            {tokens?.map((token) => (
              <Avatar
                key={token?.symbol}
                border={'none'}
                src={`./assets/tokens/${token?.symbol.toLowerCase()}.svg`}
              />
            ))}
          </AvatarGroup>
          <Text fontWeight={'bold'} color="text.small">
            Current APY
          </Text>
          <Text fontWeight={'bold'} fontSize={'2xl'}>
            34.81%
          </Text>
        </Flex>
      </Flex>
      <VaultStrategyModal isOpen={isOpen} onClose={onClose} tokens={tokens} />
    </Flex>
  )
}
