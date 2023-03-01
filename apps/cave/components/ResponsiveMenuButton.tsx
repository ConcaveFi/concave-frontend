import { useBreakpointValue, IconButton, MenuButton, Button, ButtonProps } from '@concave/ui'

export const useResponsiveButton = ({
  leftIcon,
  rightIcon,
  minSize = 'md',
}: {
  leftIcon?: JSX.Element
  rightIcon?: JSX.Element
  minSize?: 'sm' | 'md' | 'xl'
}) => {
  return useBreakpointValue({
    base: {
      as: IconButton,
      icon: leftIcon,
    },
    [minSize]: {
      leftIcon,
      rightIcon,
    },
  })
}

export const ResponsiveMenuButton = ({
  children,
  leftIcon,
  rightIcon,
  ...buttonProps
}: {
  children: string
  leftIcon?: JSX.Element
  rightIcon?: JSX.Element
} & ButtonProps) => {
  const responsiveButtonProps = useResponsiveButton({
    leftIcon,
    rightIcon,
  })
  return (
    <MenuButton
      as={Button}
      size={'md'}
      boxShadow={'Up Big'}
      {...buttonProps}
      {...responsiveButtonProps}
    >
      {children}
    </MenuButton>
  )
}

export const ResponsiveButton = ({
  children,
  leftIcon,
  rightIcon,
  ...buttonProps
}: {
  children: string
  leftIcon?: JSX.Element
  rightIcon?: JSX.Element
} & ButtonProps) => {
  const responsiveButtonProps = useResponsiveButton({
    leftIcon,
    rightIcon,
  })
  return (
    <Button
      as={Button}
      size={'md'}
      boxShadow={'Up Big'}
      {...buttonProps}
      {...responsiveButtonProps}
    >
      {children}
    </Button>
  )
}
