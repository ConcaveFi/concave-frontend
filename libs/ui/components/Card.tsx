import { border, Box, forwardRef, space, Stack, StackProps, useStyleConfig } from '@chakra-ui/react'
import { GradientBorderStyleProps } from 'theme/utils/gradientBorder'

export interface CardProps extends StackProps {
  variant?: 'primary' | 'secondary'
  borderGradient?: GradientBorderStyleProps['variant']
  colorscheme?: 'brighter' | 'default'
}

const splitObj = (splitKeys: string[]) => (obj) => {
  let obj1 = { ...obj }
  let obj2 = {}
  splitKeys.forEach((k) => {
    delete obj1[k] // obj1 DOES NOT have the splitKeys
    obj2[k] = obj[k] // obj2 ONLY have the splitKeys
  })

  return [obj1, obj2]
}

const marginStyleKeys = Object.keys(space).filter((k) => k.startsWith('m'))
const borderRadiusStyleKeys = Object.keys(border).filter(
  (k) => k.endsWith('Radius') || k.startsWith('rounded'),
)

const getBorderRadiusStyles = (props) => splitObj(borderRadiusStyleKeys)(props)[1]

export const Card = forwardRef<CardProps, 'div'>(
  ({ children, variant, borderWidth, borderGradient, ...props }, ref) => {
    const styles = useStyleConfig('Card', {
      variant,
      borderWidth,
      borderGradient,
      ...props,
    })

    const [propsWithoutMargins, marginStyles] = splitObj(marginStyleKeys)(props)

    return (
      <Box
        ref={ref}
        __css={{
          ...styles,
          width: props.w ?? props.width,
          maxWidth: props.maxW ?? props.maxWidth,
          minWidth: props.minW ?? props.minWidth,
          height: props.h ?? props.height,
          maxHeight: props.maxH ?? props.maxHeight,
          minHeight: props.minH ?? props.minHeight,
          display: props.display,
        }}
        {...marginStyles}
        {...getBorderRadiusStyles(props)}
      >
        <Stack
          __css={{ ...getBorderRadiusStyles(styles) }}
          {...propsWithoutMargins}
          maxW="100%"
          overflow="hidden"
        >
          {children}
        </Stack>
      </Box>
    )
  },
)
