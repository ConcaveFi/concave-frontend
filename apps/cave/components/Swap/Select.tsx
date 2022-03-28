import { MenuButton, useDisclosure } from '@chakra-ui/react'
import { DownIcon, TokenIcon } from '@concave/icons'
import { Button, Menu, Modal, Text } from '@concave/ui'
import { TokenType } from 'lib/tokens'
import React from 'react'
import { SelectToken } from './SelectToken'

const SelectTokenButton = ({ onClick }: { onClick: () => void }) => (
  <Button
    boxShadow={'Up Small'}
    bg={'linear-gradient(90deg, #72639B 0%, #44B9DE 100%)'}
    _hover={{
      bg: 'linear-gradient(90deg, #72639B 0%, #44B9DE 100%)',
    }}
    py={0}
    h={8}
    px={2}
    borderRadius={'full'}
    fontSize={'lg'}
    rightIcon={<DownIcon />}
    onClick={onClick}
  >
    <Text>Select a token</Text>
  </Button>
)

export const Select = ({
  commonBases,
  selected,
  onSelect,
}: {
  commonBases: TokenType[]
  selected?: TokenType
  onSelect: (tokenName: string) => void
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Menu placement="bottom-end">
      {!selected?.symbol && <SelectTokenButton onClick={onOpen} />}
      {selected?.symbol && (
        <MenuButton
          as={Button}
          boxShadow={'Up Small'}
          _focus={{ boxShadow: 'Up Small' }}
          bgColor="rgba(156, 156, 156, 0.01);"
          borderRadius={'full'}
          py={1}
          px={2}
          h={8}
          height={'auto'}
          fontWeight={600}
          onClick={onOpen}
          leftIcon={<TokenIcon size="xs" symbol={selected.symbol} logoURI={selected.logoURI} />}
          rightIcon={<DownIcon />}
        >
          {selected?.symbol}
        </MenuButton>
      )}
      <Modal
        bluryOverlay={true}
        title="Select a Token"
        titleAlign="left"
        isOpen={isOpen}
        onClose={onClose}
        bodyProps={{
          h: '70%',
          p: 6,
          gap: 4,
          shadow: 'Up for Blocks',
          variant: 'primary',
          justifyContent: 'space-between',
        }}
      >
        <SelectToken
          onChange={(symbol) => {
            onSelect(symbol)
            onClose()
          }}
          commonBases={commonBases}
          selected={selected}
        ></SelectToken>
      </Modal>
    </Menu>
  )
}
