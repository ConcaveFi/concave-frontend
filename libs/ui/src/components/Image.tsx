import { chakra } from '@chakra-ui/react'
import NextImage from 'next/image'

export const Image = chakra(NextImage, {
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

// const ResponsiveImage = ({ src, alt, ...props }) => {
//   return (
//     <Box position="relative" {...props}>
//       <NextImage objectFit="cover" layout="fill" src={src} alt={alt} />
//     </Box>
//   )
// }

// export const Image = ({ w, h, width = w, height = h, ...props }:ImageProps & BoxProps & NextImageProps) => {
//   if (!width || !height) return <ResponsiveImage width={width} height={height} {...props} />
//   return <UnresponsiveImage width={width} height={height} {...props} />
// }
