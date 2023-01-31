import { CheckIcon, CloseIcon, DiscordIcon } from '@concave/icons'
import { Input, InputGroup, InputLeftElement, InputRightElement } from '@concave/ui'

export const isDiscordUsername = (username: string) =>
  !!username.match(/^(?!(here|everyone))^(?!.*(discord|```)).[^\@\#\:]{2,32}#\d{4}$/s)

export const DiscordInput = ({
  username,
  onChangeUsername,
}: {
  username: string
  onChangeUsername: (username: string) => void
}) => {
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
          onChangeUsername(target.value)
        }}
      />
      {username && (
        <InputRightElement>
          {isDiscordUsername(username) ? (
            <CheckIcon color="green.500" />
          ) : (
            <CloseIcon color="red.500" />
          )}
        </InputRightElement>
      )}
    </InputGroup>
  )
}
