import { Box, Card, Flex, keyframes, Link, Text } from '@concave/ui'
import { useEffect, useState } from 'react'

const spin = keyframes({
  '0%': { backgroundImage: 'linear-gradient(0deg, #707773 0%, orange, #707773 )' },
  '100%': { backgroundImage: 'linear-gradient(180deg, #707773 0%, orange, #707773 )' },
})
interface BondToastCardProps {
  type: 'info' | 'error' | 'successful' | 'warning'
  title: string
  link: string
}
const BondToastCard = ({ type, title, link }: BondToastCardProps) => {
  const [bgColor, setBgColor] = useState<any>()
  const [deg, setDeg] = useState(0)
  const orangeGradient = { animation: `${spin} 0.3s linear infinite` }

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
      bg={orangeGradient}
      transition={'all'}
      transitionDuration="2s"
      p={'1px'}
      css={orangeGradient}
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

const greenGradient = 'linear-gradient(45deg, #48D89A, green, #259E59)'
const redGradient = 'linear-gradient(45deg, #F56060, red, #AE0A0A)'
const grayGradient = 'linear-gradient(90deg, #72639B 0%, #44B9DE 100%)'
