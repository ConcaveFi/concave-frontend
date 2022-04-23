import React from 'react'
import { Link, Text, VStack, HStack, Image } from '@concave/ui'
import useAddTokenToWallet, { injectedTokenResponse } from 'hooks/useAddTokenToWallet'
import { getWalletType, renderProviderText } from 'lib/injected.wallets'
import { useIsMounted } from 'hooks/useIsMounted'

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
  const isMounted = useIsMounted()
  const { loading: loadingtoWallet, addingToWallet }: injectedTokenResponse = useAddTokenToWallet({
    tokenAddress: '0x2B8E79CBD58418CE9aeB720BAf6B93825B93eF1F',
    tokenChainId: 3,
    tokenImage:
      'https://raw.githubusercontent.com/ConcaveFi/assets/master/blockchains/ethereum/assets/0x000000007a58f5f58E697e51Ab0357BC9e260A04/logo.png',
  })

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
      <button disabled={loadingtoWallet} onClick={addingToWallet}>
        <HStack spacing="2px" textAlign="left" w="150px" gap={2}>
          {isMounted && (
            <Image
              style={{ filter: 'saturate(0%)' }}
              src={renderProviderText(getWalletType()).img as string}
              alt="w"
              ml={-3}
              h="1rem"
              w="1rem"
            />
          )}
          <Text fontSize="base" fontWeight="bold">
            Add CNV to wallet
          </Text>
        </HStack>
      </button>

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
