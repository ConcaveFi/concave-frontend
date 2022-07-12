import { forwardRef, Stack, StackProps, useStyleConfig } from '@chakra-ui/react'
import { motion, MotionProps } from 'framer-motion'
import { GradientBorderStyleProps } from 'theme/utils/gradientBorder'

type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N

export type CardProps = {
  variant?: 'primary' | 'secondary'
  borderGradient?: GradientBorderStyleProps['variant']
  colorScheme?: 'brighter' | 'default'
} & Merge<StackProps, MotionProps>

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
      // @ts-ignore Stack not happy with the motion props (as={motion.div})
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
