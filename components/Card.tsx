import { Box, BoxProps, useStyleConfig } from '@chakra-ui/react'

export interface CardProps extends BoxProps {
  variant?: 'primary' | 'secondary'
}

export function Card({ variant, children, ...rest }: CardProps) {
  const styles = useStyleConfig('Card', { variant })
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  )
}
