import { Box, Image } from '@concave/ui'
import { Connector } from 'wagmi'

export const getConnectorLogo = (connectorName: Connector['name']) =>
  `/assets/connectors/${connectorName.toLowerCase()}.svg`

export const ConnectorIcon = ({
  name,
  size = '18px',
  src,
  rounded = 'xl',
}: {
  name: string
  src?: string
  size?: '18px' | '48px' | '60px'
  rounded?: 'sm' | 'md' | 'xl' | '2xl'
}) => (
  <Image
    shadow="up"
    w={size}
    h={size}
    minH={size}
    minW={size}
    src={src || getConnectorLogo(name)}
    alt={name}
    rounded={rounded}
    fallback={<Box w={size} h={size} bg="subtle" opacity={0.5} rounded={rounded} />}
  />
)
