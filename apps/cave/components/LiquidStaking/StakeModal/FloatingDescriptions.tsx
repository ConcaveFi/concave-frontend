import { Modal, StackProps, Text, VStack } from '@concave/ui'
import { Card } from '@concave/ui'

type FloatingDescriptionsProps = { type: string; isOpen: boolean; onClose: VoidFunction }
export const FloatingDescriptions: React.FC<FloatingDescriptionsProps> = ({
  isOpen,
  type,
  onClose,
}) => {
  if (type === 'modal') {
    return (
      <Modal title="Descriptions" isOpen={isOpen} onClose={onClose} bluryOverlay>
        <Descriptions />
      </Modal>
    )
  }
  return isOpen && <Descriptions />
}

const Descriptions: React.FC<StackProps> = ({ ...props }) => (
  <VStack
    position={{ base: 'relative', xl: 'absolute' }}
    left={{ base: '', xl: '-80' }}
    spacing={{ base: 2, xl: 5 }}
    {...props}
  >
    <Description
      title="Total vAPR"
      description="Total vAPR aggregates rewards associated with each staking position including rewards from
        bonding activity, base emissions and the quarterly dividend."
    />
    <Description
      title="Bonding emissions"
      description="Anti-Dilutive bond emissions ensure staking positions are rewarded with a share of any new
        supply minted from bonds that are purchased. Staking positions recieve a share of this
        growth compounded at 8hr intervals."
    />
    <Description
      title="Base emissions"
      description="Base emissions ensure that staking positions receive continuous CNV rewards throughout the
        term. Staking positions receive a boost in base emissions as a function of term length."
    />
    <Description
      title="Quaterly dividend"
      description="Quarterly dividends ensure that stakers receive a share of profits in non CNV assets from
        all yield bearing products and services. Staking positions receive a boost in dividend as a
        function of term length."
    />
  </VStack>
)

type DescriptionProps = { title: string; description: string }
const Description = ({ description, title }: DescriptionProps) => (
  <Card variant="secondary" py="6" px="4" w={300}>
    <Text fontWeight="bold">{title}</Text>
    <Text fontSize="sm">{description}</Text>
  </Card>
)
