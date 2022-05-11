import { Box, Card, Flex, keyframes, Link, Text } from '@concave/ui'
import { useEffect, useState } from 'react'

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})
interface BondToastCardProps {
  type: 'info' | 'error' | 'successful' | 'warning'
  title: string
  link: string
}
const BondToastCard = ({ type, title, link }: BondToastCardProps) => {
  const [bgColor, setBgColor] = useState<any>()
  const [deg, setDeg] = useState(0)

  const rotate = { animation: `${spin} 3s linear infinite` }

  useEffect(() => {
    switch (type) {
      case 'successful':
        setBgColor(greenGradient)
        break
      case 'error':
        setBgColor(redGradient)
        break
      case 'successful':
        setBgColor(greenGradient)
        break
      case 'warning':
        setBgColor(orangeGradient)
        break
    }
  }, [type])
  return (
    <Flex
      transition={'all'}
      transitionDuration="2s"
      height={'80px'}
      width="260px"
      rounded="2xl"
      boxShadow={'Glass Up Medium'}
      mt={4}
      overflow="hidden"
      position={'relative'}
    >
      <Flex position={'absolute'} width={'full'} justify="center" align={'center'}>
        <Flex
          mt={20}
          position={'absolute'}
          css={rotate}
          bg={bgColor}
          height="600px"
          width={'600px'}
          zIndex={1}
        />
      </Flex>
      <Flex
        zIndex={2}
        bgImage={'assets/textures/glass.jpg'}
        flex={1}
        m={'1px'}
        bgSize="100%"
        bgPosition={'center'}
        rounded="2xl"
      >
        <Flex direction={'column'} bg={'#21293066'} height="full" width={'full'} rounded="inherit">
          <Text ml={5} mt={2} fontSize={'18px'} fontWeight="700">
            {title}
          </Text>
          <Text ml={5} fontSize={'14px'} fontWeight="700" textColor={'text.low'}>
            <Link href={link}>View on explorer.</Link>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default BondToastCard

const greenGradient = 'linear-gradient(45deg, #48D89A 50%, #328E5D 10%, #259E59 100%)'
const redGradient = 'linear-gradient(45deg, #F56060, red, #AE0A0A)'
const grayGradient = 'linear-gradient(90deg, #72639B 0%, #44B9DE 100%)'
const orangeGradient = 'linear-gradient(50deg, #707773 50%, white 10%, #F98E13 100% )'
