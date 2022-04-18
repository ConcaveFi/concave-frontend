import React from 'react'
import { Link, Text, VStack, HStack, Image } from '@concave/ui'

interface MediaProps {
  icon: string
  name: string
  link: string
}
const Media: Array<MediaProps> = [
  {
    icon: 'documentation',
    name: 'Documentation',
    link: 'https://docs.concave.lol/introduction/',
  },
  {
    icon: 'concavelol',
    name: 'Concave.lol',
    link: 'https://concave.lol/',
  },
  {
    icon: 'discord',
    name: 'Discord',
    link: 'https://discord.com/invite/concave',
  },
  {
    icon: 'twitter',
    name: 'Twitter',
    link: 'https://twitter.com/ConcaveFi',
  },
  {
    icon: 'blog',
    name: 'Blog',
    link: 'https://concave.lol/blog/',
  },
]

function SideBarBottom() {
  return (
    <VStack
      w="186px"
      borderRadius="2xl"
      borderRightRadius={0}
      shadow="Down Big"
      py={7}
      pl={6}
      textColor="text.low"
      fontSize="sm"
    >
      {Media.map((m) => (
        <Link href={m.link} isExternal key={m.name}>
          <HStack spacing="2px" textAlign="left" w="150px" gap={2}>
            <Image src={`/assets/sidebar/${m.icon}.svg`} alt="documentation logo" ml={-3} />
            <Text fontSize="base" fontWeight="bold">
              {m.name}
            </Text>
          </HStack>
        </Link>
      ))}
    </VStack>
  )
}

export default SideBarBottom
