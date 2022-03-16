import { Flex, FlexProps, useMultiStyleConfig } from '@concave/ui'

export const InputContainer = (props: FlexProps) => {
  const styles = useMultiStyleConfig('Input', { variant: 'primary', size: 'unset' })

  return (
    <Flex
      sx={{ ...styles.field, mx: -5, px: 5, py: 3, borderRadius: '2xl', w: 'auto' }}
      {...props}
    />
  )
}
