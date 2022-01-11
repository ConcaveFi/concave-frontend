import { HStack, Text, TextProps, Tooltip, VStack } from '@chakra-ui/react'
import { QuestionOutlineIcon } from '@chakra-ui/icons'
import { ReactNode } from 'react'

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

export const Info = ({
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
