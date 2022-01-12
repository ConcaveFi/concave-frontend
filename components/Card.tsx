import { useStyleConfig, StackProps, Stack } from '@chakra-ui/react'

export interface CardProps extends StackProps {
  variants?: 'primary' | 'secondary'
}

export function Card({ variants, children, ...rest }: CardProps) {
  const styles = useStyleConfig('Card', { variants })
  return (
    <Stack __css={styles} {...rest} spacing={0}>
      {children}
    </Stack>
  )
}
