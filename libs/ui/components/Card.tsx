import { StackProps, Stack } from '@chakra-ui/react'
import { StyleFunctionProps } from '@chakra-ui/theme-tools'
import { gradientStroke } from 'theme/utils/gradientStroke'

export type CardProps = StackProps

export const CardStyles = ({ borderWidth = 1 }: Partial<StyleFunctionProps> = {}) => ({
  ...gradientStroke({ borderWidth }),
  borderRadius: '2xl',
  maxW: '100%',
  bgGradient: 'linear(to-tr, secondary.150, secondary.100)',
})

export function Card({ children, spacing = 0, borderWidth, ...rest }: CardProps) {
  return (
    <Stack
      __css={CardStyles({ borderWidth })} // __css can be overriten with the sx prop
      spacing={spacing}
      {...rest}
    >
      {children}
    </Stack>
  )
}
