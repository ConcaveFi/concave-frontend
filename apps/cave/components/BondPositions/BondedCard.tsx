import { Card, Flex, FlexboxProps, gradientBorder, Text } from '@concave/ui'
type BondedCard = { variant: Variant }
export const BondedCard = ({ variant }: BondedCard) => {
  return (
    <Card
      variant="secondary"
      width={'708px'}
      height="217px"
      boxShadow={'Glass Up Medium'}
      rounded="50px"
      position={'relative'}
      bg="linear-gradient(180deg, rgba(40, 219, 209, 0.19) 0%, rgba(0, 83, 78, 0) 55.79%)"
    >
      <ListedInfo variant={variant} />
      <Flex
        position={'absolute'}
        height={'120px'}
        width="full"
        align="center"
        justify={'center'}
        gap={20}
      >
        <Info title="Thor Starter" info="xRUNE"></Info>
        <Info alignItems={'start'} title="You Bonded:" info="2,415.43 xRUNE"></Info>
      </Flex>
    </Card>
  )
}

type Info = { title: string; info: string }
const Info: React.FC<FlexboxProps & Info> = ({ title, info, ...props }) => {
  return (
    <Flex
      textShadow={'0px 0px 27px rgba(129, 179, 255, 0.31)'}
      fontWeight="bold"
      direction={'column'}
      align="center"
      {...props}
    >
      <Text fontSize={'14px'} textColor="text.low">
        {title}
      </Text>
      <Text fontSize={'22px'}>{info}</Text>
    </Flex>
  )
}

type ListedInfo = { variant: Variant }
const ListedInfo = ({ variant }: ListedInfo) => {
  return (
    <Flex
      width={'108px'}
      height="41px"
      rounded={'full'}
      sx={{ ...gradientBorder({ borderWidth: 2 }) }}
      position="absolute"
      my={'40px'}
      ml="40px"
    >
      <Text m={'auto'} fontSize="18px" fontWeight={'bold'}>
        {variant}
      </Text>
    </Flex>
  )
}

type Variant = 'listed' | 'pending'
