import { useStyleConfig, StackProps, Stack } from '@chakra-ui/react'

export interface CardProps extends StackProps {
  variant?: 'primary' | 'secondary'
}

export function Card({ variant, children, ...rest }: CardProps) {
  const styles = useStyleConfig('Card', { variant } as any)
  return (
    <Stack __css={styles} {...rest} spacing={0}>
      {children}
    </Stack>
  )
}
