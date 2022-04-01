import { Button, ButtonProps } from '@concave/ui'
import Link, { LinkProps } from 'next/link'

export type ButtonLinkProps = ButtonProps & LinkProps

export function ButtonLink({ href, ...props }: ButtonLinkProps) {
  return (
    <Link href={href} passHref>
      <Button {...props} />
    </Link>
  )
}
