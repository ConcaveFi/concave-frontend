import { forwardRef, Stack, StackProps, useStyleConfig } from '@chakra-ui/react'
import { motion, MotionProps } from 'framer-motion'
import { PropsWithChildren } from 'react'
import { GradientBorderStyleProps } from '../theme/utils/gradientBorder'

type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N

export type CardProps = PropsWithChildren<
  {
    variant?: 'primary' | 'secondary'
    borderGradient?: GradientBorderStyleProps['variant']
    colorScheme?: 'brighter' | 'default'
  } & Merge<StackProps, MotionProps>
>

const MotionStack = motion(Stack)

export const Card = forwardRef<CardProps, typeof MotionStack>(
  ({ children, variant, borderWidth, borderGradient, colorScheme, ...props }, ref) => {
    const styles = useStyleConfig('Card', {
      variant,
      borderWidth,
      borderGradient,
      colorScheme,
      ...props,
    })

    return (
      <MotionStack layout="position" ref={ref} overflow="hidden" __css={styles} {...props}>
        {children}
      </MotionStack>
    )
  },
)
