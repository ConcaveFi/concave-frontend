import { Box, chakra } from '@chakra-ui/react'
import NextImage from 'next/image'
import { ComponentPropsWithRef, ReactNode, useState } from 'react'

const NextChakraImage = chakra(NextImage, {
  shouldForwardProp: (prop) =>
    [
      'width',
      'height',
      'src',
      'alt',
      'quality',
      'placeholder',
      'blurDataURL',
      'loader',
      'layout',
    ].includes(prop),
})

type ImageProps = ComponentPropsWithRef<typeof NextChakraImage> & { fallback?: ReactNode }

export const Image = ({ fallback, ...props }: ImageProps) => {
  const [isBadSrc, setBadSrc] = useState(false)
  const width = props.w || props.width
  const height = props.h || props.height
  return (
    <Box as="span" w={width} h={height}>
      {!!fallback && (!props.src || isBadSrc) ? (
        fallback
      ) : (
        <NextChakraImage onError={() => setBadSrc(true)} {...props} height={height} width={width} />
      )}
    </Box>
  )
}
