import { useDisclosure } from '@chakra-ui/react'
import { DownIcon, TokenIcon } from '@concave/icons'
import { Button, Menu, MenuButton, Modal } from '@concave/ui'
import React from 'react'
import { SelectToken } from './SelectToken'

const selectItemStyles = {
  borderRadius: 'full',
  py: 2,
  px: 3,
  height: 'auto',
  fontWeight: 600,
}

export const Select = ({
  tokens,
  selected,
  onSelect,
}: {
  tokens: string[]
  selected: typeof tokens[number]
  onSelect: (tokenName: string) => void
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Menu placement="bottom-end" autoSelect>
      <MenuButton
        boxShadow={'Up Small'}
        _focus={{ boxShadow: 'Up Small' }}
        p={2}
        as={Button}
        bgColor="rgba(156, 156, 156, 0.01);"
        sx={selectItemStyles}
        onClick={onOpen}
        leftIcon={<TokenIcon size="25px" tokenName={selected} />}
        rightIcon={<DownIcon />}
      >
        {selected.toUpperCase()}
      </MenuButton>
      <Modal
        sx={{
          h: '70%',
          p: 6,
          gap: 4,
          shadow: 'Up for Blocks',
          variant: 'primary',
          justifyContent: 'space-between',
        }}
        bluryOverlay={true}
        title="Select a Token"
        isOpen={isOpen}
        onClose={onClose}
      >
        <SelectToken
          onChange={(symbol) => {
            onSelect(symbol)
            onClose()
          }}
          commonBases={tokens}
          selected={selected}
        ></SelectToken>
      </Modal>
    </Menu>
  )
}
