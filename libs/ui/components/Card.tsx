import {
  StackProps,
  Stack,
  useMultiStyleConfig,
  forwardRef,
  Image,
  Box,
  space,
} from '@chakra-ui/react'

export interface CardProps extends StackProps {
  variant?: 'primary' | 'secondary'
}

const splitObj = (splitKeys: string[]) => (obj) => {
  let obj1 = obj
  let obj2 = {}
  splitKeys.forEach((k) => {
    delete obj1[k] // obj1 DOES NOT have the splitKeys
    obj2[k] = obj[k] // obj2 ONLY have the splitKeys
  })

  return [obj1, obj2]
}

const marginStyleKeys = Object.keys(space).filter((k) => k.startsWith('m'))

export const Card = forwardRef<CardProps, 'div'>(
  ({ children, variant, borderWidth, ...props }, ref) => {
    const styles = useMultiStyleConfig('Card', { variant, borderWidth })
    const imageSrc = (styles.texture as any).src

    const [rest, marginStyles] = splitObj(marginStyleKeys)(props)

    return (
      <Box ref={ref} __css={styles.container} {...marginStyles}>
        <Stack
          __css={{ borderRadius: styles.container.borderRadius }}
          {...rest}
          pos="relative"
          maxH="100%"
          overflow="auto"
        >
          {children}
          {imageSrc && (
            <Image
              __css={styles.texture}
              bgImage="none"
              position="absolute"
              inset={0}
              zIndex={-1}
              src={imageSrc}
              alt=""
            />
          )}
        </Stack>
      </Box>
    )
  },
)
