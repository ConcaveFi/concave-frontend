import Link, { LinkProps } from 'next/link'
import { Button, ButtonProps } from '@concave/ui'

export type ButtonLinkProps = ButtonProps & LinkProps

export function ButtonLink({ href, ...props }: ButtonLinkProps) {
  return (
    <Link href={href} passHref>
      <Button {...props} />
    </Link>
  )
}
