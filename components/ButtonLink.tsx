import Link, { LinkProps } from 'next/link'
import { Button, ButtonProps } from '@chakra-ui/react'

type ChakraAndNextProps = ButtonProps & LinkProps

export function ButtonLink({ href, ...props }: ChakraAndNextProps) {
  return (
    <Link href={href} passHref>
      <Button {...props} />
    </Link>
  )
}
