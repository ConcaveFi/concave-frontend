import { CheckIcon, CloseIcon, DiscordIcon } from '@concave/icons'
import { Input, InputGroup, InputLeftElement, InputRightElement } from '@concave/ui'
import { useEffect, useState } from 'react'

export const DiscordInput = ({
  onUpdate,
}: {
  onUpdate: ({ username: string, valid: boolean }) => void
}) => {
  const [username, setUsername] = useState('')
  const valid = !!username.match(/^(?!(here|everyone))^(?!.*(discord|```)).[^\@\#\:]{2,32}#\d{4}$/s)
  useEffect(() => {
    username && onUpdate({ username, valid })
  }, [valid, username])
  return (
    <InputGroup w={'full'}>
      <InputLeftElement borderRadius={'2xl'} pointerEvents="none">
        <DiscordIcon color="gray.300" />
      </InputLeftElement>
      <Input
        type="text"
        placeholder="Enter your Username#0000"
        value={username}
        onChange={({ target }) => {
          setUsername(target.value)
        }}
      />
      {username && (
        <InputRightElement>
          {valid ? <CheckIcon color="green.500" /> : <CloseIcon color="red.500" />}
        </InputRightElement>
      )}
    </InputGroup>
  )
}
