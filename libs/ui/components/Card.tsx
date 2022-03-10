import { StackProps, Stack, useMultiStyleConfig, forwardRef, Image, Box } from '@chakra-ui/react'

export interface CardProps extends StackProps {
  variant?: 'primary' | 'secondary' // find better way
}

export const Card = forwardRef<CardProps, 'div'>(
  ({ children, variant, borderWidth, ...rest }, ref) => {
    const styles = useMultiStyleConfig('Card', { variant, borderWidth })
    const imageSrc = (styles.backgroundImage as any)?.src
    return (
      <Box ref={ref} __css={styles.outerContainer}>
        <Stack pos="relative" overflow="hidden" __css={styles.innerContainer} {...rest}>
          {imageSrc && (
            <Image
              __css={styles.backgroundImage}
              position="absolute"
              inset={0}
              src={imageSrc}
              alt=""
            />
          )}
          {children}
        </Stack>
      </Box>
    )
  },
)
