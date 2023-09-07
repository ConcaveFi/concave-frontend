import { Flex, Image, Spinner, Text } from '@concave/ui'
import { getBondSpotPrice } from 'components/Bond/BondState'
import { ButtonLink, ButtonLinkProps } from 'components/ButtonLink'
import { useCNVPrice } from 'hooks/useCNVPrice'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import Router from 'next/router'
import { useQuery } from 'react-query'
import getROI from 'utils/getROI'
import { getRoiWarnColor } from 'utils/getRoiWarnColor'
import { useAccount } from 'wagmi'

const NavButton = (props: ButtonLinkProps) => {
  const active = Router.route === props.href

  return (
    <ButtonLink
      color="text.low"
      h="50px"
      px={4}
      bg={active && 'linear-gradient(270deg, #08448C -0.12%, #070C1E 99.82%)'}
      border={active && '1px solid rgba(81, 192, 255, 1)'}
      shadow={active ? 'Glass Inner' : 'up'}
      rounded={'20px'}
      _hover={{ textDecoration: 'underline', textColor: 'text.bright' }}
      leftIcon={
        props.leftIcon || (
          <Flex position={'absolute'} h="full" w="full" align={'center'} top="0">
            <NotInteractableImage
              src={`/assets/sidebar${props.href}.svg`}
              _groupHover={{ filter: 'brightness(3)' }}
              _groupActive={{ filter: 'brightness(3)' }}
            />
          </Flex>
        )
      }
      {...props}
    >
      <Flex w="100%" textColor={active && 'text.bright'} align="center" justify="center">
        {props.children}
      </Flex>
    </ButtonLink>
  )
}

const SubnavButton = ({ children, ...props }: ButtonLinkProps) => {
  const active = Router.route === props.href || Router.asPath.indexOf(props.href.toString()) === 0
  return (
    <ButtonLink
      _hover={{ textDecoration: 'underline', textColor: 'text.bright' }}
      sx={{ maxH: 'unset', opacity: 1, p: '10px' }}
      variant="secondary"
      borderRadius="xl"
      color="text.low"
      fontSize="xs"
      shadow="none"
      _active={{}}
      _focus={{}}
      bg="none"
      m="-3px"
      px={4}
      mt="0"
      {...props}
    >
      <Flex w="100%" textColor={active && 'text.bright'} align="center" justify="center">
        {children}
      </Flex>
    </ButtonLink>
  )
}

const NotInteractableImage = ({ src, ...props }) => (
  <Image alt="" src={src} userSelect="none" draggable="false" pointerEvents="none" {...props} />
)

const ButtonContainer = ({ children, ...props }) => (
  <Flex flexDir="column" shadow="Down Big" rounded="24px" p="3px" overflow="hidden" {...props}>
    {children}
  </Flex>
)

function PageNav() {
  return (
    <Flex direction="column" position="relative" gap="10px" w="100%">
      <ButtonContainer>
        <NavButton href="/liquid-staking" border="primary">
          Stake
        </NavButton>
      </ButtonContainer>

      <ButtonContainer>
        <NavButton href="/marketplace">Marketplace</NavButton>
        <SubnavButton href="/user-dashboard?view=Liquid-Staking">
          Your staked positions
        </SubnavButton>
      </ButtonContainer>
    </Flex>
  )
}

export default PageNav
