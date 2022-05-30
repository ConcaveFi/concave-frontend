import { Flex, keyframes, Link, Text } from '@concave/ui'
import { useEffect, useState } from 'react'

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})
interface BondToastCardProps {
  type: 'info' | 'error' | 'success' | 'warning'
  title: string
  tx: string
  link: string
  amountInOut: { in: number; out: number }
}
const BondToastCard = ({ type, title, tx, amountInOut, link }: BondToastCardProps) => {
  const [bgColor, setBgColor] = useState<any>()
  const [deg, setDeg] = useState(0)

  const rotate = { animation: `${spin} 3s linear infinite` }

  useEffect(() => {
    switch (type) {
      case 'success':
        setBgColor(greenGradient)
        break
      case 'error':
        setBgColor(redGradient)
        break
      case 'info':
        setBgColor(defaultGradient)
        break
      case 'warning':
        setBgColor(orangeGradient)
        break
    }
  }, [type])

  return (
    <Flex
      animation={''}
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
          height="400px"
          width={'300px'}
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
          <Text ml={5} fontSize={'14px'} fontWeight="700" textColor={'text.medium'}>
            Bonding {amountInOut.in} DAI for {amountInOut.out} CNV.
          </Text>
          <Text ml={5} fontSize={'14px'} fontWeight="700" textColor={'text.low'}>
            <Link href={link}>View txn on explorer.</Link>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default BondToastCard

const greenGradient = 'linear-gradient(45deg, #48D89A 50%, #328E5D 10%, #259E59 100%)'
const redGradient = 'linear-gradient(45deg, #A54747 50%, #F79494 40%,red 100%)'
const defaultGradient =
  'linear-gradient(41.89deg, #53399B 0.69%, #7DE0FF 38.19%, #504179 72.85%, #84E2FF 100%)'
const orangeGradient = 'linear-gradient(50deg, #707773 50%, white 10%, #F98E13 100% )'
