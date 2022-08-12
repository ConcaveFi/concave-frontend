import { Button, ButtonProps, Card, HStack, useMultiStyleConfig } from '@concave/ui'
import React from 'react'

export type BuyButtonProps = ButtonProps & { children?: [string, React.ReactElement | undefined] }
export const BuyButton = (props: BuyButtonProps) => {
  const styles = useMultiStyleConfig('BuyButton', { ...props })
  const { card, button } = styles
  const [label, SideElement] = props.children
  if (!SideElement) {
    return (
      <Button size={'md'} __css={button} {...props}>
        {label}
      </Button>
    )
  }
  return (
    //@ts-ignore
    <Card __css={card}>
      <HStack justifyContent={`space-between`} justifyItems="center">
        {SideElement}
        <Button {...props} ml={'auto'} size={'md'} __css={button}>
          {label}
        </Button>
      </HStack>
    </Card>
  )
}
