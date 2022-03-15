import {
  StackProps,
  Stack,
  useMultiStyleConfig,
  forwardRef,
  Image,
  Box,
  space,
  border,
  useMergeRefs,
} from '@chakra-ui/react'
import { useRef } from 'react'

export interface CardProps extends StackProps {
  variant?: 'primary' | 'secondary'
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
const borderRadiusStyleKeys = Object.keys(border).filter((k) => k.endsWith('Radius'))

const getBorderRadiusStyles = (props) => splitObj(borderRadiusStyleKeys)(props)[1]

const Tiles = ({ tileWidth, tileHeight, clientWidth, clientHeight, Image }) => {
  if (!tileHeight || !tileWidth) return <Image /> // eslint-disable-line jsx-a11y/alt-text

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
  ({ children, variant, borderWidth, borderRadius, ...props }, ref) => {
    const styles = useMultiStyleConfig('Card', { variant, borderWidth, borderRadius })
    const internalRef = useRef(null)
    const textureSrc = (styles.texture as any).src

    const [rest, marginStyles] = splitObj(marginStyleKeys)(props)

    return (
      <Box
        ref={useMergeRefs(internalRef, ref)}
        __css={styles.container}
        {...marginStyles}
        {...getBorderRadiusStyles(props)}
      >
        <Stack
          __css={{ borderRadius: styles.container.borderRadius }}
          {...rest}
          pos="relative"
          maxH="100%"
          overflow="auto"
        >
          {children}
          {textureSrc && (
            <Box pos="absolute" overflow="hidden" inset={0} zIndex={-1}>
              <Tiles
                Image={(p) => (
                  <Image
                    __css={styles.texture}
                    bgImage="none"
                    position="absolute"
                    zIndex={-1}
                    src={textureSrc}
                    draggable={false}
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
        </Stack>
      </Box>
    )
  },
)
