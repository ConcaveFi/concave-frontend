import { Image } from '@concave/ui'
import { Connector } from 'wagmi'

export const getConnectorLogo = (connectorName: Connector['name']) =>
  `/assets/connectors/${connectorName.toLowerCase()}.svg`

export const ConnectorIcon = ({
  name,
  size = '24px',
}: {
  name: string
  size?: '24px' | '48px' | '60px'
}) => <Image shadow="up" w={size} h={size} rounded="xl" src={getConnectorLogo(name)} alt={name} />
