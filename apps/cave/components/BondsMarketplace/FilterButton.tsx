import { Flex, FlexboxProps, Text } from '@chakra-ui/react'
import { SettingsIcon } from '@concave/icons'

export const BondFilterButton: React.FC<Info & FlexboxProps> = ({
  info,
  title,
  settingsIcon,
  ...props
}) => {
  return (
    <Flex px={6} py={3} rounded="2xl" apply={'background.metal'} shadow="up" {...props}>
      <Info info={info} title={title} settingsIcon={settingsIcon}></Info>
    </Flex>
  )
}

type Info = { title: string; info?: string; settingsIcon?: boolean }
const Info: React.FC<Info> = ({ title, info, settingsIcon }) => (
  <Flex
    align="center"
    textShadow="0px 0px 27px rgba(129, 179, 255, 0.31)"
    fontWeight={'bold'}
    gap={1}
  >
    <Text textColor={'text.low'}>{title}</Text>
    {settingsIcon && <SettingsIcon />}
    {info && <Text>{info}</Text>}
  </Flex>
)
