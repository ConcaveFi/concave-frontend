import { Text, Modal, Input } from '@concave/ui'
import dynamic from 'next/dynamic'
import { useLocalStorage } from 'react-use'

const isDevEnv = process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production'
const password = process.env.DEV_PASSWORD || 'buycnv'

export const useWorthyUser = () => {
  const [value, setValue] = useLocalStorage('can enter?', false)
  return { isUserWorthy: value, setWorthyUser: () => setValue(true) }
}

export const DevelopGateway = dynamic(
  () =>
    Promise.resolve(() => {
      const { isUserWorthy, setWorthyUser } = useWorthyUser()

      if (!isDevEnv) return null
      return (
        <Modal
          bluryOverlay={true}
          title="Are you worthy?"
          titleAlign="center"
          isOpen={isUserWorthy !== true}
          onClose={() => {}}
          bodyProps={{ w: '350px', gap: 2 }}
          hideClose
        >
          <Text fontWeight="bold">Do you know the cave secret anon?</Text>
          <Input onChange={(e) => e.target.value === password && setWorthyUser()} />
        </Modal>
      )
    }),
  { ssr: false },
)
