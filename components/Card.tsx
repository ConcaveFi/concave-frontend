import { StackProps, Stack } from '@chakra-ui/react'
import { gradientStroke } from 'theme/utils/gradientStroke'

export function Card({ children, spacing = 0, borderWidth, ...rest }: StackProps) {
  return (
    <Stack
      __css={{ ...gradientStroke({ borderWidth }), borderRadius: '2xl' }} // __css can be overriten with the sx prop
      spacing={spacing}
      {...rest}
    >
      {children}
    </Stack>
  )
}
