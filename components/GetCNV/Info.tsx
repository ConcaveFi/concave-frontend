import { HStack, Text, TextProps, Tooltip, VStack } from '@chakra-ui/react'
import { QuestionOutlineIcon } from '@chakra-ui/icons'
import { ReactNode } from 'react'
import { Card, CardProps } from 'components/Card'

const InfoLabel = ({ tooltip = '', ...props }: { tooltip?: string } & TextProps) => (
  <Tooltip label={tooltip} isDisabled={!tooltip} placement="right">
    <HStack color="text.3" fontSize="xs" fontWeight="bold" spacing={1}>
      {tooltip && <QuestionOutlineIcon />}
      <Text {...props} />
    </HStack>
  </Tooltip>
)

const InfoValue = ({ children }) => (
  <Text color="text.2" fontSize="2xl" fontWeight="bold">
    {children}
  </Text>
)

export const InfoItem = ({
  tooltip,
  label,
  children,
}: {
  tooltip?: string
  label: ReactNode
  children: ReactNode
}) => (
  <VStack w="100%" spacing={0}>
    <InfoLabel tooltip={tooltip} align="center" whiteSpace="pre-line">
      {label}
    </InfoLabel>
    <InfoValue>{children}</InfoValue>
  </VStack>
)

export const InfoCard = (props: CardProps) => (
  <Card w={484} borderWidth={2} bgImage="/assets/blackboard.png" h="min" {...props} />
)
