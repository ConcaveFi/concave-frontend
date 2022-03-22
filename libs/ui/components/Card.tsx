import {
  border,
  Box,
  forwardRef,
  Image,
  space,
  Stack,
  StackProps,
  useMergeRefs,
  useMultiStyleConfig,
} from '@chakra-ui/react'
import { useRef } from 'react'
import { GradientBorderStyleProps } from 'theme/utils/gradientBorder'

export interface CardProps extends StackProps {
  variant?: 'primary' | 'secondary'
  borderGradient?: GradientBorderStyleProps['variant']
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

const Tiles = ({ tileWidth, tileHeight, clientWidth, clientHeight, Image }) => {
  if (!tileHeight || !tileWidth || tileHeight === '100%' || tileWidth === '100%') return <Image /> // eslint-disable-line jsx-a11y/alt-text

  const repeatX = Math.ceil(clientWidth / tileWidth)
  const repeatY = Math.ceil(clientHeight / tileHeight)

  return (
    <>
      {Array.from('y'.repeat(repeatY)).map((_, y) => {
        const top = y * tileHeight
        return Array.from('x'.repeat(repeatX)).map((_, x) => (
          <Image key={`${top}-${x}`} left={x * tileWidth} top={top} /> // eslint-disable-line react/jsx-key, jsx-a11y/alt-text
        ))
      })}
    </>
  )
}

export const Card = forwardRef<CardProps, 'div'>(
  ({ children, variant, borderWidth, borderGradient, ...props }, ref) => {
    const styles = useMultiStyleConfig('Card', {
      variant,
      borderWidth,
      borderGradient,
      ...props,
    })
    const internalRef = useRef(null)
    const textureSrc = (styles.texture as any).src

    const [rest, marginStyles] = splitObj(marginStyleKeys)(props)

    return (
      <Box
        ref={useMergeRefs(internalRef, ref)}
        __css={{
          ...styles.container,
          width: props.w ?? props.width,
          maxWidth: props.maxW ?? props.maxWidth,
          minWidth: props.minW ?? props.minWidth,
          height: props.h ?? props.height,
          maxHeight: props.maxH ?? props.maxHeight,
          minHeight: props.minH ?? props.minHeight,
        }}
        {...marginStyles}
        {...getBorderRadiusStyles(props)}
      >
        <Stack
          __css={{ ...getBorderRadiusStyles(styles.container) }}
          {...rest}
          maxW="100%"
          pos="relative"
          overflow="clip"
        >
          {textureSrc && (
            <Box pos="absolute" overflow="clip" inset={0} zIndex={-1}>
              <Tiles
                Image={(p) => (
                  <Image
                    __css={styles.texture}
                    role="presentation"
                    loading="eager"
                    decoding="async"
                    bgImage="none"
                    position="absolute"
                    zIndex={0}
                    src={textureSrc}
                    draggable={false}
                    onError={(e) => ((e.target as any).style.display = 'none')}
                    alt=""
                    {...p}
                  />
                )}
                tileWidth={styles.texture.width}
                tileHeight={styles.texture.height}
                clientWidth={internalRef.current?.clientWidth || 1000}
                clientHeight={internalRef.current?.clientHeight || 1000}
              />
            </Box>
          )}
          {children}
        </Stack>
      </Box>
    )
  },
)
