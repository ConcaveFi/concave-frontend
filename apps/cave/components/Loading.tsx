import { SpinIcon } from '@concave/icons'
import { Flex, FlexProps, HStack, keyframes, Text, VStack } from '@concave/ui'
import { ReactNode } from 'react'

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
  isLoading = false,
  children,
  size,
  ...flexProps
}: {
  rLabel?: string
  label?: string
  children?: ReactNode
  isLoading?: boolean
  size: 'xs' | 'sm' | 'md' | 'lg'
} & FlexProps) => {
  if (isLoading === false) {
    return (
      <Flex justifyContent={'center'} {...flexProps}>
        {children}
      </Flex>
    )
  }
  return (
    <Flex justifyContent={'center'} {...flexProps}>
      {isLoading && (
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
      )}
    </Flex>
  )
}
