import { Box, Card, Flex, Text } from '@concave/ui'
import { useEffect, useState } from 'react'

const BondToastCard = () => {
  return (
    <Flex direction={'column'}>
      <CardExample1 type="error" />
      <CardExample1 type="successful" />
      <CardExample1 type="info" />
    </Flex>
  )
}

export default BondToastCard

interface CardExample1Props {
  type: 'info' | 'error' | 'successful'
}

const CardExample1 = (props: CardExample1Props) => {
  const { type } = props
  const [bgColor, setBgColor] = useState('')

  useEffect(() => {
    switch (type) {
      case 'successful':
        setBgColor(greenGradient)
        break
      case 'error':
        setBgColor(redGradient)
        break
      default:
        setBgColor(defaultGradient)
    }
  }, [type])

  return (
    <Flex
      bg={bgColor}
      p={'1px'}
      height={'80px'}
      width="260px"
      rounded="2xl"
      boxShadow={'Glass Up Medium'}
      mt={4}
    >
      <Flex
        bgImage={'assets/textures/glass.jpg'}
        flex={1}
        bgSize="100%"
        bgPosition={'center'}
        rounded="2xl"
      >
        <Flex direction={'column'} bg={'#21293066'} height="full" width={'full'} rounded="inherit">
          <Text ml={5} mt={2} fontSize={'18px'} fontWeight="700">
            Transaction:
          </Text>
          <Text ml={5} fontSize={'14px'} fontWeight="700" textColor={'text.low'}>
            Informations here........
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

const greenGradient = 'linear-gradient(45deg, #48D89A, green, #259E59)'
const redGradient = 'linear-gradient(45deg, #F56060, red, #AE0A0A)'
const defaultGradient = 'linear-gradient(90deg, #72639B 0%, #44B9DE 100%)'
