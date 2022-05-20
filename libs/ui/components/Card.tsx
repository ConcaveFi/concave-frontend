import { forwardRef, Stack, StackProps, useStyleConfig } from '@chakra-ui/react'
import { GradientBorderStyleProps } from 'theme/utils/gradientBorder'
import { motion } from 'framer-motion'

export interface CardProps extends StackProps {
  variant?: 'primary' | 'secondary'
  borderGradient?: GradientBorderStyleProps['variant']
  colorScheme?: 'brighter' | 'default'
}

export const Card = forwardRef<CardProps, 'div'>(
  ({ children, variant, borderWidth, borderGradient, colorScheme, ...props }, ref) => {
    const styles = useStyleConfig('Card', {
      variant,
      borderWidth,
      borderGradient,
      colorScheme,
      ...props,
    })

    return (
      <Stack
        as={motion.div}
        layout="position"
        ref={ref}
        overflow="hidden"
        __css={styles}
        {...props}
      >
        {children}
      </Stack>
    )
  },
)
