import { SpinIcon } from '@concave/icons'
import { Flex, HStack, keyframes, Text, VStack } from '@concave/ui'

const spin = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
})

const spinnerStyles = {
  animation: `${spin} 2s linear infinite`,
}

const sizes = {
  xs: 6,
  sm: 8,
  md: 12,
  lg: 16,
} as const
export const Loading = ({
  label,
  rLabel,
  size,
}: {
  rLabel?: string
  label?: string
  size: 'xs' | 'sm' | 'md' | 'lg'
}) => {
  return (
    <Flex justifyContent={'center'}>
      <VStack>
        <HStack>
          <SpinIcon
            __css={spinnerStyles}
            width={sizes[size]}
            height={sizes[size]}
            viewBox="0 0 64 64"
          />
          {rLabel && <Text>{rLabel}</Text>}
        </HStack>
        {label && <Text>{label}</Text>}
      </VStack>
    </Flex>
  )
}
