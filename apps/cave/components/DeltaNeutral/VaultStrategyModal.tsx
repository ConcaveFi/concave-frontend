import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react'
import { Currency } from '@concave/core'
import { Flex } from '@concave/ui'
import { FC } from 'react'
import { StrategyInfoContainer } from './StrategyInfo'
import { VaultPositionSelect } from './VaultPositionSelect'
import { VaultProfit } from './VaultProfit'

type VaultStrategyModalProps = { isOpen: boolean; onClose: VoidFunction; tokens: Currency[] }
export const VaultStrategyModal: FC<VaultStrategyModalProps> = ({ isOpen, onClose, tokens }) => {
  const vaultPosition = <VaultPositionSelect variant="secondary" tokens={tokens} />

  return (
    <Flex direction="column">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropBlur={'10px'} />
        <ModalContent>
          <VaultProfit vaultPosition={vaultPosition} />
          <StrategyInfoContainer mt={-16} />
        </ModalContent>
      </Modal>
    </Flex>
  )
}
