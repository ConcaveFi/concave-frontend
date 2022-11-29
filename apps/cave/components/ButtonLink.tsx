import { Button, ButtonProps } from '@concave/ui'
import Link, { LinkProps } from 'next/link'

export type ButtonLinkProps = ButtonProps & LinkProps

export function ButtonLink({ href, ...props }: ButtonLinkProps) {
  return (
    <Link style={{ width: '100%' }} href={href} passHref>
      <Button as="a" {...props} />
    </Link>
  )
}
